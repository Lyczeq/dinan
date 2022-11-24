import { UseFormRegister } from 'react-hook-form';
import { NewExam, NewExamQuestion } from 'types/newExam';
import { TrashIcon } from '@heroicons/react/24/outline';
import { memo } from 'react';

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
    <div>
      <TrashIcon
        className="w-6 h-6 b hover:bg-red-500 text-red-200 bg-white border-red-600 border rounded-sm"
        onClick={() => removeQuestion(questionIndex)}
      />
      <input
        type="text"
        placeholder={`Question ${questionIndex + 1}`}
        {...register(`questions.${questionIndex}.text`)}
      />
      <>
        {question.answers.map((_, answerIndex) => {
          return (
            <div key={`${questionId}-${answerIndex}`} className="w-10">
              <TrashIcon
                className="w-6 h-6 b hover:bg-red-500 text-red-200 bg-white border-red-600 border rounded-sm"
                onClick={() => removeAnswer(questionIndex, answerIndex)}
              />
              <input
                className="bg-amber-300"
                type="text"
                placeholder={`Answer ${answerIndex + 1}`}
                {...register(
                  `questions.${questionIndex}.answers.${answerIndex}.text`
                )}
              />
              <input
                type="checkbox"
                {...register(
                  `questions.${questionIndex}.answers.${answerIndex}.isCorrect`
                )}
              />
            </div>
          );
        })}
        <button onClick={() => addAnswer(questionIndex)}>Add answer</button>
      </>
    </div>
  );
};
export const QuestionForm = memo(QuestionFormComponent);
