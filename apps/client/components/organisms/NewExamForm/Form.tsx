import {
  Control,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';
import { Button } from 'components/atoms/Button';
import { QuestionForm } from 'components/organisms/NewExamForm/QuestionForm';
import { initialAnswer, initialQuestion } from './helpers';
import { NewExam } from 'types/newExam';
import { Input } from 'components/atoms/Input';

type ExamFormProps = {
  register: UseFormRegister<NewExam>;
  getExamValues: UseFormGetValues<NewExam>;
  control: Control<NewExam, any>;
};

export const Form = ({ register, getExamValues, control }: ExamFormProps) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'questions',
  });

  const addQuestion = () => {
    append(initialQuestion);
  };

  const removeQuestion = (questionIndex: number) => {
    remove(questionIndex);
  };

  const addAnswer = (questionIndex: number) => {
    const currentQuestion = getExamValues('questions')[0];

    update(questionIndex, {
      text: currentQuestion.text,
      answers: [...currentQuestion.answers, initialAnswer],
    });
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const currentQuestion = fields[questionIndex];
    currentQuestion.answers.splice(answerIndex, 1);
    update(questionIndex, currentQuestion);
  };

  return (
    <section className="bg-red-500">
      <form
        className="flex flex-col w-full items-start h-full gap-4 mt-4 ml-4"
        style={{ height: '1000px' }}
      >
        <Input type="text" placeholder="name" {...register('name')} />
        <Input type="text" placeholder="symbol" {...register('symbol')} />
        <Input
          type="text"
          placeholder="description"
          {...register('description')}
        />
        {fields.map((question, questionIndex) => (
          <QuestionForm
            key={`${question.id}`}
            register={register}
            question={question}
            questionId={question.id}
            questionIndex={questionIndex}
            removeQuestion={removeQuestion}
            addAnswer={addAnswer}
            removeAnswer={removeAnswer}
          />
        ))}
        <button type="submit" className="bg-red-300">
          Submit
        </button>
      </form>
      <Button onClick={addQuestion} className="bg-orange-400">
        Add question
      </Button>
    </section>
  );
};
