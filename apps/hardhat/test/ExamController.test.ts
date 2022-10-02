import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Question, Answer } from '../types/Exam';

describe('ExamController', () => {
  async function deployExamControllerFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const ExamController = await ethers.getContractFactory('ExamController');
    const examController = await ExamController.deploy();

    return { examController, owner, otherAccount };
  }

  it('Should return empty Exams array', async () => {
    const { examController } = await loadFixture(deployExamControllerFixture);
    const exams = await examController.getExams();
    expect(exams).to.be.an('array').that.is.empty;
  });

  it('Should add a new Exam to the Exams array', async () => {
    const { examController } = await loadFixture(deployExamControllerFixture);
    const name = 'examName';
    const description = 'examDescription';
    const answers: Answer[] = [
      {
        answerText: 'aText1',
        isCorrect: false,
      },
      {
        answerText: 'aText2',
        isCorrect: true,
      },
    ];
    const questions: Question[] = [
      {
        header: 'questionHeader',
        description: 'questionDescription',
        answers,
      },
    ];

    await examController.addExam(name, description, questions);
  });
});
