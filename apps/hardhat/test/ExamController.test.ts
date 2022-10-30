import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

import { EXAM_DESCRIPTION, EXAM_NAME, MOCK_QUESTIONS } from './constants';
import { getTimestampFixture } from './utils';

async function deployExamControllerFixture() {
  const [owner, otherAccount] = await ethers.getSigners();

  const ExamController = await ethers.getContractFactory('ExamController');
  const examController = await ExamController.deploy();

  return { examController, owner, otherAccount };
}

describe('Features', () => {});
