import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      helperText,
      className = '',
      disabled,
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
          <select
            ref={ref}
            className={`w-full bg-white dark:bg-slate-800 border ${
              error ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
            } rounded-lg px-3 py-2 text-sm dark:text-slate-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            disabled={disabled}
            {...props}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500">
            expand_more
          </span>
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

Select.displayName = 'Select';

export default Select;
