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
      <div className="bg-slate-200 w-full flex flex-col items-center ">
        <h2>Add new exam</h2>
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
