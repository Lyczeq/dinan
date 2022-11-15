import express from 'express';
import {
  getAllExams,
  updateExamWithQuestions,
  getSingleExam,
  getExamsQuestionsAndAnswers,
  compareParticipantAnswers,
} from '../controllers/exams';

export const router = express.Router();

router.route('/').get(getAllExams);
router.route('/:address').put(updateExamWithQuestions);
router.route('/:address').get(getSingleExam);
router.route('/:address/participate').get(getExamsQuestionsAndAnswers);
router.route('/:address/compare').post(compareParticipantAnswers);
