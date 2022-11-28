import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from 'components/atoms/Button';
import { TextInput } from 'components/atoms/TextInput';
import { FormGroup } from 'components/molecules/FormGroup';
import { QuestionForm } from 'components/organisms/NewExamForm/QuestionForm';
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';
import type { NewExam } from 'types/newExam';
import { initialAnswer, initialQuestion } from './helpers';

type FormProps = {
  register: UseFormRegister<NewExam>;
  getExamValues: UseFormGetValues<NewExam>;
  control: Control<NewExam, any>;
  errors: FieldErrors<NewExam>;
};

export const Form = ({
  register,
  getExamValues,
  control,
  errors,
}: FormProps) => {
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
    <section className="rounded-tl-md rounded-bl-md min-h-full pb-4 mb-16 w-full overflow-y-auto">
      <div className="w-4/5 mx-auto">
        <form className="flex flex-col items-start gap-4 mt-4 ">
          <FormGroup label="Name">
            <TextInput
              type="text"
              placeholder="Name"
              className="w-2/3"
              {...register('name')}
            />
            {errors.name?.message ? <p>{errors.name?.message}</p> : null}
          </FormGroup>
          <FormGroup label="Symbol">
            <TextInput
              type="text"
              placeholder="Symbol"
              {...register('symbol')}
              className="w-2/3"
            />
            {errors.symbol?.message ? <p>{errors.symbol?.message}</p> : null}
          </FormGroup>
          <FormGroup label="Description">
            <TextInput
              type="text"
              placeholder="Description"
              className="w-2/3"
              {...register('description')}
            />
            {errors.description?.message ? (
              <p>{errors.description?.message}</p>
            ) : null}
          </FormGroup>
          <div className="w-full self-center">
            {fields.map((question, questionIndex) => (
              <QuestionForm
                key={`${question.id}`}
                register={register}
                question={question}
                questionId={question.id}
                errors={errors?.questions?.[questionIndex]}
                questionIndex={questionIndex}
                removeQuestion={removeQuestion}
                addAnswer={addAnswer}
                removeAnswer={removeAnswer}
              />
            ))}
          </div>
        </form>
        <Button
          onClick={addQuestion}
          className="mt-2 self-start flex gap-1 w-max items-center"
          icon={<PlusIcon className="w-5 h-5" />}
        >
          Add question
        </Button>
      </div>
    </section>
  );
};
