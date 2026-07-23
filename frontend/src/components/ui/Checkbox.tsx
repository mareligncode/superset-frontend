import React from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  indeterminate?: boolean;
}

/**
 * Checkbox — Premium checkbox component with refined styling
 * Features: Indeterminate state, error states, helper text, smooth animations
 */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      helperText,
      indeterminate = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const checkboxRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    React.useImperativeHandle(ref, () => checkboxRef.current!);

    return (
      <div className="flex items-start gap-3 group">
        <div className="flex items-center pt-0.5">
          <input
            ref={checkboxRef}
            type="checkbox"
            className={`w-5 h-5 rounded-lg border-2 ${
              error 
                ? 'border-red-500 dark:border-red-400 text-red-600 dark:text-red-500 focus:ring-red-500/20' 
                : 'border-slate-300 dark:border-slate-600 text-blue-600 dark:text-blue-500 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 checked:border-blue-600 dark:checked:border-blue-500'
            } bg-white dark:bg-slate-800 focus:ring-4 focus:outline-none transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-50 dark:disabled:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-500 checked:hover:border-blue-700 dark:checked:hover:border-blue-400 shadow-sm hover:shadow-md active:scale-95 ${className}`}
            disabled={disabled}
            {...props}
          />
        </div>
        {label && (
          <div className="flex-1">
            <label className={`text-[13px] font-semibold cursor-pointer ${
              error 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} transition-colors duration-150`}>
              {label}
            </label>
            {error && (
              <p className="text-[11px] font-bold text-red-600 dark:text-red-400 mt-1.5 flex items-center gap-1 animate-slideIn">
                <span className="material-symbols-outlined text-[13px]">error</span>
                {error}
              </p>
            )}
            {helperText && !error && (
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1.5">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
