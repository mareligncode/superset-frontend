import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      iconPosition = 'left',
      className = '',
      disabled,
      type = 'text',
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-label-md font-label-md text-on-surface-variant mb-xs">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={`w-full bg-surface border ${
              error ? 'border-error' : 'border-outline-variant'
            } rounded-lg ${icon && iconPosition === 'left' ? 'pl-10' : 'pl-md'} ${
              icon && iconPosition === 'right' ? 'pr-10' : 'pr-md'
            } py-sm text-body-md focus:ring-1 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-on-surface-variant ${className}`}
            disabled={disabled}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-label-md text-error mt-xs">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-label-md text-on-surface-variant mt-xs">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
