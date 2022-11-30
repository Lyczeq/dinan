import { Exam } from '@dinan/types/Exam';
export type BasicExam = Omit<Exam, 'questions'>;
