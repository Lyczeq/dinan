import React from 'react';

export const TextAreaInput = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ ...props }, ref) => {
  const { className, ...rest } = props;
  return (
    <textarea
      className={`w-full h-1/2 border-yellow-300 border-2 p-2 rounded-md focus:outline-none focus:border-inputFocus  text-lightGrey placeholder:text-placeholderGrey ${className}`}
      ref={ref}
      {...rest}
    />
  );
});

TextAreaInput.displayName = 'TextAreaInput';
