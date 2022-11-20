import classNames from 'classnames';

type SearchInput = React.InputHTMLAttributes<HTMLInputElement> & {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const Input = ({ onChange, ...props }: SearchInput) => {
  const classnames = classNames({ 'cursor-not-allowed': props.disabled });

  return (
    <input
      onChange={onChange}
      type="text"
      placeholder="Type exam name or address"
      className={`${classnames} w-1/3 border-yellow-400 border-2 p-2 rounded-md focus:outline-orange-400 text-gray-600`}
      {...props}
    />
  );
};
