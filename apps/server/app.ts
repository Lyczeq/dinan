import express from 'express';
import { router as exams } from './routes/exams';

const app = express();
app.use(express.json());

app.use('/api/v1/exams', exams);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
