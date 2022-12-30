import { Provider } from '@ethersproject/providers';
import { Signer, Contract } from 'ethers';
import { Interface } from 'ethers/lib/utils';
import ExamControllerJSON from './ExamController.json';
import { ADDRESS } from './address';

const ABI = new Interface(ExamControllerJSON.abi);

export const methods = {
  addExam: 'addExam',
  manageExamParticipation: 'manageExamParticipation',
};

export const events = {
  newExamParticipation: 'NewExamParticipation',
  newExamCreation: 'NewExamCreation',
};

export function getNewExamControllerContract(
  signerOrProvider?: Signer | Provider
) {
  return new Contract(ADDRESS, ABI, signerOrProvider);
}
