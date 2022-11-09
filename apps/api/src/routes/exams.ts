import express from 'express';
import {
  getAllExams,
  addExam,
  getSingleExam,
  getExamsQuestionsAndAnswers,
} from '../controllers/exams';

export const router = express.Router();

router.route('/').get(getAllExams);
router.route('/').post(addExam);
router.route('/:address').get(getSingleExam);
router.route('/:address/participate').get(getExamsQuestionsAndAnswers);
