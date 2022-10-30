import { ethers } from 'hardhat';

async function deployExamControllerFixture() {
  const [owner, otherAccount] = await ethers.getSigners();

  const ExamController = await ethers.getContractFactory('ExamController');
  const examController = await ExamController.deploy();

  return { examController, owner, otherAccount };
}

describe('Features', () => {});
