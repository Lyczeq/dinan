import { getNewExamControllerContract } from '@dinan/contracts/examController/index';
import { useContractFunction } from '@usedapp/core';

export const useExamControllerMethod = (methodName: string) => {
  const examControllerContract = getNewExamControllerContract();
  const { send, state, events } = useContractFunction(
    examControllerContract,
    methodName,
    {
      gasLimitBufferPercentage: 25,
    }
  );
  return { send, state, events };
};
