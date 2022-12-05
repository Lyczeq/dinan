import { useQuery } from 'react-query';
import { useEthers } from '@usedapp/core';

type ExamParticipation = {
  id: string;
  examAddress: string;
  hasParticipantStarted: boolean;
  isFinished: boolean;
  participantAddress: string;
  score: number;
};

const getExamParticipation = async (
  userAddress: string,
  examAddress: string
): Promise<ExamParticipation> => {
  const res = await fetch(
    `http://localhost:8000/api/v1/users/${userAddress}/exams/${examAddress}`
  );
  const data = await res.json();
  return data.examParticipation;
};

export const useGetExamParticipation = (
  examAddress: string
): ExamParticipation | undefined => {
  const { account } = useEthers();

  const { data: examParticipation } = useQuery(
    ['EXAM_SCORE', account, examAddress],
    () => getExamParticipation(account as string, examAddress),
    {
      enabled: !!account,
    }
  );

  return examParticipation;
};
