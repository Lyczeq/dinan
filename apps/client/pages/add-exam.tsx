import { Button } from 'components/atoms/Button';
import { useExamControllerMethod } from 'hooks/useExamControllerMethod';
import { NextPage } from 'next';
import Head from 'next/head';
import { useMutation } from 'react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEthers } from '@usedapp/core';
import { methods } from '@dinan/contracts/examController/index';
import type { Exam, Question, Answer } from '@dinan/types';

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
  const initialQuestion = {
    text: '',
    answers: [
      {
        text: '',
        isCorrect: false,
      },
      {
        text: '',
        isCorrect: false,
      },
      {
        text: '',
        isCorrect: false,
      },
    ],
  };

  const [questions, setQuestions] = useState<Question[]>([initialQuestion]);
  const { send: addExam, events } = useExamControllerMethod(methods.addExam);
  const [exam, setExam] = useState<Exam | null>(null);
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
  } = useForm<Question[]>();

  const onSubmit = (newExam: Exam) => {
    console.log({ exam });
    console.log({ newExam });
    setExam(newExam);
    addExam(newExam.name, newExam.symbol);
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
    setQuestions([...questions, initialQuestion]);
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
              {questions.map((question, qIdx) => (
                <div key={`question${qIdx}`}>
                  <input
                    type="text"
                    placeholder={`Question ${qIdx + 1}`}
                    {...register(`questions[${qIdx}].text`)}
                  />
                  <>
                    {question.answers.map((answer, aIdx) => {
                      return (
                        <div
                          key={`question${qIdx}answer${aIdx}`}
                          className="w-10"
                        >
                          <input
                            className="bg-amber-300"
                            type="text"
                            placeholder={`Answer ${aIdx + 1}`}
                            {...register(
                              `questions[${qIdx}].answers[${aIdx}.text]`
                            )}
                          />
                          <input
                            type="checkbox"
                            {...register(
                              `questions[${qIdx}].answers[${aIdx}.isCorrect]`
                            )}
                          />
                        </div>
                      );
                    })}
                  </>
                </div>
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
                mutation.mutate({
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
