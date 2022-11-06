import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { EXAM_NAME, EXAM_SYMBOL } from './constants';

async function deployExamFixture() {
  const [owner, otherAccount] = await ethers.getSigners();

  const Exam = await ethers.getContractFactory('Exam');
  const creatorAddress = owner.address;
  const mockExamControllerAddress = owner.address;

  const exam = await Exam.deploy(
    EXAM_NAME,
    EXAM_SYMBOL,
    creatorAddress,
    mockExamControllerAddress
  );

  return {
    exam,
    participantAddress: owner.address,
    otherAccount,
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
      ).to.be.revertedWith(
        "Your address isn't the ExamController Contract address."
      );
    });

    it('test', async () => {
      const { exam, participantAddress, otherAccount } = await loadFixture(
        deployExamFixture
      );
      await exam.participateInExam(participantAddress);
      await expect(
        exam.getParticipantResult(otherAccount.address)
      ).to.be.revertedWith('There is no participant with this address.');
    });
  });
});
