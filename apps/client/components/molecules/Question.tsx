import { Answer, Question } from '@dinan/types';
import { UseFormRegister } from 'react-hook-form';
type NewExamAnswer = Omit<Answer, 'id' | 'questionId'>;

type NewExamQuestion = Omit<Question, 'id' | 'examAddress' | 'answers'> & {
  answers: NewExamAnswer[];
};

type AddQuestionType = {
  register: UseFormRegister<NewExamQuestion[]>;
  questionId: number;
  question: NewExamQuestion;
};

export const AddQuestion = ({
  question,
  questionId,
  register,
}: AddQuestionType) => {
  return (
    <div key={`question${questionId}`}>
      <input
        type="text"
        placeholder={`Question ${questionId + 1}`}
        {...register(`questions[${questionId}].text`)}
      />
      <>
        {question.answers.map((answer, answerId) => {
          return (
            <div key={`question${question}answer${answerId}`} className="w-10">
              <input
                className="bg-amber-300"
                type="text"
                placeholder={`Answer ${answerId + 1}`}
                {...register(
                  `questions[${questionId}].answers[${answerId}.text]`
                )}
              />
              <input
                type="checkbox"
                {...register(
                  `questions[${questionId}].answers[${answerId}.isCorrect]`
                )}
              />
            </div>
          );
        })}
      </>
    </div>
  );
};
