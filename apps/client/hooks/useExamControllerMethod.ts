import { useContractFunction } from '@usedapp/core';
import { Contract } from 'ethers';
import { Interface } from 'ethers/lib/utils';
import ExamController from './ExamController.json';

const examControllerAddress = '0xe87C44226B84C662619F848F0b325E4850A8770f';

export const useExamControllerMethod = (methodName: string) => {
  const { send, state, events } = useContractFunction(
    new Contract(examControllerAddress, new Interface(ExamController.abi)),
    methodName
  );

  return { send, state, events };
};
