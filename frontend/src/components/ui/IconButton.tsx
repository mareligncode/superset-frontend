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
    const baseStyles = 'rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative';
    
    const variantStyles = {
      default: 'hover:bg-surface-container text-on-surface-variant focus:ring-outline',
      primary: 'hover:bg-primary-container text-primary focus:ring-primary',
      ghost: 'hover:bg-surface-container-high text-on-surface-variant focus:ring-outline',
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
