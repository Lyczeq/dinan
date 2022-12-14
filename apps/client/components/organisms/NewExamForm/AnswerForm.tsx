import React from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import type { UseFormRegister } from 'react-hook-form';
import { TextAreaInput } from 'components/atoms/TextAreaInput';
import type { NewExam } from '@dinan/types/newExam';
import { Checkbox } from 'components/atoms/Checkbox';

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
          errorMessage={textError}
          {...register(
            `questions.${questionIndex}.answers.${answerIndex}.text`
          )}
        />
        <TrashIcon
          className="w-8 h-7 b hover:bg-error hover:text-white text-error border-none  border rounded-md px-1 transition-colors"
          onClick={() => removeAnswer(questionIndex, answerIndex)}
        />
      </div>
      <Checkbox
        label="Correct"
        {...register(
          `questions.${questionIndex}.answers.${answerIndex}.isCorrect`
        )}
      />
    </React.Fragment>
  );
};
