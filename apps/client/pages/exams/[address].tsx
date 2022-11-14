import { useEthers } from '@usedapp/core';
import { Button } from 'components/atoms/Button';
import { useExamControllerMethod } from 'hooks/useExamControllerMethod';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

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
        Authorization: `Bearer ${userAddress}`,
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
    const correctAnswer = questions[0].answers.find((a) => a.text === 'a1');

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

  // return (
  //   <form onSubmit={handleSubmit(onExamSubmit)}>
  //     {questions.map((q) => (
  //       <div key={q.id}>
  //         <p>{q.text}</p>
  //         <div>
  //           {q.answers.map((a) => (
  //             <div key={a.id}>
  //               <p>{a.text}</p>
  //               <input
  //                 type="checkbox"
  //                 {...register(`answers[].questionId[${q.id}].answers`)}
  //               />
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     ))}
  //     <button type="submit">Submit</button>
  //   </form>
  // );
};

const fetchExam = async (address: string) => {
  const res = await fetch(`http://localhost:8000/api/v1/exams/${address}`);
  return res.json();
};

const getExamQuestions = async (address: string) => {
  const res = await fetch(
    `http://localhost:8000/api/v1/exams/${address}/participate`
  );
  return res.json();
};

const Exams: NextPage = () => {
  const router = useRouter();
  const { account } = useEthers();
  const { address } = router.query;
  const { data, status } = useQuery(['exam', address], () =>
    fetchExam(address as string)
  );

  const {
    data: questions,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['questions', address],
    queryFn: () => getExamQuestions(address as string),
    enabled: false,
  });

  const {
    send: participateInExam,
    events,
    state,
  } = useExamControllerMethod('manageExamParticipation');

  const handleParticipateInExam = () => {
    participateInExam(data?.exam.address);
  };

  useEffect(() => {
    const newExamParticipatiom = events?.find(
      (e) => e.name === 'NewExamParticipation'
    );
    console.log(events);

    if (!newExamParticipatiom) return;

    const participantAddress = newExamParticipatiom.args[1];
    console.log({ participantAddress });
    console.log({ account });
    if (participantAddress.toLowerCase() !== account?.toLowerCase()) return;
    console.log('XDD');
    refetch();
    console.log(questions);
  }, [events, account]);

  return (
    <>
      <Head>
        <title>Dinan | Exams</title>
      </Head>
      {status === 'error' && <p>Something went wrong</p>}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'success' && (
        <section>
          <p>Exam address: {data.exam.address}</p>
          <p>Exam name: {data.exam.name}</p>
          <p>Exam symbol: {data.exam.symbol}</p>
          <p>Exam description: {data.exam.description}</p>
        </section>
      )}
      {!account ? (
        <p>You need to connect wallet to participate in exam</p>
      ) : (
        <Button className="bg-orange-300" onClick={handleParticipateInExam}>
          Participate in exam
        </Button>
      )}
      {isSuccess && (
        <ExamForm
          examAddress={address as string}
          questions={questions.exam.questions}
        />
      )}
    </>
  );
};

export default Exams;
