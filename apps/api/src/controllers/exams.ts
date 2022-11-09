import { Exam, Question, Answer } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../prisma';
import { exclude } from './helpers';

export const getAllExams = async (req: Request, res: Response) => {
  try {
    const exams = await prisma.exam.findMany();
    res.statusCode = 200;
    return res.json({ exams });
  } catch (error) {
    res.sendStatus(500);
  }
};

type SentExam = Exam & {
  questions: SentQuestion[];
};

type SentQuestion = Question & {
  answers: Answer[];
};

export const addExam = async (req: Request, res: Response) => {
  try {
    const { exam } = req.body as { exam: SentExam };

    if (!exam) {
      res.sendStatus(400);
      return;
    }

    const { address, creatorAddress } = exam;

    const examCreatedByEvent = await prisma.exam.findFirst({
      where: {
        address,
        creatorAddress,
      },
    });

    if (!examCreatedByEvent) {
      res.sendStatus(401);
      return;
    }

    const updatedExam = await prisma.exam.update({
      where: {
        address,
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

  try {
    const examParticipation = await prisma.examParticipation.findFirst({
      where: {
        examAddress,
        participantAddress,
      },
    });

    if (!examParticipation) return res.sendStatus(404);

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
      examAddress,
      participantAddress,
      exam: examToParicipate,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};
