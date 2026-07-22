import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = false,
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold';
  
  const variantStyles = {
    primary: 'bg-primary-container text-on-primary-container',
    secondary: 'bg-secondary-container text-on-secondary-container',
    tertiary: 'bg-tertiary-container text-on-tertiary-container',
    error: 'bg-error-container text-on-error-container',
    neutral: 'bg-surface-container text-on-surface-variant',
  };

  const sizeStyles = {
    sm: 'px-sm py-xs text-[10px]',
    md: 'px-md py-sm text-label-md',
    lg: 'px-lg py-sm text-body-md',
  };

  const roundedStyle = rounded ? 'rounded-full' : 'rounded-lg';

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${roundedStyle} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
