import { ethers } from 'hardhat';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { EXAM_NAME, EXAM_SYMBOL } from './constants';
import { expect } from 'chai';

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

  return { exam, owner, otherAccount };
}

describe('Exam tests', () => {
  it('Checks name and symbol of the created Exam', async () => {
    const { exam } = await loadFixture(deployExamFixture);
    const examName = await exam.name();
    const examSymbol = await exam.symbol();

    expect(examName).equals(EXAM_NAME);
    expect(examSymbol).equals(examSymbol);
  });
});
