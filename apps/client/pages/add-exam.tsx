import { Button } from 'components/atoms/Button';
import { NextPage } from 'next';
import Head from 'next/head';
import { useMutation } from 'react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEthers } from '@usedapp/core';
import type { Answer, Exam, Question } from '@dinan/types';
import { NewExam, NewExamAnswer, NewExamQuestion } from 'types/newExam';
import { useAddBlockchainExam } from 'hooks/useAddBlockchainExam';
import {
  initialExam,
  initialQuestion,
} from 'components/organisms/NewExamForm/helpers';
import { AddQuestion } from 'components/molecules/Question';

const updateExamWithQustions = (
  userAddress: string,
  examAddress: string,
  exam: Exam
) => {
  const response = fetch(`http://localhost:8000/api/v1/exams/${examAddress}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userAddress}`,
    },
    body: JSON.stringify({ exam }),
  });
  return response;
};

const AddExam: NextPage = () => {
  const { addNewBlockchainExam, events } = useAddBlockchainExam();
  const [exam, setExam] = useState<NewExam>(initialExam);
  const { account } = useEthers();
  const {
    mutate,
    isSuccess,
    data: createdExam,
  } = useMutation(
    ({
      userAddress,
      examAddress,
      exam,
    }: {
      userAddress: string;
      examAddress: string;
      exam: Exam;
    }) => updateExamWithQustions(userAddress, examAddress, exam)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewExam>();

  const onSubmit = (newExam: NewExam) => {
    console.log({ newExam });
    addNewBlockchainExam(newExam);
  };

  useEffect(() => {
    const newExamCreation = events?.find((e) => e.name === 'NewExamCreation');
    if (!newExamCreation) return;

    const userAddress = newExamCreation.args[1];
    if (userAddress.toLowerCase() !== account?.toLowerCase()) return;

    const examAddress = newExamCreation.args[0];
    mutate({
      userAddress: account as string,
      examAddress,
      exam: exam as Exam,
    });

    if (isSuccess) {
      console.log(createdExam);
    }
  }, [events, account, exam]);

  const addQuestion = () => {
    setExam((prevExam) => ({
      ...prevExam,
      questions: [...prevExam.questions, initialQuestion],
    }));
  };

  return (
    <>
      <Head>
        <title>Dinan | Add Exam</title>
      </Head>
      <div className="bg-slate-200 w-full flex flex-col items-center ">
        <h2>Add new exam</h2>
        <main className="grid-cols-3/4 grid bg-slate-600 h-96 w-full">
          <section className="bg-red-500">
            <form
              className="flex flex-col w-1/2 items-center h-full justify-around"
              style={{ height: '1000px' }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <input type="text" placeholder="name" {...register('name')} />
              <input type="text" placeholder="symbol" {...register('symbol')} />
              <input
                type="text"
                placeholder="description"
                {...register('description')}
              />
              {exam.questions.map((question, questionIndex) => (
                <AddQuestion
                  register={register}
                  key={`question-${questionIndex}`}
                  question={question}
                  questionIndex={questionIndex}
                />
              ))}
              <button type="submit" className="bg-red-300">
                Submit
              </button>
            </form>
            <Button onClick={addQuestion} className="bg-orange-400">
              Add question
            </Button>
            <button
              onClick={() => {
                mutate({
                  userAddress: account as string,
                  examAddress: 'xd',
                  exam: exam as Exam,
                });
              }}
            >
              PUT
            </button>
          </section>
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
