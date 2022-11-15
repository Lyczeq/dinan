// import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { Interface } from 'ethers/lib/utils';
import { Contract } from 'ethers';
import ExamJSON from './Exam.json';

const ABI = new Interface(ExamJSON.abi);

export const examMethods = {
  saveParticipantScore: 'addExam',
  manageExamParticipation: 'manageExamParticipation',
};

// signerOrProvider is of type Signer | Provider
// there's webpack error when importing Provider from line 1
export function getNewExamContract(
  address: string,
  signerOrProvider?: Signer | any
) {
  return new Contract(address, ABI, signerOrProvider);
}
