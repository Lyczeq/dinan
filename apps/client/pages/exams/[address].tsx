import { useEthers } from '@usedapp/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { ExamDetails } from 'components/organisms/ExamDetails/ExamDetails';

type Answer = {
  text: string;
  id: string;
};

type Question = {
  id: string;
  text: string;
  answers: Answer[];
};

type ExamFormProps = {
  questions: Question[];
  examAddress: string;
};

const submitExam = async (
  answers: any,
  examAddress: string,
  userAddress: string
) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/exams/${examAddress}/compare`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userAddress}`,
      },
      body: JSON.stringify({ answers }),
    }
  );
  return await response.json();
};

const ExamForm = ({ examAddress, questions }: ExamFormProps) => {
  console.log(questions);
  const { register, handleSubmit } = useForm();
  const { account } = useEthers();
  const { mutate, status, data, error, isSuccess } = useMutation(
    'examResult',
    ({
      examAddress,
      answers,
      userAddress,
    }: {
      answers: any;
      examAddress: string;
      userAddress: string;
    }) => submitExam(answers, examAddress, userAddress)
  );
  const onExamSubmit = () => {
    const firstQuestionId = questions[0].id;
    const correctAnswer = questions[0].answers.find((a) => a.text === 'a11');

    const examAnswers = [
      {
        questionId: firstQuestionId,
        answerIds: [correctAnswer?.id],
      },
    ];

    mutate({
      answers: examAnswers,
      examAddress,
      userAddress: account as string,
    });

    if (isSuccess) {
      console.log('hello', data);
    }
  };

  return (
    <div>
      <p>{JSON.stringify(questions)}</p>
      <button onClick={onExamSubmit}>Submit exam</button>
      {isSuccess && <p className="w-60">Result: {JSON.stringify(data)}</p>}

      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>{JSON.stringify(error)}</p>}
    </div>
  );
};

const Exams: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dinan | Exams</title>
      </Head>
      <ExamDetails />
    </>
  );
};

export default Exams;
