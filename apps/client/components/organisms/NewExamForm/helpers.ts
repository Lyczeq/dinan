import { NewExam, NewExamAnswer, NewExamQuestion } from 'types/newExam';

export const initialAnswer: NewExamAnswer = {
  text: '',
  isCorrect: false,
};
export const initialQuestion: NewExamQuestion = {
  text: '',
  answers: [initialAnswer, initialAnswer],
};

export const initialExam: NewExam = {
  name: '',
  description: '',
  symbol: '',
  questions: [initialQuestion],
};
