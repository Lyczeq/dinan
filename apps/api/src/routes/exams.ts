import express, { Request, Response } from 'express';
import {
  getAllExams,
  updateExamWithQuestions,
  getSingleExam,
  getExamsQuestionsAndAnswers,
  compareParticipantAnswers,
} from '../controllers/exams';

export const router = express.Router();

const test = async (req: Request, res: Response) => {
  const examAddress = req.headers.authorization?.split(' ').at(1);
  const body = req.body;
  res.statusCode = 201;
  return res.send({ examAddress, body });
};

router.route('/').get(getAllExams);
router.route('/:address').put(updateExamWithQuestions);
router.route('/:address').get(getSingleExam);
router.route('/:address/participate').get(getExamsQuestionsAndAnswers);
router.route('/:address/compare').post(compareParticipantAnswers);
router.route('/test/:address').put(test);
