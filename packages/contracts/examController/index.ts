import { Provider } from '@ethersproject/providers';
import { Signer, Contract } from 'ethers';
import { Interface } from 'ethers/lib/utils';
import ExamControllerJSON from './ExamController.json';

const address = '0xE7f3D8E66C85A235d3BFA643f393043b87F21186';
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
