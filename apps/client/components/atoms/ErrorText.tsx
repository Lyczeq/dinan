type ErrorTextProps = {
  errorMessage?: string;
};

export const ErrorText = ({ errorMessage }: ErrorTextProps) => {
  return errorMessage ? <p className="text-error">{errorMessage}</p> : null;
};
