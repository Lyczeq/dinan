import React from 'react';

type FormGroupProps = {
  label: string;
  children: React.ReactNode;
};

export const FormGroup = ({ label, children }: FormGroupProps) => {
  return (
    <div className="w-2/3 flex items-center justify-between self-center">
      <label className="ml-10 text-lightGrey">{label}</label>
      {children}
    </div>
  );
};
