import { ethers, Contract } from 'ethers';
import { env } from './config';
import prisma from '../prisma';

import EXAM from './abis/Exam.json';
import EXAM_CONTROLLER from './abis/ExamController.json';

const examContract = new Contract('address', EXAM.abi);
async function main() {
  const provider = new ethers.providers.WebSocketProvider(
    env.ALCHEMY_WEBSOCKET_LINK
  );

  const examControllerContract = new Contract(
    'address',
    EXAM_CONTROLLER.abi,
    provider
  );

  examControllerContract.on(
    'NewExamCreation',
    async (newExamAddress: string, creatorAddress: string) => {
      try {
        await prisma.exam.create({
          data: {
            address: newExamAddress,
            creatorAddress: creatorAddress,
          },
        });
      } catch (error) {}
    }
  );
}
