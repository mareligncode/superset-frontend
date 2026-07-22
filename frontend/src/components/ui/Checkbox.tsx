import React from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  indeterminate?: boolean;
}

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
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={checkboxRef}
            type="checkbox"
            className={`rounded border-outline-variant text-primary focus:ring-primary focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            disabled={disabled}
            {...props}
          />
        </div>
        {label && (
          <div className="ml-sm">
            <label className={`text-body-md ${error ? 'text-error' : 'text-on-surface'} ${disabled ? 'opacity-50' : ''}`}>
              {label}
            </label>
            {error && (
              <p className="text-label-md text-error mt-xs">{error}</p>
            )}
            {helperText && !error && (
              <p className="text-label-md text-on-surface-variant mt-xs">
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
