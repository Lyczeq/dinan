import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { Interface } from 'ethers/lib/utils';
import { Contract } from 'ethers';
import ExamJSON from './Exam.json';

const ABI = new Interface(ExamJSON.abi);

export const methods = {
  saveParticipantScore: 'addExam',
  manageExamParticipation: 'manageExamParticipation',
};

export function getNewExamContract(
  address: string,
  signerOrProvider?: Signer | Provider
) {
  return new Contract(address, ABI, signerOrProvider);
}
