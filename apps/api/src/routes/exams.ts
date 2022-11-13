import express, { Request, Response } from 'express';
import {
  getAllExams,
  updateExamWithQuestions,
  getSingleExam,
  getExamsQuestionsAndAnswers,
  compareParticipantAnswers,
} from '../controllers/exams';

export const router = express.Router();

const xd = async (req: Request, res: Response) => {
  const examAddress = req.headers.authorization?.split(' ').at(1);
  const body = req.body;
  console.log('XDDD');
  res.statusCode = 201;
  return res.send({ examAddress, body });
};

router.route('/').get(getAllExams);
router.route('/:address').put(updateExamWithQuestions);
router.route('/:address').get(getSingleExam);
router.route('/:address/participate').get(getExamsQuestionsAndAnswers);
router.route('/:address/compare').post(compareParticipantAnswers);
router.route('/test/:address').put(xd);
