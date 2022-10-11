export type Question = {
  id: number;
  description: string;
  header: string;
  answers: Answer[];
};

export type Answer = {
  id: number;
  answerText: string;
  isCorrect: boolean;
};

export type Exam = {
  name: string;
  description: string;
  timestamp: number;
  creatorAddress: string;
  examControllerAddress: string;
  questions: Question[];
};
