import React from 'react';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  label?: string;
}

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  className = '',
  label,
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        className={`w-px bg-outline-variant ${className}`}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  if (label) {
    return (
      <div
        className={`flex items-center gap-md ${className}`}
        role="separator"
        aria-orientation="horizontal"
      >
        <div className="flex-1 h-px bg-outline-variant" />
        <span className="text-label-md text-on-surface-variant">{label}</span>
        <div className="flex-1 h-px bg-outline-variant" />
      </div>
    );
  }

  return (
    <hr
      className={`h-px bg-outline-variant border-0 ${className}`}
      role="separator"
      aria-orientation="horizontal"
    />
  );
};

export default Divider;
