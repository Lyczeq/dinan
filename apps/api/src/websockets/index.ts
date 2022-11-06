import { Contract, ethers } from 'ethers';
import prisma from '../prisma';
import { env } from './config';

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
    async (examAddress: address, participantAddress: address) => {
      try {
        const upsertParticipant = await prisma.participant.upsert({
          include: {
            examParticipations: true,
          },
          where: {
            address: participantAddress,
          },
          update: {
            examParticipations: {
              create: {
                isFinished: false,
                examAddress,
              },
            },
          },
          create: {
            address: participantAddress,
            examParticipations: {
              create: {
                isFinished: false,
                examAddress,
              },
            },
          },
        });
      } catch (error) {}
    }
  );
}
