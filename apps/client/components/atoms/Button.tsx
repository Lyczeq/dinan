import React, { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  className: string;
};

const Button = ({ className, children }: ButtonProps) => {
  return (
    <button className={`text-white rounded-md py-2 px-2 ${className}`}>
      {children}
    </button>
  );
};

export default Button;
