import { Answer } from './Answer';

export type Question = {
  id: string;
  answers: Answer[];
  text: string;
  examAddress: string;
};
