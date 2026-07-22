import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  variant?: 'default' | 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  badge?: boolean;
  ariaLabel: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = 'default',
      size = 'md',
      badge = false,
      ariaLabel,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed relative';
    
    const variantStyles = {
      default: 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 focus:ring-slate-400',
      primary: 'hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 focus:ring-blue-500',
      ghost: 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 focus:ring-slate-400',
    };

    const sizeStyles = {
      sm: 'p-xs',
      md: 'p-sm',
      lg: 'p-md',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        aria-label={ariaLabel}
        {...props}
      >
        <span className="material-symbols-outlined">{icon}</span>
        {badge && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
