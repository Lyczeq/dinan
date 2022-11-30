import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { BasicExam } from 'types/basicExam';

const fetchExam = async (address: string): Promise<BasicExam> => {
  const response = await fetch(`http://localhost:8000/api/v1/exams/${address}`);
  const exam = await response.json();
  return exam.exam;
};

export const useExamDetails = () => {
  const router = useRouter();
  const { address } = router.query;
  const { data: exam, status } = useQuery<BasicExam>(['exam', address], () =>
    fetchExam(address as string)
  );

  return { exam, status };
};
