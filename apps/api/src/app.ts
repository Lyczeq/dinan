import express from 'express';
import { router as exams } from './routes/exams';
import { env } from './config';

const app = express();
app.use(express.json());

app.use('/api/v1/exams', exams);

app.listen(env.PORT, () =>
  console.log(`🚀 Server ready at http://localhost:${env.PORT}`)
);
