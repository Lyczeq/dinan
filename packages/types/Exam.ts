import { Question } from './Question';

export type Exam = {
  address: string;
  name: string;
  symbol: string;
  description: string;
  questions: Question[];
  creatorAddress: string;
};
