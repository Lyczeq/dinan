import { useRouter } from 'next/navigation';
import copy from 'copy-to-clipboard';
import { Button } from './Button';

type ExamTileProps = {
  exam?: any;
};

export const ExamTile = ({ exam }: ExamTileProps) => {
  const router = useRouter();

  const handleCopyAddress = () => {
    copy(exam.address);
  };

  const navigateToExamDetails = () => {
    router.push(`/exams/${exam.address}`);
  };

  return (
    <div className="h-72 border-2 px-2 pb-2 border-secondary bg-secondary rounded-md flex flex-col items-center justify-between md:w-full w-3/4">
      <div className="flex items-center  flex-col overflow-hidden w-full h-full">
        <Button
          className="hover:bg-white hover:text-primary px-1 py-1 text-sm self-end mt-1 hover:scale-105 transition-all"
          onClick={handleCopyAddress}
        >
          Copy
        </Button>
        <p className="text-white font-bold  text-2xl uppercase text-center flex flex-col">
          <span>{exam.name}</span>
          <span className="text-primary">{exam.symbol}</span>
        </p>
      </div>
      <Button
        className="0 p-0 px-6 py-1 flex items-center flex-col justify-self-end hover:bg-white hover:text-primary hover:scale-105 transition-all"
        onClick={navigateToExamDetails}
      >
        <p>View Exam</p>
      </Button>
    </div>
  );
};
