import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { MOCK_QUESTIONS } from './utils';

const EXAM_NAME = 'examName';
const EXAM_DESCRIPTION = 'examDescription';

describe('ExamController', () => {
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

  it('Should add a new Exam to the Exams array.', async () => {
    const { examController } = await loadFixture(deployExamControllerFixture);

    await examController.addExam(EXAM_NAME, EXAM_DESCRIPTION, MOCK_QUESTIONS);
    const exams = await examController.getExams();
    expect(exams[0]).to.haveOwnProperty('examAddress');
    expect(exams[0]).to.haveOwnProperty('name', EXAM_NAME);
    expect(exams[0]).to.haveOwnProperty('description', EXAM_DESCRIPTION);
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

  it('Should test that created Exams of the same data and the same creator have different addreses.', async () => {
    const { examController } = await loadFixture(deployExamControllerFixture);

    await examController.addExam(EXAM_NAME, EXAM_DESCRIPTION, MOCK_QUESTIONS);
    await examController.addExam(EXAM_NAME, EXAM_DESCRIPTION, MOCK_QUESTIONS);

    const exams = await examController.getExams();
    const examAddresses = exams.map(e => e.examAddress);
    expect(examAddresses[0]).to.not.be.equal(examAddresses[1]);
  });
});
