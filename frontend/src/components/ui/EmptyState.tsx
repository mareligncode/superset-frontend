import React from 'react';
import Button from './Button';

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'inbox',
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 sm:py-16 text-center ${className}`}>
      <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">
        {icon}
      </span>
      <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4 max-w-md">
          {description}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick} variant="primary">
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
