import { Provider } from '@ethersproject/providers';
import { Signer, Contract } from 'ethers';
import { Interface } from 'ethers/lib/utils';
import ExamControllerJSON from './ExamController.json';

const address = '0x49c59F09a925B60a35D11E730C3dC962A09FAa7b';
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
