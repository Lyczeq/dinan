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

  return { exam, owner, otherAccount };
}

describe('Exam tests', () => {});
