import classNames from 'classnames';
import React from 'react';

export const TextInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const classnames = classNames(className, {
    'cursor-not-allowed': props.disabled,
  });

  return (
    <input
      type="text"
      className={`w-1/3 border-yellow-300 border-2 p-2 rounded-md focus:outline-none focus:border-inputFocus text-lightGrey placeholder:text-placeholderGrey ${classnames} `}
      ref={ref}
      {...props}
    />
  );
});

TextInput.displayName = 'TextInput';
