import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from 'components/atoms/Button';
import { QuestionForm } from 'components/molecules/Question';
import { useAddExam } from './useAddExam';
import { initialAnswer, initialExam, initialQuestion } from './helpers';
import { NewExam } from 'types/newExam';

export const NewExamForm = () => {
  const { addNewExam, examUpdateStatus, blockchainCallStatus } = useAddExam();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewExam>({
    defaultValues: initialExam,
  });

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
    const currentQuestion = fields[questionIndex];
    update(questionIndex, {
      ...currentQuestion,
      answers: [...currentQuestion.answers, initialAnswer],
    });
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const currentQuestion = fields[questionIndex];
    currentQuestion.answers.splice(answerIndex, 1);
    update(questionIndex, currentQuestion);
  };

  const onSubmit = (newExam: NewExam) => {
    addNewExam(newExam);
  };

  const statusMessage = () => {
    if (blockchainCallStatus.status === 'None') return;
    if (blockchainCallStatus.status !== 'Success')
      return blockchainCallStatus.status;

    if (
      blockchainCallStatus.status === 'Success' &&
      examUpdateStatus !== 'success'
    )
      return examUpdateStatus;

    if (examUpdateStatus === 'success') return 'Success!';
  };

  return (
    <section className="bg-red-500">
      <form
        className="flex flex-col w-full items-center h-full justify-around"
        style={{ height: '1000px' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="text" placeholder="name" {...register('name')} />
        <input type="text" placeholder="symbol" {...register('symbol')} />
        <input
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
      {statusMessage()}
    </section>
  );
};
