import { Button } from 'components/atoms/Button';
import { ErrorMessage } from 'components/atoms/ErrorMessage';
import { Loader } from 'components/atoms/Loader';
import { ConnectWalletButton } from 'components/molecules/ConnectWalletButton';
import { useRouter } from 'next/router';
import { ExamParticipationForm } from './ExamParticipationForm';
import { useGetExamParticipation } from './useGetExamParticipation';
import { useParticipateInExam } from './useParticipateInExam';
import { UserScore } from './UserScore';

export const ExamParticipation = () => {
  const router = useRouter();
  const { address } = router.query;
  const examParticipation = useGetExamParticipation(address as string);
  const { isUserConnected, participateInExam, questions, status } =
    useParticipateInExam(address as string);

  if (examParticipation?.score)
    return <UserScore score={examParticipation.score} />;

  const isTransactionProceeding = status !== 'None' && status !== 'Exception';

  if (!isUserConnected)
    return (
      <div className="flex justify-center items-center mt-4 flex-col gap-2">
        <p>You need to connect the wallet to participate in the exam</p>
        <ConnectWalletButton />
      </div>
    );

  const handleParticipateInExam = () => {
    if (!isTransactionProceeding) {
      participateInExam(address);
    }
  };

  return (
    <div className="w-full flex justify-center mt-4 flex-col">
      <Button
        className={`self-center`}
        onClick={handleParticipateInExam}
        disabled={isTransactionProceeding}
      >
        Participate in exam
      </Button>
      <ErrorMessage isError={status === 'Exception'} />
      <Loader isLoading={status === 'Mining'} />
      {questions && (
        <ExamParticipationForm
          questions={questions}
          examAddress={address as string}
        />
      )}
    </div>
  );
};
