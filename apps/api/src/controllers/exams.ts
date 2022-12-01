import { Request, Response } from 'express';
import prisma from '../prisma';
import { ContractHandler } from '../websockets';
import { calculateScore, exclude, getPercentageScore } from './helpers';
import { FullExam } from './types';
import {
  ParticipantAnswer,
  participantAnswerSchema,
} from '@dinan/types/ExamParticipation';
import z from 'zod';

export const getAllExams = async (req: Request, res: Response) => {
  try {
    const exams = await prisma.exam.findMany();
    res.statusCode = 200;
    return res.json({ exams });
  } catch (error) {
    res.sendStatus(500);
  }
};

export const updateExamWithQuestions = async (req: Request, res: Response) => {
  try {
    const { exam } = req.body as { exam: FullExam };
    const examAddress = req.params.address;

    if (!exam) {
      res.sendStatus(400);
      return;
    }
    const creatorAddress = req.headers.authorization?.split(' ').at(1);

    const examCreatedByEvent = await prisma.exam.findFirst({
      where: {
        address: {
          equals: examAddress,
          mode: 'insensitive',
        },
        creatorAddress: {
          equals: creatorAddress,
          mode: 'insensitive',
        },
      },
    });

    if (!examCreatedByEvent) {
      res.sendStatus(401);
      return;
    }

    const updatedExam = await prisma.exam.update({
      where: {
        address: examAddress,
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
      data: {
        ...exam,
        questions: {
          create: exam.questions.map(question => ({
            ...question,
            answers: {
              create: question.answers,
            },
          })),
        },
      },
    });

    res.statusCode = 201;
    res.send(updatedExam);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getSingleExam = async (req: Request, res: Response) => {
  const examAddress = req.params.address;
  try {
    const exam = await prisma.exam.findUnique({
      where: {
        address: examAddress,
      },
    });
    if (!exam) return res.sendStatus(404);

    res.statusCode = 200;
    return res.json({ exam });
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getExamsQuestionsAndAnswers = async (
  req: Request,
  res: Response
) => {
  const participantAddress = req.headers.authorization?.split(' ').at(1);
  const examAddress = req.params.address;
  if (!(participantAddress || examAddress)) {
    res.sendStatus(400);
    return;
  }

  try {
    const examParticipation = await prisma.examParticipation.findFirst({
      where: {
        examAddress: {
          mode: 'insensitive',
          equals: examAddress,
        },
        participantAddress: {
          mode: 'insensitive',
          equals: participantAddress,
        },
      },
    });
    if (!examParticipation) return res.sendStatus(404);

    if (examParticipation.hasParticipantStarted) {
      res.sendStatus(401);
      res.statusMessage = 'You have already started that exam';
      return;
    }

    await prisma.examParticipation.update({
      where: {
        id: examParticipation.id,
      },
      data: {
        hasParticipantStarted: true,
      },
    });

    const examToParticipateWithIsCorrectProperties =
      await prisma.exam.findUnique({
        include: {
          questions: {
            include: {
              answers: true,
            },
          },
        },
        where: {
          address: examAddress,
        },
      });

    const examToParicipate = {
      ...examToParticipateWithIsCorrectProperties,
      questions: examToParticipateWithIsCorrectProperties?.questions.map(
        question => {
          return {
            ...question,
            answers: question.answers.map(answer =>
              exclude(answer, 'isCorrect')
            ),
          };
        }
      ),
    };

    res.statusCode = 200;
    return res.json({
      exam: examToParicipate,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

export const compareParticipantAnswers = async (
  req: Request,
  res: Response
) => {
  const participantAddress = req.headers.authorization?.split(' ').at(1);

  const examAddress = req.params.address;

  if (!(participantAddress || examAddress)) {
    res.sendStatus(400);
    return;
  }

  const participantAnswers = req.body.answers;

  if (!Array.isArray(participantAnswers)) {
    res.sendStatus(400);
    return;
  }

  if (
    !participantAnswers.every(
      pa => participantAnswerSchema.safeParse(pa).success
    )
  ) {
    res.sendStatus(400);
    return;
  }

  try {
    const examParticipation = await prisma.examParticipation.findFirst({
      where: {
        examAddress: {
          mode: 'insensitive',
          equals: examAddress,
        },
        participantAddress: {
          mode: 'insensitive',
          equals: participantAddress,
        },
        hasParticipantStarted: true,
      },
    });

    if (!examParticipation) return res.sendStatus(404);

    const examQuestions = await prisma.question.findMany({
      include: {
        answers: true,
      },
      where: {
        examAddress,
      },
    });

    const score = calculateScore(examQuestions, participantAnswers);
    const percentageScore = getPercentageScore(examQuestions.length, score);

    await prisma.examParticipation.update({
      where: {
        id: examParticipation.id,
      },
      data: {
        score: percentageScore,
        isFinished: true,
      },
    });

    const txHash = await ContractHandler.sendScoreAndMakeNFT(
      examAddress,
      participantAddress as string,
      percentageScore
    );

    res.statusCode = 201;
    res.send({
      score: percentageScore,
      txHash,
    });
  } catch (error) {}
};
