import React, { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  className: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ className, children, onClick }: ButtonProps) => {
  return (
    <button
      className={`text-white rounded-md py-2 px-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
