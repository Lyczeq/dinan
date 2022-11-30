import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from './Form';
import type { NewExam } from '@dinan/types/NewExam';
import { examSchema } from '@dinan/types/NewExam/schemas';
import { Summary } from './Summary';
import { initialExam } from './helpers';

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
    resolver: zodResolver(examSchema),
    mode: 'onChange',
  });

  return (
    <main className="grid-cols-3/4 grid bg-slate-100 w-full rounded-md mb-16 h-screen ">
      <Form
        register={register}
        getExamValues={getValues}
        control={control}
        errors={errors}
      />
      <Summary
        handleSubmitExam={handleSubmit}
        getExamValues={getValues}
        watch={watch}
      />
    </main>
  );
};
