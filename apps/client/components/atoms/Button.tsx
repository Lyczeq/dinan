import React, { ReactNode } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};

export const Button = ({ className, children, onClick }: ButtonProps) => {
  return (
    <button
      className={`text-white rounded-md py-2 px-2 bg-primary ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
