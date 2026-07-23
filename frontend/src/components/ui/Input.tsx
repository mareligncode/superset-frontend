import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

/**
 * Input — Premium text input component with refined styling and smooth interactions
 * Features: Icon support, error states, helper text, focus ring animations
 */
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
          <label className="block text-[13px] font-extrabold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
            {label}
            {props.required && <span className="text-red-600 dark:text-red-400 ml-1">*</span>}
          </label>
        )}
        <div className="relative group">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors duration-200">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={`w-full bg-white dark:bg-slate-800 border-2 ${
              error 
                ? 'border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20'
            } placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-700 dark:text-slate-200 rounded-xl ${
              icon && iconPosition === 'left' ? 'pl-11' : 'pl-4'
            } ${
              icon && iconPosition === 'right' ? 'pr-11' : 'pr-4'
            } py-3 text-[13px] font-semibold focus:ring-4 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-50 dark:disabled:bg-slate-900 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 ${className}`}
            disabled={disabled}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors duration-200">
              {icon}
            </div>
          )}
          {/* Premium focus indicator */}
          <div className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-200 ${
            error 
              ? 'opacity-0'
              : 'opacity-0 group-focus-within:opacity-100 bg-gradient-to-r from-blue-500/5 to-sky-500/5 dark:from-blue-400/10 dark:to-sky-400/10'
          }`} />
        </div>
        {error && (
          <p className="text-[12px] font-bold text-red-600 dark:text-red-400 mt-2 flex items-center gap-1.5 animate-slideIn">
            <span className="material-symbols-outlined text-[14px]">error</span>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-[12px] font-medium text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">info</span>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
