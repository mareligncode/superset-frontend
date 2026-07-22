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
    <div className={`flex flex-col items-center justify-center py-xl text-center ${className}`}>
      <span className="material-symbols-outlined text-6xl text-outline mb-lg">
        {icon}
      </span>
      <h3 className="text-headline-sm font-headline-sm text-on-surface mb-sm">
        {title}
      </h3>
      {description && (
        <p className="text-body-md text-on-surface-variant mb-lg max-w-md">
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
