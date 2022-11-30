import type { NextPage } from 'next';
import Head from 'next/head';
import { ExamDetails } from 'components/organisms/ExamDetails/ExamDetails';

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
