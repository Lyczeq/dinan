import { useForm } from 'react-hook-form';
import { NewExam } from 'types/newExam';
import { Form } from './Form';
import { initialExam } from './helpers';
import { Summary } from './Summary';

export const ExamForm = () => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm<NewExam>({
    defaultValues: initialExam,
  });

  return (
    <main className="grid-cols-3/4 grid bg-slate-100 w-full rounded-md mb-16">
      <Form register={register} getExamValues={getValues} control={control} />
      <Summary
        handleSubmitExam={handleSubmit}
        getExamValues={getValues}
        watch={watch}
      />
    </main>
  );
};
