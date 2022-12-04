import { FetchStatusComponentProps } from 'types/fetchState';

type ErrorMessageProps = FetchStatusComponentProps & {
  isError: boolean;
};

export const ErrorMessage = ({ isError, message }: ErrorMessageProps) => {
  if (!isError) return null;

  const defaultMessage = 'Oops, something went wrong!';

  return (
    <div className="flex justify-center items-center h-full">
      <p className="text-center text-lg text-error font-bold drop-shadow-md">
        {message ?? defaultMessage}
      </p>
    </div>
  );
};
