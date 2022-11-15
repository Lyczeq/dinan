// import { Provider } from '@ethersproject/providers';
import { Signer, Contract } from 'ethers';
import { Interface } from 'ethers/lib/utils';
import ExamControllerJSON from './ExamController.json';

const address = '0xa86f4c00F1CFe4E3446bD0DE788A81BeBF567F9e';
const ABI = new Interface(ExamControllerJSON.abi);

export const methods = {
  addExam: 'addExam',
  manageExamParticipation: 'manageExamParticipation',
};

export const events = {
  newExamParticipation: 'NewExamParticipation',
  newExamCreation: 'NewExamCreation',
};

// signerOrProvider is of type Signer | Provider
// there's webpack error when importing Provider from line 1
export function getNewExamControllerContract(signerOrProvider?: Signer | any) {
  return new Contract(address, ABI, signerOrProvider);
}
