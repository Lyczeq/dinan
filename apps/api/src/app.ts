import { ContractHandler } from './websockets/index';
import express from 'express';

import { router as exams } from './routes/exams';
import { router as users } from './routes/users';
import { env } from './config';
import prisma from './prisma';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/exams', exams);
app.use('/api/v1/users', users);

const main = async () => {
  ContractHandler.setupWebsockets();
  app.listen(env.PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${env.PORT}`)
  );
};

main().catch(e => {
  console.log(e);
  prisma.$disconnect;
});
