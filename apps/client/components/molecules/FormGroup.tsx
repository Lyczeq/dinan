import React from 'react';

type FormGroupProps = {
  label: string;
  children: JSX.Element;
};

export const FormGroup = ({ label, children }: FormGroupProps) => {
  return (
    <div className="flex items-center justify-between w-1/2 self-center">
      <label className="ml-10 text-lightGrey">{label}</label>
      {children}
    </div>
  );
};
