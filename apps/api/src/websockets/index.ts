import { Contract, ethers } from 'ethers';
import prisma from '../prisma';
import { env } from '../config';

import EXAM_CONTROLLER from './abis/ExamController.json';
import EXAM from './abis/Exam.json';

type address = string;

export class ContractHandler {
  static providerNetwork: string = 'maticmum';
  static websocketProviderNetwork = {
    name: 'maticmum',
    chainId: 80001,
  };

  static listenOnNewExamCreation() {
    const provider = new ethers.providers.AlchemyWebSocketProvider(
      this.websocketProviderNetwork,
      env.ALCHEMY_API_KEY
    );

    const examControllerContract = new Contract(
      '0xa86f4c00F1CFe4E3446bD0DE788A81BeBF567F9e',
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

  static async listenOnNewExamParticipation() {
    const provider = new ethers.providers.AlchemyWebSocketProvider(
      this.websocketProviderNetwork,
      env.ALCHEMY_API_KEY
    );

    const examControllerContract = new Contract(
      '0xa86f4c00F1CFe4E3446bD0DE788A81BeBF567F9e',
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

  static setupWebsockets() {
    this.listenOnNewExamCreation();
    this.listenOnNewExamParticipation();
  }

  static async sendScoreTransaction(
    examAddress: string,
    participantAddress: string,
    score: number
  ): Promise<string> {
    const provider = new ethers.providers.AlchemyProvider(
      this.providerNetwork,
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
    return tx.hash;
  }
}
