import { Contract, ethers } from 'ethers';
import prisma from '../prisma';
import { env } from '../config';

import EXAM_CONTROLLER from './abis/ExamController.json';
import EXAM from './abis/Exam.json';

export class ContractHandler {
  static readonly providerNetwork: string = 'maticmum';
  static readonly websocketProviderNetwork = {
    name: this.providerNetwork,
    chainId: 80001,
  };

  static readonly examControllerAddress: string =
    '0xe87C44226B84C662619F848F0b325E4850A8770f';

  static listenOnNewExamCreation() {
    const provider = new ethers.providers.AlchemyWebSocketProvider(
      this.websocketProviderNetwork,
      env.ALCHEMY_API_KEY
    );

    const examControllerContract = new Contract(
      this.examControllerAddress,
      EXAM_CONTROLLER.abi,
      provider
    );

    const newExamCreationEventName = 'NewExamCreation';

    examControllerContract.on(
      newExamCreationEventName,
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

    const examControllerContract = new Contract(
      this.examControllerAddress,
      EXAM_CONTROLLER.abi,
      provider
    );

    const newExamParticipationEventName = 'NewExamParticipation';

    examControllerContract.on(
      newExamParticipationEventName,
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

    const examContract = new ethers.Contract(examAddress, EXAM.abi, signer);
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
