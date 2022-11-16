import { ethers } from 'ethers';
import {
  events,
  getNewExamControllerContract,
} from '@dinan/contracts/examController';
import { getNewExamContract } from '@dinan/contracts/exam';
import prisma from '../prisma';
import { env } from '../config';

export class ContractHandler {
  static readonly providerNetwork: string = 'maticmum';
  static readonly websocketProviderNetwork = {
    name: this.providerNetwork,
    chainId: 80001,
  };

  static listenOnNewExamCreation() {
    const provider = new ethers.providers.AlchemyWebSocketProvider(
      this.websocketProviderNetwork,
      env.ALCHEMY_API_KEY
    );

    const examControllerContract = getNewExamControllerContract(provider);

    examControllerContract.on(
      events.newExamCreation,
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

  static async listenOnNewExamParticipation() {
    const provider = new ethers.providers.AlchemyWebSocketProvider(
      this.websocketProviderNetwork,
      env.ALCHEMY_API_KEY
    );

    const examControllerContract = getNewExamControllerContract(provider);

    examControllerContract.on(
      events.newExamParticipation,
      async (examAddress: string, participantAddress: string) => {
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

  static async sendScoreAndMakeNFT(
    examAddress: string,
    participantAddress: string,
    score: number
  ): Promise<string> {
    const provider = new ethers.providers.AlchemyProvider(
      this.providerNetwork,
      env.ALCHEMY_API_KEY
    );

    const signer = new ethers.Wallet(env.PRIVATE_KEY, provider);

    const examContract = getNewExamContract(examAddress, signer);
    const gasPrice = await provider.getGasPrice();
    const tx = await examContract.saveParticipantScore(
      score,
      participantAddress,
      {
        gasPrice: gasPrice.toNumber(),
      }
    );

    return tx.hash;
  }
}
