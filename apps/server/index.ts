import { PrismaClient } from '@prisma/client';
import express, { Express, Request, Response } from 'express';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({ data: { name: 'michael' } });
  console.log('usr', user);
  const ursrs = await prisma.user.findMany();
  console.log(ursrs);
}
main()
  .catch(e => console.log(e))
  .finally(async () => await prisma.$disconnect());
