import { ParticipantAnswer, QuestionWithAnswers } from './types';

export function exclude<T, Key extends keyof T>(
  object: T,
  ...keys: Key[]
): Omit<T, Key> {
  for (let key of keys) {
    delete object[key];
  }
  return object;
}

export const getPercentageScore = (maxScore: number, score: number) => {
  return Number((score / maxScore).toFixed(2)) * 100;
};

export const areAllAnswersForParticularQuestionCorrect = (
  question: QuestionWithAnswers,
  participantAnswers: ParticipantAnswer[]
) => {
  const answersForParticularQuestion = participantAnswers.find(
    answer => answer.questionId === question.id
  );

  const participantAnswersIds = answersForParticularQuestion?.answerIds;

  const correctAnswers = question.answers.filter(answer => answer.isCorrect);

  if (participantAnswersIds?.length !== correctAnswers.length) return false;

  const areAllGivenAnswersCorrect = correctAnswers.every(answer =>
    participantAnswersIds.includes(answer.id)
  );

  return areAllGivenAnswersCorrect;
};

export const calculateScore = (
  examQuestions: QuestionWithAnswers[],
  participantAnswers: ParticipantAnswer[]
): number => {
  const score = examQuestions.reduce((previousScore, currentQuestion) => {
    return areAllAnswersForParticularQuestionCorrect(
      currentQuestion,
      participantAnswers
    )
      ? (previousScore += 1)
      : previousScore;
  }, 0);

  return score;
};
