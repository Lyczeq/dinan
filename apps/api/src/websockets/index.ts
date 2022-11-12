import { Contract, ethers } from 'ethers';
import prisma from '../prisma';
import { env } from './config';

import EXAM_CONTROLLER from './abis/ExamController.json';
import EXAM from './abis/Exam.json';

type address = string;

function listenOnNewExamCreation() {
  const provider = new ethers.providers.AlchemyWebSocketProvider(
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
  const provider = new ethers.providers.AlchemyWebSocketProvider(
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
                hasParticipantStarted: false,
                isFinished: false,
                examAddress,
              },
            },
          },
          create: {
            address: participantAddress,
            examParticipations: {
              create: {
                hasParticipantStarted: false,
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

export const sendScoreTransaction = async (
  examAddress: string,
  participantAddress: string,
  score: string
) => {
  const provider = new ethers.providers.AlchemyProvider(
    'maticmum',
    env.ALCHEMY_API_KEY
  );

  const signer = new ethers.Wallet(env.PRIVATE_KEY, provider);

  const examContract = new ethers.Contract(examAddress, EXAM.abi, signer);
  const gasPrice = await provider.getGasPrice();
  const tx = await examContract.saveParticipantScore(
    score,
    participantAddress,
    {
      gasPrice: gasPrice.toNumber(),
    }
  );

  await tx.wait();
};
