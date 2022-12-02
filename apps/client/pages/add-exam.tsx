import { ExamForm } from 'components/organisms/NewExamForm/ExamForm';
import { NextPage } from 'next';
import Head from 'next/head';

const AddExam: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dinan | Add Exam</title>
      </Head>
      <div className="w-full flex flex-col items-center ">
        <header className="flex flex-col items-center gap-2 my-4">
          <h2 className="text-3xl text-transparent bg-clip-text bg-gradient-to-tr from-primary to-secondary font-bold">
            Add a new exam
          </h2>
          <p className="text-primary text-xl font-bold">
            Specify the name, symbol, description and questions with answers
          </p>
        </header>
        <ExamForm />
      </div>
    </>
  );
};

export default AddExam;
