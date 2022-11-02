import express from 'express';
import { getAllExams, addExam } from '../controllers/exams';

export const router = express.Router();

router.route('/').get(getAllExams);
router.route('/').post(addExam);
