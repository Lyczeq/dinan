import { Provider } from '@ethersproject/providers';
import { Signer, Contract } from 'ethers';
import { Interface } from 'ethers/lib/utils';
import ExamControllerJSON from './ExamController.json';

const address = '0x4C248B60faC0683D70d8f592F279B472d28086ad';
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
