import { ParticipantAnswer } from '@dinan/types/ExamParticipation';
import { useEthers } from '@usedapp/core';
import { useMutation } from 'react-query';

const submitExam = async (
  answers: any,
  examAddress: string,
  userAddress: string
) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/exams/${examAddress}/compare`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userAddress}`,
      },
      body: JSON.stringify({ answers }),
    }
  );
  return await response.json();
};

export const useSubmitExam = (examAddress: string) => {
  const { account } = useEthers();
  const {
    mutate,
    status,
    data: examResult,
  } = useMutation('examResult', (participantAnswers: ParticipantAnswer[]) =>
    submitExam(participantAnswers, examAddress, account as string)
  );

  return { mutate, status, examResult };
};
