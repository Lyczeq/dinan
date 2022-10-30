import { Request, Response } from 'express';
import prisma from 'prisma';

export const getAllExams = async (req: Request, res: Response) => {
  try {
    const exams = await prisma.exam.findMany();
    res.statusCode = 200;
    return res.json({ exams });
  } catch (error) {
    res.sendStatus(500);
  }
};
