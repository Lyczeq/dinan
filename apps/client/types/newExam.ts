import { Answer, Exam, Question } from '@dinan/types';

export type NewExamAnswer = Omit<Answer, 'id' | 'questionId'>;
export type NewExamQuestion = Omit<
  Question,
  'id' | 'examAddress' | 'answers'
> & {
  answers: NewExamAnswer[];
};

export type NewExam = Omit<Exam, 'address' | 'creatorAddress' | 'questions'> & {
  questions: NewExamQuestion[];
};
