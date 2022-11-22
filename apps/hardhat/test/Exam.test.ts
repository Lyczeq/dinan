import {
  loadFixture,
  setBalance,
} from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { TokenUriData } from './../types/TokenUri';
import {
  BACKEND_ADDRESS,
  EXAM_DESCRIPTION,
  EXAM_NAME,
  EXAM_SCORE,
  EXAM_SYMBOL,
} from './constants';

async function deployExamFixture() {
  const [owner, otherAccount] = await ethers.getSigners();

  const Exam = await ethers.getContractFactory('Exam');
  // const creatorAddress = owner.address;
  // const mockExamControllerAddress = owner.address;

  const exam = await Exam.deploy(EXAM_NAME, EXAM_SYMBOL, EXAM_DESCRIPTION);

  const backendSigner = await ethers.getImpersonatedSigner(BACKEND_ADDRESS);
  const twoEth = ethers.utils.parseUnits('2', 'ether');
  setBalance(backendSigner.address, twoEth);

  return {
    exam,
    participantAddress: owner.address,
    otherAccount,
    backendSigner,
  };
}

describe('Exam tests', () => {
  describe('Exam Creation', () => {
    it('Checks name and symbol of the created Exam', async () => {
      const { exam } = await loadFixture(deployExamFixture);
      const examName = await exam.name();
      const examSymbol = await exam.symbol();

      expect(examName).equals(EXAM_NAME);
      expect(examSymbol).equals(examSymbol);
    });
  });

  describe('Exam Participation', () => {
    it('Adds a participant', async () => {
      const { exam, participantAddress } = await loadFixture(deployExamFixture);
      await exam.participateInExam(participantAddress);

      const { isFinished, score, hasStarted } = await exam.getParticipantResult(
        participantAddress
      );

      expect(isFinished).equals(false);
      expect(score).equals(0);
      expect(hasStarted).equals(true);
    });

    it('Expects revert when adding a participant because of incorrect sender address', async () => {
      const { exam, participantAddress, otherAccount } = await loadFixture(
        deployExamFixture
      );
      await expect(
        exam.connect(otherAccount).participateInExam(participantAddress)
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it("Expects revert when getting the result of the partcipant who hasn't taken part in the exam", async () => {
      const { exam, participantAddress, otherAccount } = await loadFixture(
        deployExamFixture
      );
      await exam.participateInExam(participantAddress);
      await expect(
        exam.getParticipantResult(otherAccount.address)
      ).to.be.revertedWith('There is no participant with this address.');
    });
  });

  describe('Exam NFTs', () => {
    it('Should make an NFT and confirm the owner', async () => {
      const { exam, participantAddress, backendSigner } = await loadFixture(
        deployExamFixture
      );

      await exam
        .connect(backendSigner)
        .saveParticipantScore(EXAM_SCORE, participantAddress);

      const firstTokenId = 0;
      const ownerAddress = await exam.ownerOf(firstTokenId);
      expect(ownerAddress).equals(participantAddress);
    });

    it("Expects revert when getting the owner of the tokenId that doesn't exist", async () => {
      const { exam, participantAddress, backendSigner } = await loadFixture(
        deployExamFixture
      );

      await exam
        .connect(backendSigner)
        .saveParticipantScore(EXAM_SCORE, participantAddress);
      const secondTokenId = 1;
      await expect(exam.ownerOf(secondTokenId)).to.be.revertedWith(
        'ERC721: invalid token ID'
      );
    });

    it('Expects revert when trying to transfer the token', async () => {
      const {
        exam,
        participantAddress: otherAddress,
        backendSigner,
        otherAccount,
      } = await loadFixture(deployExamFixture);
      await exam
        .connect(backendSigner)
        .saveParticipantScore(EXAM_SCORE, otherAccount.address);

      const firstTokenId = 0;
      await expect(
        exam
          .connect(otherAccount)
          .transferFrom(otherAccount.address, otherAddress, firstTokenId)
      ).to.be.revertedWith('You cannot transfer Exam tokens');
    });

    it('Validates the tokenURI data', async () => {
      const { exam, participantAddress, backendSigner } = await loadFixture(
        deployExamFixture
      );
      await exam
        .connect(backendSigner)
        .saveParticipantScore(EXAM_SCORE, participantAddress);

      const examName = await exam.name();

      const tokenUriBase64Encoded = await exam.tokenURI(0);

      // 29 = length of "data:application/json;base64,"
      const tokenUriInJson = Buffer.from(
        tokenUriBase64Encoded.substring(29),
        'base64'
      ).toString();

      const tokenUriData: TokenUriData = JSON.parse(tokenUriInJson);

      // 26 = length of "data:image/svg+xml;base64,"
      const svg = Buffer.from(
        tokenUriData.image.substring(26),
        'base64'
      ).toString();

      expect(tokenUriData.name).equals(examName);
      expect(tokenUriData.description).equals(EXAM_DESCRIPTION);
      expect(svg).includes(EXAM_SCORE);
      // case doesn't matter in addresses
      expect(svg).includes(participantAddress.toLocaleLowerCase());
    });
  });
});
