import Head from 'next/head';
import { useQuery } from 'react-query';
import { ExamsView } from 'components/templates/ExamsView';
import type { BasicExam } from 'types/basicExam';

const fetchExams = async (): Promise<BasicExam[]> => {
  const res = await fetch('http://localhost:8000/api/v1/exams');
  const data = await res.json();
  return data.exams;
};

const Exams = () => {
  const { data: exams, status } = useQuery<BasicExam[]>('exams', fetchExams);

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
