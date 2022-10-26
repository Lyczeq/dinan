import type { NextPage } from 'next';
import Head from 'next/head';
import Button from '../components/atoms/Button';
import { ExamTile } from '../components/atoms/ExamTile';

const CreatedExams: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dinan | Created Exams</title>
      </Head>
      <main className="bg-white border border-orange-400 border-solid h-3/4 w-full">
        <section className="h-14 flex justify-between items-center m-4 ">
          <input
            type="text"
            placeholder="Type exam name or address"
            className="w-1/3 border-yellow-400 border-2 p-2 rounded-md focus:outline-orange-400 text-gray-600"
          />
          <Button className="bg-yellow-400 border-2 border-yellow-400">
            Add new Exam
          </Button>
        </section>
        <section className="grid-cols-4 grid mx-4 gap-4 auto-rows-min ">
          <ExamTile />
          <ExamTile />
          <ExamTile />
          <ExamTile />
          <ExamTile />
          <ExamTile />
          <ExamTile />
        </section>
      </main>
    </>
  );
};

export default CreatedExams;
