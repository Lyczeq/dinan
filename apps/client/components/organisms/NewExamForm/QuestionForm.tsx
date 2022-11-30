import React from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import { TextAreaInput } from 'components/atoms/TextAreaInput';
import { Button } from 'components/atoms/Button';
import { AnswerForm } from './AnswerForm';
import type { NewExam, NewQuestion } from '@dinan/types/newExam';

type QuestionFormProps = {
  register: UseFormRegister<NewExam>;
  questionId: string;
  question: NewQuestion;
  questionIndex: number;
  removeQuestion: (questionIndex: number) => void;
  addAnswer: (questionIndex: number) => void;
  removeAnswer: (questionIndex: number, answerIndex: number) => void;
  errors?: FieldErrors<NewQuestion>;
};

export const QuestionForm = React.memo(
  ({
    question,
    questionId,
    questionIndex,
    register,
    removeQuestion,
    addAnswer,
    removeAnswer,
    errors,
  }: QuestionFormProps) => {
    const questionErrror = errors?.text?.message;

    return (
      <div className="w-full border-2 border-inputFocus rounded-md py-4 mb-4">
        <div className="flex justify-center flex-col w-9/10 mx-auto">
          <div className="flex gap-2 flex-row w-full justify-center mb-4">
            <TextAreaInput
              placeholder={`Question ${questionIndex + 1}`}
              className="border-amber-"
              {...register(`questions.${questionIndex}.text`)}
            />
            {questionErrror && <p>{questionErrror}</p>}
            <TrashIcon
              className="w-8 h-7 b hover:bg-red-600 hover:text-white text-red-600 border-none  border rounded-md px-1 transition-colors"
              onClick={() => removeQuestion(questionIndex)}
            />
          </div>
          <>
            {question.answers.map((_, answerIndex) => (
              <AnswerForm
                key={`${questionId}-${answerIndex}`}
                questionId={questionId}
                questionIndex={questionIndex}
                answerIndex={answerIndex}
                removeAnswer={removeAnswer}
                register={register}
                textError={errors?.answers?.[answerIndex]?.text?.message}
              />
            ))}
            <div className="flex gap-4 items-center">
              <Button
                className="flex gap-1 w-max items-center"
                onClick={() => addAnswer(questionIndex)}
                icon={<PlusIcon className="w-5 h-5" />}
              >
                Add answer
              </Button>
              {errors?.answers?.message && <p>{errors?.answers?.message}</p>}
            </div>
          </>
        </div>
      </div>
    );
  }
);
QuestionForm.displayName = 'QuestionForm';
