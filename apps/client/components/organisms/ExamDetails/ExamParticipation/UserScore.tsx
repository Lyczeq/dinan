import Link from 'next/link';

type UserScoreProps = {
  score: number;
};

export const UserScore = ({ score }: UserScoreProps) => {
  return (
    <div className="flex items-center mt-10 flex-col mx-auto">
      <p>
        You have already participated in this exam, you cannot do that again
      </p>
      <p>Your score is {score}%</p>
      <p>
        <span>Go to your </span>
        <Link
          href="/certificates"
          className="text-primary border border-white hover:border-b-primary transition-colors"
        >
          Certificates
        </Link>
        , to check your NFT with score!
      </p>
    </div>
  );
};
