import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { ethers } from 'hardhat';
import { expect } from 'chai';
import { isAddress } from 'ethers/lib/utils';
import { EXAM_NAME, EXAM_SYMBOL } from './constants';

async function deployExamControllerFixture() {
  const [owner, otherAccount] = await ethers.getSigners();

  const ExamController = await ethers.getContractFactory('ExamController');
  const examController = await ExamController.deploy();

  return { examController, owner, otherAccount };
}

describe('ExamController tests', () => {
  it("Creates simple Exam and checks it's data", async () => {
    const { examController, owner } = await loadFixture(
      deployExamControllerFixture
    );
    await examController.addExam(EXAM_NAME, EXAM_SYMBOL);

    const exams = await examController.getExams();
    const firstExamInArray = exams.at(0);
    expect(firstExamInArray?.name).equal(EXAM_NAME);
  });
  it('Expects event to be emited', async () => {
    const { examController, owner } = await loadFixture(
      deployExamControllerFixture
    );
    await expect(examController.addExam(EXAM_NAME, EXAM_SYMBOL))
      .to.emit(examController, 'NewExamCreation')
      .withArgs(isAddress, owner.address);
  });
});
