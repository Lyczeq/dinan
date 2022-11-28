import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from './Form';
import { NewExam } from 'types/newExam';
import { Summary } from './Summary';
import { initialExam } from './helpers';

const answerSchema = z.object({
  isCorrect: z.boolean().optional(),
  text: z.string().trim().min(1).max(50),
});

const questionSchema = z.object({
  text: z.string().trim().min(5).max(150),
  answers: z
    .array(answerSchema)
    .min(2, { message: 'You have to specify at least two answers' })
    .max(5),
});

const examSchema = z.object({
  name: z.string().trim().min(5).max(15),
  symbol: z.string().trim().min(3).max(5),
  description: z.string().trim().min(10).max(30),
  questions: z
    .array(questionSchema)
    .min(2, { message: 'You have to specify at least two questions' })
    .max(30),
});

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
