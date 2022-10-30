import express from 'express';
import { getAllExams } from 'controllers/exams';

export const router = express.Router();

router.route('/').get(getAllExams);
