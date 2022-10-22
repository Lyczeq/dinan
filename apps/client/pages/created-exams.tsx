import type { NextPage } from 'next';
import Head from 'next/head';
import Button from '../components/atoms/Button';

const ExamTile = () => {
  return (
    <div className="h-72 border-2 px-2 pb-2 border-yellow-400 rounded-md flex flex-col items-center gap-4 justify-between">
      <div className="flex items-center flex-col overflow-hidden ">
        <p className="text-orange-400 text-lg text-center">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
        <p className="text-justify text-gray-700">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="flex items-center flex-col justify-self-end text-gray-700">
        <p className="">Created 20.11.2022</p>
        <Button className="bg-red-400 p-0 px-2 py-1">
          <p>Copy address</p>
        </Button>
      </div>
    </div>
  );
};

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
          <button>Add new Exam</button>
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
