import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Question } from '../types/Exam';
import {
  MOCK_QUESTIONS,
  EXAM_DESCRIPTION,
  EXAM_NAME,
  MOCK_ANSWERS,
} from './constants';
import { getTimestampFixture } from './utils';

describe('Exam tests', () => {
  async function deployExamFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Exam = await ethers.getContractFactory('Exam');
    const timestamp = await getTimestampFixture();

    const mockExamControllerAddress = owner.address;

    const exam = await Exam.deploy(
      timestamp,
      EXAM_NAME,
      EXAM_DESCRIPTION,
      owner.address,
      mockExamControllerAddress
    );

    return { exam, owner, otherAccount };
  }

  it('Creates a simple Exam without adding questions', async () => {
    const { exam } = await loadFixture(deployExamFixture);
    const examAddress = await exam.getAddress();
    expect(examAddress).to.be.properAddress;
  });

  it('Adds questions to an Exam contract', async () => {
    const { exam } = await loadFixture(deployExamFixture);
    exam.addQuestion(MOCK_QUESTIONS.at(0)!);
  });

  it("Shouldn't add Exam with more than 6 answers to a single question", async () => {
    const { exam } = await loadFixture(deployExamFixture);

    const basicAnswer = MOCK_ANSWERS.at(0)!;

    const answersArray = new Array(7).fill(0).map((_, idx) => ({
      ...basicAnswer,
      id: idx,
    }));

    const questionWithTooManyAnswers: Question = {
      id: 1,
      description: EXAM_DESCRIPTION,
      header: EXAM_NAME,
      answers: answersArray,
    };

    await expect(
      exam.addQuestion(questionWithTooManyAnswers)
    ).to.be.revertedWith(
      'The maximum number of answers you can add to a single question is 6.'
    );
  });
});
