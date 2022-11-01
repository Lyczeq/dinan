import express from 'express';
import { getAllExams, updateExam } from '../controllers/exams';

export const router = express.Router();

router.route('/').get(getAllExams);
router.route('/').post(updateExam);
