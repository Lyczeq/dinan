import React from 'react';
import { Checkbox } from 'components/atoms/Checkbox';
import type { Answer, Question } from '@dinan/types';

type toggleAnswerFn = (
  questionId: string,
  answerId: string,
  isChecked: boolean
) => void;

type QuestionParticipationFormProps = {
  question: Question;
  questionIndex: number;
  toggleAnswer: toggleAnswerFn;
};

type AnswerParticipationFormProps = {
  answer: Answer;
  answerIndex: number;
  questionId: string;
  toggleAnswer: toggleAnswerFn;
};

const AnswerParticipationForm = ({
  answer,
  answerIndex,
  questionId,
  toggleAnswer,
}: AnswerParticipationFormProps) => {
  const handleToggleAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isAnswerChecked = event.target.checked;
    toggleAnswer(questionId, answer.id, isAnswerChecked);
  };

  return (
    <li className="flex gap-2 mb-2 text-justify">
      <div className="flex items-center gap-2 self-start">
        <p className="w-2 text-primary font-bold">{answerIndex + 1}. </p>
        <Checkbox
          className="w-max mt-0 gap-0 mb-0"
          onChange={handleToggleAnswer}
        />
      </div>
      <p>{answer.text}</p>
    </li>
  );
};

export const QuestionParticipationForm = ({
  question,
  questionIndex,
  toggleAnswer,
}: QuestionParticipationFormProps) => {
  return (
    <li className="w-4/5 my-2 border border-secondary rounded-md flex gap-4 flex-col p-4">
      <p className="text-justify">
        <span className="text-primary font-bold">{questionIndex + 1}. </span>
        <span>{question.text}</span>
      </p>
      <p>Answers: </p>
      <ul>
        {question.answers.map((answer, index) => (
          <AnswerParticipationForm
            key={answer.id}
            answer={answer}
            answerIndex={index}
            toggleAnswer={toggleAnswer}
            questionId={question.id}
          />
        ))}
      </ul>
    </li>
  );
};
