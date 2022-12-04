import {
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormWatch,
} from 'react-hook-form';
import { NewExam } from '@dinan/types/NewExam/index';
import { useAddExam } from './useAddExam';
import { Button } from 'components/atoms/Button';
import { ErrorText } from 'components/atoms/ErrorText';

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
  const {
    addNewExam,
    blockchainCallStatus,
    examUpdateStatus,
    isUserConnected,
  } = useAddExam();

  const isAddingDisabled = (): boolean => {
    if (!isUserConnected) return true;

    if (blockchainCallStatus === 'None' || blockchainCallStatus === 'Exception')
      return false;

    return true;
  };

  const statusMessage = () => {
    if (blockchainCallStatus === 'None') return;

    if (
      blockchainCallStatus === 'Exception' ||
      blockchainCallStatus === 'Fail' ||
      examUpdateStatus === 'error'
    )
      return 'Oops, something went wrong!';

    if (
      blockchainCallStatus === 'PendingSignature' ||
      blockchainCallStatus === 'Mining' ||
      examUpdateStatus === 'loading'
    )
      return 'Loading...';

    if (blockchainCallStatus === 'Success' && examUpdateStatus === 'success')
      return 'Success!';
  };

  const onSubmitExam = (newExam: NewExam) => {
    if (!isAddingDisabled()) addNewExam(newExam);
  };

  return (
    <aside className="h-full flex flex-col bg-orange-200 border-orange-200 border rounded-br-md rounded-tr-md sticky px-4 break-all">
      <Button
        className="self-center px-8 my-4"
        onClick={handleSubmitExam(onSubmitExam)}
        disabled={isAddingDisabled()}
      >
        Add Exam
      </Button>
      {statusMessage() && <p className="font-bold my-2">{statusMessage()}</p>}
      <ErrorText
        errorMessage={
          !isUserConnected
            ? 'You must connect your wallet to add a new exam'
            : undefined
        }
      />
      <div>
        <p className="text-lg">Questions: </p>
        <ul>
          {getExamValues('questions').map((question, index) => (
            <QuestionTextWatcher key={index} index={index} watch={watch} />
          ))}
        </ul>
      </div>
    </aside>
  );
};
