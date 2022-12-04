import z from 'zod';

const getErrorMessage = (name: string, number: number, isMax: boolean) => {
  const charactersForm = number === 1 ? 'character' : 'characters';
  const minOrMaxText = isMax ? 'most' : 'least';
  const message = `${name} must contain at ${minOrMaxText} ${number} ${charactersForm}.`;
  return { message };
};

export const answerSchema = z.object({
  isCorrect: z.boolean().optional(),
  text: z
    .string()
    .trim()
    .min(1, getErrorMessage('Answer', 1, false))
    .max(250, getErrorMessage('Answer', 250, true)),
});

export const questionSchema = z.object({
  text: z
    .string()
    .trim()
    .min(5, getErrorMessage('Question', 5, false))
    .max(250, getErrorMessage('Question', 250, true)),
  answers: z
    .array(answerSchema)
    .min(2, { message: 'You have to specify at least two answers' })
    .max(5),
});

export const examSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, getErrorMessage('Name', 5, false))
    .max(20, getErrorMessage('Answer', 25, true)),
  symbol: z
    .string()
    .trim()
    .min(3, getErrorMessage('Symbol', 3, false))
    .max(5, getErrorMessage('Symbol', 5, true)),
  description: z
    .string()
    .trim()
    .min(10, getErrorMessage('Description', 10, false))
    .max(50, getErrorMessage('Description', 50, true)),
  questions: z
    .array(questionSchema)
    .min(2, { message: 'You have to specify at least two questions' })
    .max(30),
});
