import { useEthers } from '@usedapp/core';
import { Button } from 'components/atoms/Button';
import { useExamControllerMethod } from 'hooks/useExamControllerMethod';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

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

  const { data: questions, refetch } = useQuery({
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

      
    </>
  );
};

export default Exams;
