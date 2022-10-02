export type Question = {
  description: string;
  header: string;
  answers: Answer[];
};

export type Answer = {
  answerText: string;
  isCorrect: boolean;
};

export type Exam = {
  name: string;
  timestamp: number;
  questions: Question[];
};
