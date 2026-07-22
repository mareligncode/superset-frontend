import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  /** 'default' = standard chart card (white, 1px border)
   *  'elevated' = dashboard list card (hover lift)
   *  'glass'    = glassmorphism card */
  variant?: 'default' | 'elevated' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  /** Show filter/info/more icon trio in the card header */
  showCardIcons?: boolean;
}

const CardIcons = () => (
  <div className="flex items-center gap-1 shrink-0">
    <button className="w-6 h-6 flex items-center justify-center rounded text-outline hover:text-on-surface-variant hover:bg-surface-container transition-colors" aria-label="Filter">
      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>filter_list</span>
    </button>
    <button className="w-6 h-6 flex items-center justify-center rounded text-outline hover:text-on-surface-variant hover:bg-surface-container transition-colors" aria-label="Info">
      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>info</span>
    </button>
    <button className="w-6 h-6 flex items-center justify-center rounded text-outline hover:text-on-surface-variant hover:bg-surface-container transition-colors" aria-label="More options">
      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>more_vert</span>
    </button>
  </div>
);

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  headerAction,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
  showCardIcons = false,
}) => {
  const variantStyles: Record<string, string> = {
    default:
      'bg-white border border-outline-variant rounded-lg shadow-card',
    elevated:
      'bg-white border border-outline-variant rounded-xl shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer',
    glass:
      'glass border border-white/30 rounded-lg shadow-card',
  };

  const paddingStyles: Record<string, string> = {
    none: '',
    sm:   'p-2',
    md:   'p-3',
    lg:   'p-4',
  };

  const hasHeader = title || subtitle || headerAction || showCardIcons;

  return (
    <div
      className={`${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {hasHeader && (
        <div className="flex items-start justify-between mb-2 gap-2">
          <div className="flex flex-col min-w-0">
            {title && (
              <h3 className="text-[13px] font-semibold text-on-surface leading-snug truncate">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-[11px] text-on-surface-variant mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {headerAction}
            {showCardIcons && <CardIcons />}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
