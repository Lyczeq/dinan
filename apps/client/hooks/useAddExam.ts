import { useContractFunction } from '@usedapp/core';
import { Contract } from 'ethers';
import { Interface } from 'ethers/lib/utils';
import ExamController from '../utils/ExamController.json';

const addExamMetodName = 'addExam';
const examControllerAddress = '0xa86f4c00F1CFe4E3446bD0DE788A81BeBF567F9e';

export const useAddExam = () => {
  const { send, state, events } = useContractFunction(
    new Contract(examControllerAddress, new Interface(ExamController.abi)),
    addExamMetodName
  );

  return { addExam: send, state, events };
};
