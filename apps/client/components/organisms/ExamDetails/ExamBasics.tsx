import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { ErrorMessage } from 'components/atoms/ErrorMessage';
import { Loader } from 'components/atoms/Loader';
import type { BasicExam } from 'types/basicExam';
import { CopyIcon } from '@radix-ui/react-icons';
import copy from 'copy-to-clipboard';

const fetchExam = async (address: string): Promise<BasicExam> => {
  const response = await fetch(`http://localhost:8000/api/v1/exams/${address}`);
  const exam = await response.json();
  return exam.exam;
};

const useExamDetails = () => {
  const router = useRouter();
  const { address } = router.query;
  const { data: exam, status } = useQuery<BasicExam>(['exam', address], () =>
    fetchExam(address as string)
  );

  return { exam, status };
};

const TextToCopy = ({ text, label }: { text: string; label: string }) => {
  return (
    <div className="flex gap-2 items-center ">
      <p className="font-bold">
        {label}: <span className="font-normal">{text}</span>
      </p>
      <CopyIcon
        onClick={() => copy(text)}
        className="text-primary hover:text-secondary transition-colors hover:cursor-pointer"
      />
    </div>
  );
};
export const ExamBasics = () => {
  const { exam, status } = useExamDetails();

  return (
    <>
      <ErrorMessage isError={status === 'error'} />
      <Loader isLoading={status === 'loading'} />
      {exam && (
        <section className="px-2 flex w-full justify-evenly">
          <div>
            <TextToCopy text={exam.address} label="Address" />
            <TextToCopy text={exam.creatorAddress} label="Author" />
          </div>
          <div className="flex flex-col">
            <div
              className="flex gap-2 [&>p]:font-bold 
            [&>p>span]:font-normal
            "
            >
              <p>
                Name: <span>{exam.name}</span>
              </p>
              <p>
                Symbol: <span>{exam.symbol}</span>
              </p>
            </div>
            <p className="font-bold">
              Description:
              <span className="font-normal">{exam.description}</span>
            </p>
          </div>
        </section>
      )}
    </>
  );
};
