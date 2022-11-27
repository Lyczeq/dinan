import { UseFormRegister } from 'react-hook-form';
import { NewExam, NewExamQuestion } from 'types/newExam';
import { TrashIcon } from '@heroicons/react/24/outline';
import { memo } from 'react';
import { TextAreaInput } from 'components/atoms/TextAreaInput';
import { Button } from 'components/atoms/Button';
import { TextInput } from 'components/atoms/TextInput';

type QuestionFormType = {
  register: UseFormRegister<NewExam>;
  questionId: string;
  question: NewExamQuestion;
  questionIndex: number;
  removeQuestion: (questionIndex: number) => void;
  addAnswer: (questionIndex: number) => void;
  removeAnswer: (questionIndex: number, answerIndex: number) => void;
};

const QuestionFormComponent = ({
  question,
  questionId,
  questionIndex,
  register,
  removeQuestion,
  addAnswer,
  removeAnswer,
}: QuestionFormType) => {
  return (
    <div className="w-full border-2 border-inputFocus rounded-md py-4 mb-4">
      <div className="flex justify-center flex-col w-9/10 mx-auto">
        <div className="flex gap-2 flex-row w-full justify-center mb-4">
          <TextAreaInput
            placeholder={`Question ${questionIndex + 1}`}
            className="border-amber-"
            {...register(`questions.${questionIndex}.text`)}
          />
          <TrashIcon
            className="w-8 h-7 b hover:bg-red-600 hover:text-white text-red-600 border-none  border rounded-md px-1 transition-colors"
            onClick={() => removeQuestion(questionIndex)}
          />
        </div>
        <>
          {question.answers.map((_, answerIndex) => {
            return (
              <>
                <div
                  className="flex gap-2 flex-row w-full justify-center"
                  key={`${questionId}-${answerIndex}`}
                >
                  <TextAreaInput
                    placeholder={`Answer ${answerIndex + 1}`}
                    {...register(
                      `questions.${questionIndex}.answers.${answerIndex}.text`
                    )}
                  />
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
              </>
            );
          })}
          <Button className="mt-4 self-start" onClick={() => addAnswer(questionIndex)}>
            Add answer
          </Button>
        </>
      </div>
    </div>
  );
};
export const QuestionForm = memo(QuestionFormComponent);
