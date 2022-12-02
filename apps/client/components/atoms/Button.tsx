import classNames from 'classnames';
import React, { ReactNode } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
};

export const Button = ({
  className,
  children,
  onClick,
  icon,
  ...props
}: ButtonProps) => {
  const classnames = classNames(className, {
    'cursor-not-allowed bg-lightGrey': props.disabled,
    'bg-primary': !props.disabled,
  });

  return (
    <button
      className={`text-white rounded-md py-2 px-2 ${classnames}`}
      onClick={onClick}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
};
