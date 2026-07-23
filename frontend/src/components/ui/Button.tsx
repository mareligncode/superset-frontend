import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'error' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

/**
 * Button — Premium interactive button component with gradient variants and refined animations
 * Features: Multiple variants, sizes, loading states, icons, smooth interactions
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      icon,
      iconPosition = 'left',
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-extrabold rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 shadow-sm hover:shadow-lg relative overflow-hidden';
    
    const variantStyles = {
      primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white focus:ring-blue-500/20 dark:focus:ring-blue-400/20 border-2 border-blue-600 dark:border-blue-500',
      secondary: 'bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white focus:ring-sky-500/20 dark:focus:ring-sky-400/20 border-2 border-sky-600 dark:border-sky-500',
      outline: 'border-2 border-blue-600 dark:border-blue-500 text-blue-700 dark:text-blue-400 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/30 focus:ring-blue-500/20 dark:focus:ring-blue-400/20',
      ghost: 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-2 border-transparent focus:ring-slate-400/20 dark:focus:ring-slate-500/20',
      error: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white focus:ring-red-500/20 dark:focus:ring-red-400/20 border-2 border-red-600 dark:border-red-500',
      success: 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white focus:ring-emerald-500/20 dark:focus:ring-emerald-400/20 border-2 border-emerald-600 dark:border-emerald-500',
    };

    const sizeStyles = {
      sm: 'px-3 py-2 text-[11px] min-h-[32px]',
      md: 'px-4 py-2.5 text-[13px] min-h-[40px]',
      lg: 'px-6 py-3 text-[14px] min-h-[44px]',
      xl: 'px-8 py-4 text-[15px] min-h-[52px]',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {/* Shimmer effect overlay */}
        {!disabled && !loading && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        )}
        
        {loading && (
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        
        {!loading && icon && iconPosition === 'left' && (
          <span className="shrink-0 flex items-center">{icon}</span>
        )}
        
        <span className="relative z-10 uppercase tracking-wider leading-none">{children}</span>
        
        {!loading && icon && iconPosition === 'right' && (
          <span className="shrink-0 flex items-center">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
