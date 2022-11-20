import Head from 'next/head';
import { useQuery } from 'react-query';
import { ExamsView } from 'components/templates/ExamsView';
import type { Exam } from '@dinan/types/Exam';

const fetchExams = async (): Promise<Exam[]> => {
  const res = await fetch('http://localhost:8000/api/v1/exams');
  const data = await res.json();
  return data.exams;
};

const Exams = () => {
  const { data: exams, status } = useQuery<Exam[]>('exams', fetchExams);

  return (
    <>
      <Head>
        <title>Dinan | Exams</title>
      </Head>
      <ExamsView status={status} exams={exams} />
    </>
  );
};

export default Exams;
