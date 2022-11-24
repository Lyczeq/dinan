import { Button } from 'components/atoms/Button';
import { NextPage } from 'next';
import Head from 'next/head';
import { NewExamForm } from 'components/organisms/NewExamForm/NewExamForm';

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
            Specify the name, symbol and questions with answers
          </p>
        </header>
        <main className="grid-cols-3/4 grid bg-slate-600 h-96 w-full">
          <NewExamForm />
          <aside className="bg-slate-400 h-full flex flex-col">
            <p>Questions: </p>
            <Button className="bg-orange-400">Add Exam</Button>
          </aside>
        </main>
      </div>
    </>
  );
};

export default AddExam;
