import { methods } from '@dinan/contracts/examController';
import { NewExam } from 'types/newExam';
import { useExamControllerMethod } from './useExamControllerMethod';

type BlockchainExam = Omit<NewExam, 'questions'>;

export const useAddBlockchainExam = () => {
  const { send, events } = useExamControllerMethod(methods.addExam);

  const addNewBlockchainExam = (newExam: NewExam) => {
    const blockchainExam: BlockchainExam = {
      name: newExam.name,
      symbol: newExam.symbol,
      description: newExam.description,
    };

    send(
      blockchainExam.name,
      blockchainExam.symbol,
      blockchainExam.description
    );
  };

  return { addNewBlockchainExam, events };
};
