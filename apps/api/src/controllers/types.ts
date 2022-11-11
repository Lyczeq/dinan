import { Answer, Exam, Question } from '@prisma/client';

export type ParticipantAnswer = {
  questionId: string;
  answerIds: string[];
};

export type FullExam = Exam & {
  questions: QuestionWithAnswers[];
};

export type QuestionWithAnswers = Question & {
  answers: Answer[];
};
