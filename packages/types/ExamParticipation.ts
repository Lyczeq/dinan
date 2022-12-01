import z from 'zod';

export const participantAnswerSchema = z.object({
  questionId: z.string(),
  answerIds: z.array(z.string()),
});

export type ParticipantAnswer = z.infer<typeof participantAnswer>;
