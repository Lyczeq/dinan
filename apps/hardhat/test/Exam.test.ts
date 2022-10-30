import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

import { EXAM_DESCRIPTION, EXAM_NAME } from './constants';
import { getTimestampFixture } from './utils';

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

describe('Exam tests', () => {});
