import { ParticipantAnswer, QuestionWithAnswers } from '../types';
import { areAllAnswersForParticularQuestionCorrect } from '../helpers';

const participantAnswers: ParticipantAnswer[] = [
  {
    questionId: '1',
    answerIds: ['1', '3'],
  },
  {
    questionId: '2',
    answerIds: ['1', '2'],
  },
  {
    questionId: '3',
    answerIds: ['1'],
  },
];

type CompareAnswersCase = [QuestionWithAnswers, ParticipantAnswer[], boolean];

const cases: CompareAnswersCase[] = [
  [
    {
      //case when arrays length aren't equal
      id: '1',
      examAddress: '',
      text: '',
      answers: [
        {
          id: '1',
          isCorrect: true,
          questionId: '1',
          text: '',
        },
        {
          id: '2',
          isCorrect: true,
          questionId: '1',
          text: '',
        },
        {
          id: '3',
          isCorrect: true,
          questionId: '1',
          text: '',
        },
      ],
    },
    participantAnswers,
    false,
  ],
  [
    {
      id: '2',
      examAddress: '',
      text: '',
      answers: [
        {
          id: '1',
          isCorrect: true,
          questionId: '2',
          text: '',
        },
        {
          id: '2',
          isCorrect: false,
          questionId: '2',
          text: '',
        },
      ],
    },
    participantAnswers,
    false,
  ],
  [
    {
      id: '3',
      examAddress: '',
      text: '',
      answers: [
        {
          id: '1',
          isCorrect: true,
          questionId: '3',
          text: '',
        },
        {
          id: '2',
          isCorrect: false,
          questionId: '3',
          text: '',
        },
      ],
    },
    participantAnswers,
    true,
  ],
];

describe('Test Calculate percentage score', () => {
  it.each(cases)(
    'Given question %p and participantAnswers %p return %p ',
    (question, participantAnswers, expectedResult) => {
      expect(
        areAllAnswersForParticularQuestionCorrect(question, participantAnswers)
      ).toBe(expectedResult);
    }
  );
});
