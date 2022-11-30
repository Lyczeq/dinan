import React from 'react';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <div className={`flex gap-2 mb-4 mt-1 w-full ${className}`}>
        <label className="text-lightGrey">{label}</label>
        <input
          type="checkbox"
          className="accent-primary text-white "
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';
