import React from 'react';
import { ErrorText } from './ErrorText';

type TextAreaInputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  errorMessage?: string;
};

export const TextAreaInput = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaInputProps
>(({ errorMessage, className, ...props }, ref) => {
  return (
    <div className="w-full h-1/2">
      <textarea
        className={`w-full border-secondary border-2 p-2 rounded-md focus:outline-none focus:border-inputFocus  text-lightGrey placeholder:text-placeholderGrey ${className}`}
        ref={ref}
        {...props}
      />
      <ErrorText errorMessage={errorMessage} />
    </div>
  );
});

TextAreaInput.displayName = 'TextAreaInput';
