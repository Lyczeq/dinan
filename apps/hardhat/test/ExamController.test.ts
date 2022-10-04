import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

import { getTimestampFixture } from './utils';
import { MOCK_QUESTIONS, EXAM_DESCRIPTION, EXAM_NAME } from './constants';

describe('ExamController tests', () => {
  async function deployExamControllerFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const ExamController = await ethers.getContractFactory('ExamController');
    const examController = await ExamController.deploy();

    return { examController, owner, otherAccount };
  }

  it('Should return empty Exams array.', async () => {
    const { examController } = await loadFixture(deployExamControllerFixture);
    const exams = await examController.getExams();
    expect(exams).to.be.an('array').that.is.empty;
  });

  it('Should be reverted when adding an Exam with an empty questions array.', async () => {
    const { examController } = await loadFixture(deployExamControllerFixture);
    await expect(
      examController.addExam(EXAM_NAME, EXAM_DESCRIPTION, [])
    ).to.be.revertedWith("The questions array you've provided is empty.");
  });

  it("Should add a new Exam to the Exams array and check whether the Exams' data is the same.", async () => {
    const { examController } = await loadFixture(deployExamControllerFixture);

    await examController.addExam(EXAM_NAME, EXAM_DESCRIPTION, MOCK_QUESTIONS);
    const exams = await examController.getExams();

    const firstExam = exams.at(0)!;

    expect(firstExam.examAddress).be.properAddress;
    expect(firstExam).to.haveOwnProperty('name', EXAM_NAME);
    expect(firstExam).to.haveOwnProperty('description', EXAM_DESCRIPTION);

    const timestamp = await getTimestampFixture();
    const examTimestamp: BigNumber = exams.at(0)?.timestamp!;

    expect(examTimestamp).to.be.equal(BigNumber.from(timestamp));
  });

  it("Should't include users' addreses in the given Exam array.", async () => {
    const { examController, otherAccount, owner } = await loadFixture(
      deployExamControllerFixture
    );

    await examController.addExam(EXAM_NAME, EXAM_DESCRIPTION, MOCK_QUESTIONS);
    await examController
      .connect(otherAccount)
      .addExam(EXAM_NAME, EXAM_DESCRIPTION, MOCK_QUESTIONS);

    const exams = await examController.getExams();
    const examAddresses = exams.map(e => e.examAddress);

    expect(examAddresses).to.not.include(owner.address);
    expect(examAddresses).to.not.include(otherAccount.address);
  });

  it('Should test that created Exams by the same creator and of the same data have different addreses.', async () => {
    const { examController } = await loadFixture(deployExamControllerFixture);

    await examController.addExam(EXAM_NAME, EXAM_DESCRIPTION, MOCK_QUESTIONS);
    await examController.addExam(EXAM_NAME, EXAM_DESCRIPTION, MOCK_QUESTIONS);

    const exams = await examController.getExams();
    const examAddresses = exams.map(e => e.examAddress);
    expect(examAddresses[0]).to.not.be.equal(examAddresses[1]);
  });

  it("Shouldn't add Exam with more than 30 questions", async () => {
    const { examController } = await loadFixture(deployExamControllerFixture);
    const firstQuestion = MOCK_QUESTIONS.at(0);
    const tooManyQuestions = Array(31).fill(firstQuestion);

    await expect(
      examController.addExam(EXAM_NAME, EXAM_DESCRIPTION, tooManyQuestions)
    ).to.be.revertedWith('The maximum number of questions you can add is 30.');
  });
});
