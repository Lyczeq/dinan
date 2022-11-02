import { Exam, Question, Answer } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../prisma';

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
