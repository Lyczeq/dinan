import z from 'zod';
import { answerSchema, examSchema, questionSchema } from './schemas';

export type NewExam = z.infer<typeof examSchema>;
export type NewQuestion = z.infer<typeof questionSchema>;
export type NewAnswer = z.infer<typeof answerSchema>;
