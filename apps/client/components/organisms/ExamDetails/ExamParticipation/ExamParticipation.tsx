import { Question } from '@dinan/types';
import { Button } from 'components/atoms/Button';
import { ErrorMessage } from 'components/atoms/ErrorMessage';
import { Loader } from 'components/atoms/Loader';
import { ConnectWalletButton } from 'components/molecules/ConnectWalletButton';
import { useRouter } from 'next/router';
import { ExamParticipationForm } from './ExamParticipationForm';
import { useParticipateInExam } from './useParticipateInExam';

//@ts-ignore
const tQuestions: Question[] = [
  {
    id: '9ad78b8c-1ea3-4dfd-9de1-3fe752a7028e',
    text: "um is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    examAddress: '0x8E4f4cf0dFDb8a9fcB19015ce8689f84E8ABCD4F',
    answers: [
      //@ts-ignore
      {
        id: '60ab7d06-6d19-401a-8cf2-8e49c8feec0d',
        text: "um is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        questionId: '9ad78b8c-1ea3-4dfd-9de1-3fe752a7028e',
      },
      //@ts-ignore

      {
        id: 'b7fc60b3-602e-4c32-8b7b-c09ffddc70a6',
        text: 'a2q1',
        questionId: '9ad78b8c-1ea3-4dfd-9de1-3fe752a7028e',
      },
    ],
  },
  {
    id: 'eeba6b0e-81e3-413d-addf-af89ba76a8d9',
    text: 'q2',
    examAddress: '0x8E4f4cf0dFDb8a9fcB19015ce8689f84E8ABCD4F',
    answers: [
      //@ts-ignore

      {
        id: '44e9cc74-6a44-4259-b635-505915a004b7',
        text: 'a1q2',
        questionId: 'eeba6b0e-81e3-413d-addf-af89ba76a8d9',
      },
      //@ts-ignore

      {
        id: 'ae7249bc-afcf-4a32-a473-81f4fd8c5b83',
        text: 'a2q2',
        questionId: 'eeba6b0e-81e3-413d-addf-af89ba76a8d9',
      },
    ],
  },
  {
    id: '7fcd098f-5f1c-4fcb-9e3b-5a5174be0e18',
    text: 'q3',
    examAddress: '0x8E4f4cf0dFDb8a9fcB19015ce8689f84E8ABCD4F',
    answers: [
      //@ts-ignore

      {
        id: '1680b678-c366-4e5b-81a3-243ac87d539c',
        text: 'a1q3',
        questionId: '7fcd098f-5f1c-4fcb-9e3b-5a5174be0e18',
      },
      //@ts-ignore

      {
        id: '4efcb0a2-9f90-489e-8d4a-9f121ea17ddc',
        text: 'a2q3',
        questionId: '7fcd098f-5f1c-4fcb-9e3b-5a5174be0e18',
      },
    ],
  },
];

export const ExamParticipation = () => {
  const router = useRouter();
  const { address } = router.query;
  const { isUserConnected, participateInExam, questions, status } =
    useParticipateInExam(address as string);

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
        className="self-center"
        onClick={handleParticipateInExam}
        disabled={isTransactionProceeding}
      >
        Participate in exam
      </Button>
      <ErrorMessage isError={status === 'Exception'} />
      <Loader isLoading={status === 'Mining'} />
      {true && (
        <ExamParticipationForm
          questions={tQuestions}
          examAddress={address as string}
        />
      )}
    </div>
  );
};
