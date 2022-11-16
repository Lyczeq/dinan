import { FetchStateComponent } from 'types/fetchState';

type ErrorMessageProps = FetchStateComponent & {
  isError: boolean;
};

export const ErrorMessage = ({ isError, message }: ErrorMessageProps) => {
  if (!isError) return null;

  const defaultMessage = 'Oops, something went wrong!';

  return (
    <div className="flex justify-center items-center h-full">
      <p className="text-center text-lg text-red-400 font-bold drop-shadow-md">
        {defaultMessage ?? message}
      </p>
    </div>
  );
};
