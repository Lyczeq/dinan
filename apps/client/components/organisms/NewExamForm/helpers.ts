import { NewExam, NewAnswer, NewQuestion } from '@dinan/types/newExam';

export const readableDate = () => {
  const date = new Date();
  return `${date.toLocaleTimeString()},${date.toDateString()}`;
};

export const initialAnswer: NewAnswer = {
  text: '',
  isCorrect: false,
};

export const initialQuestion: NewQuestion = {
  text: '',
  answers: [initialAnswer, initialAnswer],
};

export const initialExam: NewExam = {
  name: '',
  description: '',
  symbol: '',
  questions: [initialQuestion, initialQuestion],
};
