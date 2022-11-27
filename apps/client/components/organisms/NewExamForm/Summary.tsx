import {
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormWatch,
} from 'react-hook-form';
import { NewExam } from 'types/newExam';
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

const QuestionWatcher = ({ index, watch }: QuestionWatcherProps) => {
  const questionText = watch(`questions.${index}.text`);
  return (
    <p className="break-all">
      {index}. {questionText}
    </p>
  );
};

export const Summary = ({
  getExamValues,
  handleSubmitExam,
  watch,
}: SummaryProps) => {
  const { addNewExam, blockchainCallStatus, examUpdateStatus } = useAddExam();
  // const watcher = watch('questions.${number}.text');
  // console.log(watch('questions.${number}.text'));
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
    <aside className="h-full flex flex-col bg-orange-200 border-orange-200 border rounded-br-md rounded-tr-md sticky px-4 break-all">
      <Button
        className="self-center px-8 my-4"
        onClick={handleSubmitExam(onSubmitExam)}
      >
        Add Exam
      </Button>
      <div>
        <p>Questions: </p>
        <ul>
          {getExamValues('questions').map((question, index) => (
            <QuestionWatcher key={index} index={index} watch={watch} />
          ))}
        </ul>
        {statusMessage()}
      </div>
    </aside>
  );
};
