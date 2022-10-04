import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import { MOCK_QUESTIONS, EXAM_DESCRIPTION, EXAM_NAME } from './constants';

describe('Exam tests', () => {
  async function deployExamFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Exam = await ethers.getContractFactory('Exam');
    const exam = await Exam.deploy();

    return { exam, owner, otherAccount };
  }

  it('');
});
