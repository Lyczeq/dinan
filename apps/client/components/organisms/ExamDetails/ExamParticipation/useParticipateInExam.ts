import {
  methods,
  events as examControllerEvents,
} from '@dinan/contracts/examController';
import { TransactionState, TransactionStatus, useEthers } from '@usedapp/core';
import { LogDescription } from 'ethers/lib/utils';
import { useExamControllerMethod } from 'hooks/useExamControllerMethod';
import { useCallback, useEffect } from 'react';
import { useQuery, QueryStatus } from 'react-query';

const getExamQuestions = async (address: string, userAddress: string) => {
  const res = await fetch(
    `http://localhost:8000/api/v1/exams/${address}/participate`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userAddress}`,
      },
    }
  );
  const exam = await res.json();

  return exam.exam.questions;
};

const handleStatus = (
  transactionState: TransactionState,
  callStatus: QueryStatus
): TransactionState => {
  if (transactionState === 'Success' && callStatus === 'success')
    return 'Success';

  return transactionState;
};

// TODO: add an endpoint to check whether user has participated in the exam, if so return a NFT

export const useParticipateInExam = (address: string) => {
  const { account } = useEthers();

  const { send, events, state } = useExamControllerMethod(
    methods.manageExamParticipation
  );

  const {
    data: questions,
    refetch: getQuestions,
    status,
  } = useQuery({
    queryKey: ['questions', address],
    queryFn: () => getExamQuestions(address as string, account as string),
    enabled: false,
  });

  const findUserExamAddress = useCallback(
    (event: LogDescription) => {
      const participantAddress: string = event.args[1];

      const isCorrectEventName =
        event.name === examControllerEvents.newExamParticipation;
      const isCorrectUserAddress =
        participantAddress.toLowerCase() === account?.toLowerCase();

      return isCorrectEventName && isCorrectUserAddress;
    },
    [account]
  );

  useEffect(() => {
    const newExamParticipatiom = events?.find(findUserExamAddress);

    if (!newExamParticipatiom) return;

    getQuestions();
  }, [events, account]);

  return {
    participateInExam: send,
    status: handleStatus(state.status, status),
    questions,
    isUserConnected: account,
  };
};
