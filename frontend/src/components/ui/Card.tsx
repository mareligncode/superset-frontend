import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  /** Premium card variants:
   *  'default'  = standard white card with subtle shadows
   *  'elevated' = interactive card with hover lift
   *  'glass'    = glassmorphism with backdrop blur
   *  'gradient' = premium gradient background
   *  'outlined' = minimal outlined style */
  variant?: 'default' | 'elevated' | 'glass' | 'gradient' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  /** Show filter/info/more icon trio in the card header */
  showCardIcons?: boolean;
  /** Optional badge for the card header */
  badge?: React.ReactNode;
}

/**
 * CardIcons — Premium action icons for card header
 */
const CardIcons = () => (
  <div className="flex items-center gap-1 shrink-0">
    <button 
      className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-200 active:scale-95 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0" 
      aria-label="Filter"
    >
      <span className="material-symbols-outlined text-[16px]">filter_list</span>
    </button>
    <button 
      className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-200 active:scale-95 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0" 
      aria-label="Info"
    >
      <span className="material-symbols-outlined text-[16px]">info</span>
    </button>
    <button 
      className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-200 active:scale-95 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0" 
      aria-label="More options"
    >
      <span className="material-symbols-outlined text-[16px]">more_vert</span>
    </button>
  </div>
);

/**
 * Card — Premium container component with elegant variants and refined styling
 * Features: Multiple variants, backdrop blur, gradient backgrounds, smooth interactions
 */
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
  badge,
}) => {
  const variantStyles: Record<string, string> = {
    default:
      'bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/80 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300',
    elevated:
      'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer active:scale-[0.99]',
    glass:
      'bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-lg',
    gradient:
      'bg-gradient-to-br from-blue-50 to-sky-50 dark:from-slate-800 dark:to-slate-900 border border-blue-200/50 dark:border-slate-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300',
    outlined:
      'bg-transparent border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-2xl hover:shadow-md transition-all duration-200',
  };

  const paddingStyles: Record<string, string> = {
    none: '',
    sm:   'p-3 sm:p-4',
    md:   'p-3 sm:p-4 md:p-5',
    lg:   'p-4 sm:p-5 md:p-6',
    xl:   'p-5 sm:p-6 md:p-8',
  };

  const hasHeader = title || subtitle || headerAction || showCardIcons || badge;

  return (
    <div
      className={`${variantStyles[variant]} ${paddingStyles[padding]} ${className} w-full overflow-hidden`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {hasHeader && (
        <div className="flex items-start justify-between mb-4 gap-3">
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              {title && (
                <h3 className="text-[14px] font-extrabold text-slate-800 dark:text-slate-100 leading-snug tracking-tight">
                  {title}
                </h3>
              )}
              {badge && (
                <span className="inline-flex">{badge}</span>
              )}
            </div>
            {subtitle && (
              <p className="text-[12px] font-medium text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
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
