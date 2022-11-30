import z from 'zod';

const participantAnswer = z.object({
  questionId: z.string(),
  answerIds: z.array(z.string()),
});

export type ParticipantAnswer = z.infer<typeof participantAnswer>;
