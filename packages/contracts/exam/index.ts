import { Interface } from 'ethers/lib/utils';
import { Provider } from '@ethersproject/providers';
import { Signer, Contract } from 'ethers';
import ExamJSON from './Exam.json';

const ABI = new Interface(ExamJSON.abi);

export const methods = {
  saveParticipantScore: 'addExam',
  manageExamParticipation: 'manageExamParticipation',
};

export const getNewExamContract = (
  address: string,
  signerOrProvider?: Signer | Provider
) => new Contract(address, ABI, signerOrProvider);
