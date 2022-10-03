import { Answer, Question } from '../types/Exam';

const answers: Answer[] = [
  {
    answerText: 'aText1',
    isCorrect: false,
  },
  {
    answerText: 'aText2',
    isCorrect: true,
  },
];

export const MOCK_QUESTIONS: Question[] = [
  {
    header: 'questionHeader',
    description: 'questionDescription',
    answers,
  },
];
