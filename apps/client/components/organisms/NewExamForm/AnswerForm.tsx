import React from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import type { UseFormRegister } from 'react-hook-form';
import { TextAreaInput } from 'components/atoms/TextAreaInput';
import type { NewExam } from 'types/newExam';

type AnswerFormProps = {
  questionId: string;
  questionIndex: number;
  answerIndex: number;
  removeAnswer: (questionIndex: number, answerIndex: number) => void;
  register: UseFormRegister<NewExam>;
  textError?: string;
};

export const AnswerForm = ({
  questionId,
  questionIndex,
  answerIndex,
  removeAnswer,
  register,
  textError,
}: AnswerFormProps) => {
  return (
    <React.Fragment key={`${questionId}-${answerIndex}`}>
      <div className="flex gap-2 flex-row w-full justify-center">
        <TextAreaInput
          placeholder={`Answer ${answerIndex + 1}`}
          {...register(
            `questions.${questionIndex}.answers.${answerIndex}.text`
          )}
        />
        {textError && <p>{textError}</p>}
        <TrashIcon
          className="w-8 h-7 b hover:bg-red-600 hover:text-white text-red-600 border-none  border rounded-md px-1 transition-colors"
          onClick={() => removeAnswer(questionIndex, answerIndex)}
        />
      </div>
      <div className="flex gap-2 mb-4 mt-1 w-full">
        <label className="text-lightGrey">Correct</label>
        <input
          type="checkbox"
          className="accent-primary text-white "
          {...register(
            `questions.${questionIndex}.answers.${answerIndex}.isCorrect`
          )}
        />
      </div>
    </React.Fragment>
  );
};