import express from 'express';

import { router as exams } from './routes/exams';
import { env } from './config';
import prisma from './prisma';

const app = express();
app.use(express.json());

app.use('/api/v1/exams', exams);

const main = async () => {
  app.listen(env.PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${env.PORT}`)
  );
};

main().catch(e => {
  console.log(e);
  prisma.$disconnect;
});
