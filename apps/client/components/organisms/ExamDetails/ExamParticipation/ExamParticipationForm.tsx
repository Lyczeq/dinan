import type { Answer, Question } from '@dinan/types';
import { Button } from 'components/atoms/Button';
import { Checkbox } from 'components/atoms/Checkbox';
import React, { useCallback, useState } from 'react';
import { ParticipantAnswer } from '@dinan/types/ExamParticipation';
type toggleAnswerFn = (
  questionId: string,
  answerId: string,
  isChecked: boolean
) => void;

type ExamParticipationFormProps = {
  questions: Question[];
  examAddress: string;
};

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
    <li className="flex gap-2 mb-2">
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

const QuestionParticipationForm = ({
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

export const ExamParticipationForm = ({
  questions,
  examAddress,
}: ExamParticipationFormProps) => {
  const [participantAnswers, setParticipantAnswers] =
    useState<ParticipantAnswer[]>([]);

  const toggleAnswer = useCallback(
    (questionId: string, answerId: string, isChecked: boolean) => {
      // setParticipantAnswers((prevState) => {
      //   const currentQuestion = questionsAnswers.find(
      //     (pa) => pa.questionId === questionId
      //   );
      //   currentQuestion;
      // });
    },
    []
  );

  return (
    <div className="w-full flex flex-col justify-center gap-4">
      <ul className="rounded-md border-secondary bg-slate-100 mt-4 flex flex-col justify-center items-center py-2">
        {questions.map((question, index) => (
          <QuestionParticipationForm
            key={question.id}
            question={question}
            questionIndex={index}
            toggleAnswer={toggleAnswer}
          />
        ))}
      </ul>
      <Button className="self-center">Submit exam</Button>
    </div>
  );
};
