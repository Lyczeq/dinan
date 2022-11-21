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
    <div className="h-72 border-2 px-2 pb-2 border-yellow-400 rounded-md flex flex-col items-center justify-between md:w-full w-3/4">
      <div className="flex items-center flex-col overflow-hidden w-full h-full">
        <Button
          className="bg-yellow-400 px-1 py-1 text-sm self-end mt-1 hover:bg-orange-400 hover:scale-105 transition-all"
          onClick={handleCopyAddress}
        >
          Copy
        </Button>
        <p className="text-orange-400 text-lg text-center">
          {exam.name} <span>{exam.symbol}</span>
        </p>
        <p className="text-justify text-gray-700">{exam.description}</p>
      </div>
      <Button
        className="bg-yellow-400 p-0 px-6 py-1 flex items-center flex-col justify-self-end hover:bg-orange-400 hover:scale-105 transition-all"
        onClick={navigateToExamDetails}
      >
        <p>View Exam</p>
      </Button>
    </div>
  );
};
