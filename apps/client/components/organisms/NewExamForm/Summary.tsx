import { Button } from 'components/atoms/Button';
import {
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormWatch,
} from 'react-hook-form';
import { NewExam } from 'types/newExam';
import { useAddExam } from './useAddExam';

type SummaryProps = {
  handleSubmitExam: UseFormHandleSubmit<NewExam>;
  getExamValues: UseFormGetValues<NewExam>;
  watch: UseFormWatch<NewExam>;
};

export const Summary = ({
  getExamValues,
  handleSubmitExam,
  watch,
}: SummaryProps) => {
  const { addNewExam, blockchainCallStatus, examUpdateStatus } = useAddExam();
  const questions = getExamValues('questions');

  const statusMessage = () => {
    if (blockchainCallStatus.status === 'None') return;
    if (blockchainCallStatus.status !== 'Success')
      return blockchainCallStatus.status;

    if (
      blockchainCallStatus.status === 'Success' &&
      examUpdateStatus !== 'success'
    )
      return examUpdateStatus;

    if (examUpdateStatus === 'success') return 'Success!';
  };

  const onSubmitExam = (newExam: NewExam) => {
    console.log({ newExam });
    addNewExam(newExam);
  };

  return (
    <aside className="h-full flex flex-col bg-orange-200 border-orange-200 border rounded-br-md rounded-tr-md">
      <Button
        className="self-center px-8 my-4"
        onClick={handleSubmitExam(onSubmitExam)}
      >
        Add Exam
      </Button>
      <p>Questions: </p>
      <div>{getExamValues('questions').map((question) => question.text)}</div>
      {statusMessage()}
    </aside>
  );
};
