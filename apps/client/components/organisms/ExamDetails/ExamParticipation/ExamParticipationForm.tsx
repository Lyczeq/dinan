import { useState } from 'react';
import Link from 'next/link';
import { Button } from 'components/atoms/Button';
import { Loader } from 'components/atoms/Loader';
import { ErrorMessage } from 'components/atoms/ErrorMessage';
import { QuestionParticipationForm } from './QuestionParticipationForm';
import type { Question } from '@dinan/types';
import type { ParticipantAnswer } from '@dinan/types/ExamParticipation';
import { useSubmitExam } from './useSubmitExam';

type ExamParticipationFormProps = {
  questions: Question[];
  examAddress: string;
};

const getInitialParticipantAnswers = (
  questions: Question[]
): ParticipantAnswer[] => {
  return questions.map((q) => ({ questionId: q.id, answerIds: [] }));
};

export const ExamParticipationForm = ({
  questions,
  examAddress,
}: ExamParticipationFormProps) => {
  const { mutate, status, examResult } = useSubmitExam(examAddress);
  const [participantAnswers, setParticipantAnswers] = useState<
    ParticipantAnswer[]
  >(getInitialParticipantAnswers(questions));

  const toggleAnswer = (
    questionId: string,
    answerId: string,
    isChecked: boolean
  ) => {
    // you need to check whether user mark the answer for the first time or change their mind and it's need to be removed
    if (isChecked) {
      const newParticipantAnswers = participantAnswers.map((pa) => {
        if (pa.questionId === questionId)
          return { ...pa, answerIds: [...pa.answerIds, answerId] };
        return pa;
      });

      setParticipantAnswers(newParticipantAnswers);
      return;
    }

    const newParticipantAnswers = participantAnswers.map((pa) => {
      if (pa.questionId === questionId)
        return {
          ...pa,
          answerIds: pa.answerIds.filter((answId) => answId !== answerId),
        };
      return pa;
    });
    setParticipantAnswers(newParticipantAnswers);
  };

  const handleSubmitExam = () => {
    if (status === 'idle') mutate(participantAnswers);
  };

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
      <Button
        className="self-center"
        onClick={handleSubmitExam}
        disabled={status !== 'idle'}
      >
        Submit exam
      </Button>
      <Loader isLoading={status === 'loading'} />
      <ErrorMessage isError={status === 'error'} />
      {true && (
        <div className="self-center">
          <p>Congratulations, your score is {examResult?.score}!</p>
          <p>
            <span>Go to </span>
            <Link
              href="my-certificates"
              className="text-primary border border-white hover:border-b-primary transition-colors"
            >
              My Certificates
            </Link>
            , to check your newest NFT!
          </p>
        </div>
      )}
    </div>
  );
};
