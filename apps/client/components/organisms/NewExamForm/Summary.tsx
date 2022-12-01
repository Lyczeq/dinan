import {
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormWatch,
} from 'react-hook-form';
import { NewExam } from '@dinan/types/NewExam/index';
import { useAddExam } from './useAddExam';
import { Button } from 'components/atoms/Button';

type SummaryProps = {
  handleSubmitExam: UseFormHandleSubmit<NewExam>;
  getExamValues: UseFormGetValues<NewExam>;
  watch: UseFormWatch<NewExam>;
};

type QuestionWatcherProps = {
  index: number;
  watch: UseFormWatch<NewExam>;
};

const QuestionTextWatcher = ({ index, watch }: QuestionWatcherProps) => {
  const questionText = watch(`questions.${index}.text`);
  return (
    <p className="mb-2">
      <span className="font-bold">{index + 1}.</span> {questionText}
    </p>
  );
};

export const Summary = ({
  getExamValues,
  handleSubmitExam,
  watch,
}: SummaryProps) => {
  const { addNewExam, blockchainCallStatus, examUpdateStatus } = useAddExam();

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
    if (!statusMessage()) {
      addNewExam(newExam);
    }
  };

  return (
    <aside className="h-full flex flex-col bg-orange-200 border-orange-200 border rounded-br-md rounded-tr-md sticky px-4 break-all">
      <Button
        className="self-center px-8 my-4"
        onClick={handleSubmitExam(onSubmitExam)}
        disabled={!!statusMessage()}
      >
        Add Exam
      </Button>
      <div>
        <p className="text-lg">Questions: </p>
        <ul>
          {getExamValues('questions').map((question, index) => (
            <QuestionTextWatcher key={index} index={index} watch={watch} />
          ))}
        </ul>
        <p>{statusMessage()}</p>
      </div>
    </aside>
  );
};
