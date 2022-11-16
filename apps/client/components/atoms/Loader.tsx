import { FetchStateComponent } from 'types/fetchState';

type LoaderProps = FetchStateComponent & {
  isLoading: boolean;
};

export const Loader = ({ isLoading, message }: LoaderProps) => {
  if (!isLoading) return null;

  const defaultMessage = 'Loading...';

  return (
    <div className="flex justify-center items-center h-full">
      <p className="text-center text-lg">{defaultMessage ?? message}</p>
    </div>
  );
};
