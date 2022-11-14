import copy from 'copy-to-clipboard';
import Link from 'next/link';
import { Button } from './Button';

type ExamTileProps = {
  exam?: any;
};

export const ExamTile = ({ exam }: ExamTileProps) => {
  const handleCopyAddress = () => {
    copy(exam.address);
  };

  return (
    <div className="h-72 border-2 px-2 pb-2 border-yellow-400 rounded-md flex flex-col items-center gap-4 justify-between">
      <div className="flex items-center flex-col overflow-hidden ">
        <p className="text-orange-400 text-lg text-center">
          {exam.name} <span>{exam.symbol}</span>
        </p>
        <p className="text-justify text-gray-700">{exam.description}</p>
      </div>
      <div className="flex items-center flex-col justify-self-end text-gray-700">
        {/* <p className="">Created 20.11.2022</p> */}
        <Button
          className="bg-yellow-400 p-0 px-2 py-1"
          onClick={handleCopyAddress}
        >
          <p>Copy address</p>
        </Button>
        <Link href={`/exams/${exam.address}`}>Go to exam</Link>
      </div>
    </div>
  );
};
