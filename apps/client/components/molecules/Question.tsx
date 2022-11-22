import { Answer, Question } from '@dinan/types';
import { UseFormRegister } from 'react-hook-form';
import { NewExam } from 'types/newExam';
type NewExamAnswer = Omit<Answer, 'id' | 'questionId'>;

type NewExamQuestion = Omit<Question, 'id' | 'examAddress' | 'answers'> & {
  answers: NewExamAnswer[];
};

type AddQuestionType = {
  register: UseFormRegister<NewExam>;
  questionIndex: number;
  question: NewExamQuestion;
};

export const AddQuestion = ({
  question,
  questionIndex,
  register,
}: AddQuestionType) => {
  return (
    <div>
      <input
        type="text"
        placeholder={`Question ${questionIndex + 1}`}
        {...register(`questions.${questionIndex}.text`)}
      />
      <>
        {question.answers.map((answer, answerIndex) => {
          return (
            <div
              key={`question${questionIndex}answer${answerIndex}`}
              className="w-10"
            >
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
      </>
    </div>
  );
};
