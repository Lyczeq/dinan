import z from 'zod';

export const answerSchema = z.object({
  isCorrect: z.boolean().optional(),
  text: z.string().trim().min(1).max(50),
});

export const questionSchema = z.object({
  text: z.string().trim().min(5).max(150),
  answers: z
    .array(answerSchema)
    .min(2, { message: 'You have to specify at least two answers' })
    .max(5),
});

export const examSchema = z.object({
  name: z.string().trim().min(5).max(20),
  symbol: z.string().trim().min(3).max(5),
  description: z.string().trim().min(10).max(50),
  questions: z
    .array(questionSchema)
    .min(2, { message: 'You have to specify at least two questions' })
    .max(30),
});
