import { ethers, Contract } from 'ethers';
import { env } from './config';
import prisma from '../prisma';

import EXAM from './abis/Exam.json';
import EXAM_CONTROLLER from './abis/ExamController.json';

type address = string;

function listenOnNewExamCreation() {
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
    async (newExamAddress: address, creatorAddress: address) => {
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

async function listenOnNewExamParticipation() {
  const provider = new ethers.providers.WebSocketProvider(
    env.ALCHEMY_WEBSOCKET_LINK
  );

  const examControllerContract = new Contract(
    'address',
    EXAM_CONTROLLER.abi,
    provider
  );

  examControllerContract.on(
    'NewExamParticipation',
    async (exam: address, participant: address) => {
      try {
        await prisma.examParticipation.create({
          data: {
            examAddress: exam,
            participantAddress: participant,
            isFinished: false,
          },
        });
      } catch (error) {}
    }
  );
}
