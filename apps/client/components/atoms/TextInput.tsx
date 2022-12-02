import classNames from 'classnames';
import React from 'react';
import { ErrorText } from './ErrorText';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ errorMessage, className, ...props }, ref) => {
    const classnames = classNames(className, {
      'cursor-not-allowed': props.disabled,
    });

    return (
      <div className="flex flex-col items-end">
        <input
          type="text"
          className={`md:w-40 xl:w-96 border-secondary border-2 p-2 rounded-md focus:outline-none focus:border-inputFocus text-lightGrey placeholder:text-placeholderGrey ${classnames} `}
          ref={ref}
          {...props}
        />
        <ErrorText errorMessage={errorMessage} />
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
