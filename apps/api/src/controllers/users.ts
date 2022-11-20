import prisma from '../prisma';
import { Request, Response } from 'express';

export const getExamsCreatedBySpecificUser = async (
  req: Request,
  res: Response
) => {
  const userAddress = req.params.address;

  try {
    const exams = await prisma.exam.findMany({
      where: {
        creatorAddress: {
          mode: 'insensitive',
          equals: userAddress,
        },
      },
    });

    res.statusCode = 200;
    res.send({
      exams,
    });
  } catch (e) {}
};
