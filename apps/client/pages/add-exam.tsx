import { Button } from 'components/atoms/Button';
import { useAddExam } from 'hooks/useAddExam';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type Answer = {
  text: string;
  isCorrect: boolean;
};

type Question = {
  text: string;
  answers: Answer[];
};

const postExam = async (userAddress: string) => {
  const response = await fetch('localhost:8000/api/v1/exams', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userAddress}`,
    },
  });
  return await response.json();
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

  const { addExam, events, state } = useAddExam();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Question[]>();

  const onSubmit = (values: any) => {
    console.log(values);
    addExam(values.name, values.symbol);
  };

  useEffect(() => {
    console.log(state.status);
    const newExamCreation = events?.find((e) => e.name === 'NewExamCreation');
    if (newExamCreation) console.log(newExamCreation, 'ok');
  }, [events, state.status]);

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
              {questions.map((question, qIdx) => (
                <div key={`question${qIdx}`}>
                  <input
                    type="text"
                    placeholder={`Question ${qIdx + 1}`}
                    {...register(`question[${qIdx}].text`)}
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
                              `question[${qIdx}].answers[${aIdx}.text]`
                            )}
                          />
                          <input
                            type="checkbox"
                            {...register(
                              `question[${qIdx}].answers[${aIdx}.isCorrect]`
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
