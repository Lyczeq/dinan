import { Provider } from '@ethersproject/providers';
import { Signer, Contract } from 'ethers';
import { Interface } from 'ethers/lib/utils';
import ExamControllerJSON from './ExamController.json';

const address = '0x4B8df52E063ae610928E0a7b9094cF434260b17F';
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
  return new Contract(address, ABI, signerOrProvider);
}
