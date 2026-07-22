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
          <label className="block text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={`w-full bg-white dark:bg-slate-800 border ${
              error ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
            } placeholder:text-slate-400 dark:text-slate-200 rounded-lg ${icon && iconPosition === 'left' ? 'pl-10' : 'pl-3'} ${
              icon && iconPosition === 'right' ? 'pr-10' : 'pr-3'
            } py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            disabled={disabled}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 mt-1.5">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
