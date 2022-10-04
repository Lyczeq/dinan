import { Answer, Question } from '../types/Exam';

export const MOCK_ANSWERS: Answer[] = [
  {
    id: 1,
    answerText: 'aText1',
    isCorrect: false,
  },
  {
    id: 2,
    answerText: 'aText2',
    isCorrect: true,
  },
];

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    header: 'questionHeader',
    description: 'questionDescription',
    answers: MOCK_ANSWERS,
  },
];

export const EXAM_NAME = 'examName';
export const EXAM_DESCRIPTION = 'examDescription';
