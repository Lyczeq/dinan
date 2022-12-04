import { useCallback, useEffect, useState } from 'react';
import { NewExam } from '@dinan/types/NewExam';
import { initialExam } from './helpers';
import {
  methods,
  events as examControllerEvents,
} from '@dinan/contracts/examController';
import { useExamControllerMethod } from 'hooks/useExamControllerMethod';
import { useEthers } from '@usedapp/core';
import { useMutation } from 'react-query';
import { LogDescription } from 'ethers/lib/utils';

type BlockchainExam = Omit<NewExam, 'questions'>;

type UpdateExamData = {
  userAddress: string;
  examAddress: string;
  exam: NewExam;
};

const updateExamWithQustions = (dataToUpdateExam: UpdateExamData) => {
  const { userAddress, examAddress, exam } = dataToUpdateExam;
  const response = fetch(`http://localhost:8000/api/v1/exams/${examAddress}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userAddress}`,
    },
    body: JSON.stringify({ exam }),
  });
  return response;
};

export const useAddExam = () => {
  const [exam, setExam] = useState<NewExam>(initialExam);
  const { send, state, events } = useExamControllerMethod(methods.addExam);
  const { account } = useEthers();
  const { mutate, status } = useMutation((dataToUpdateExam: UpdateExamData) =>
    updateExamWithQustions(dataToUpdateExam)
  );

  const addNewBlockchainExam = (newExam: NewExam) => {
    setExam(newExam);

    const blockchainExam: BlockchainExam = {
      name: newExam.name,
      symbol: newExam.symbol,
      description: newExam.description,
    };

    send(
      blockchainExam.name,
      blockchainExam.symbol,
      blockchainExam.description
    );
  };

  const findUserExamAddress = useCallback(
    (event: LogDescription) => {
      const contractCreatorAddress: string = event.args[1];

      const isCorrectEventName =
        event.name === examControllerEvents.newExamCreation;
      const isCorrectUserAddress =
        contractCreatorAddress.toLowerCase() === account?.toLowerCase();

      return isCorrectEventName && isCorrectUserAddress;
    },
    [account]
  );

  useEffect(() => {
    const newExamCreation = events?.find(findUserExamAddress);
    if (!newExamCreation) return;

    const examAddress = newExamCreation.args[0];

    mutate({
      userAddress: account as string,
      examAddress,
      exam,
    });
  }, [events, account, exam, mutate, findUserExamAddress]);

  return {
    addNewExam: addNewBlockchainExam,
    examUpdateStatus: status,
    blockchainCallStatus: state.status,
    isUserConnected: account,
  };
};
