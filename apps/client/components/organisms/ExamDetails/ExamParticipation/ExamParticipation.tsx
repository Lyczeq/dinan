import { Button } from 'components/atoms/Button';
import { ErrorMessage } from 'components/atoms/ErrorMessage';
import { Loader } from 'components/atoms/Loader';
import { ConnectWalletButton } from 'components/molecules/ConnectWalletButton';
import { useRouter } from 'next/router';
import { useParticipateInExam } from './useParticipateInExam';

export const ExamParticipation = () => {
  const router = useRouter();
  const { address } = router.query;
  const { isUserConnected, participateInExam, questions, status } =
    useParticipateInExam(address as string);

  if (!isUserConnected)
    return (
      <div>
        <p>You need to connect the wallet to participate in the exam</p>
        <ConnectWalletButton />
      </div>
    );

  const handleParticipateInExam = () => {
    participateInExam(address);
  };

  return (
    <div>
      <Button onClick={handleParticipateInExam}>Participate in exam</Button>
      <ErrorMessage isError={status === 'error'} />
      <Loader isLoading={status === 'loading'} />
      {status === 'success' && <p>{JSON.stringify(questions)}</p>}
    </div>
  );
};
