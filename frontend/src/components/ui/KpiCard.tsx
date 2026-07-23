import React, { useState, useEffect } from 'react';

export interface KpiCardProps {
  /** The large display number/value, e.g. "4.59k", "423k", "492,181" */
  value: string | number;
  /** Label displayed below the number */
  label: string;
  className?: string;
  /** Show the filter + info icon buttons in top-right */
  showIcons?: boolean;
  /** Trend display: positive or negative percentage, e.g. "+4.2%" or "-1.5%" */
  trend?: string;
  /** Is the trend positive (green) or negative (red) */
  trendIsPositive?: boolean;
  /** Optional benchmark target to display in small font */
  target?: string;
  /** Mini sparkline data array e.g. [10, 15, 12, 18, 24] */
  sparklineData?: number[];
  /** Detailed description tooltip text for info icon */
  tooltipText?: string;
}

/**
 * KpiCard — Premium, high-density metric dashboard card with elegant sparkline visualization and interactive tooltips.
 * Features: Smooth animations, gradient accents, refined typography, professional hover states.
 */
const KpiCard: React.FC<KpiCardProps> = ({
  value,
  label,
  className = '',
  showIcons = true,
  trend,
  trendIsPositive = true,
  target,
  sparklineData = trendIsPositive ? [12, 18, 15, 22, 28, 35] : [35, 28, 22, 25, 18, 12],
  tooltipText = 'Official Ethiopia Ministry of Health performance metric calculated based on regional reports.',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [displayValue, setDisplayValue] = useState<string | number>(value);
  const [isHovered, setIsHovered] = useState(false);

  // Enhanced sparkline path generator with smooth curves
  const max = Math.max(...sparklineData, 1);
  const min = Math.min(...sparklineData, 0);
  const range = max - min || 1;
  const width = 72;
  const height = 24;

  const points = sparklineData
    .map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const strokeColor = trendIsPositive ? '#059669' : '#E11D48';
  const gradientId = `gradient-${label.replace(/\s/g, '-')}-${trendIsPositive ? 'pos' : 'neg'}`;

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 hover:border-blue-300 dark:hover:border-blue-600 hover:-translate-y-1 group ${className}`}
      style={{ boxShadow: '0 4px 20px -6px rgba(0,92,184,0.08)' }}
    >
      {/* Premium gradient accent bar - animated on hover */}
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl transition-all duration-500 ${
          trendIsPositive 
            ? 'bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400' 
            : 'bg-gradient-to-r from-rose-400 via-orange-500 to-amber-400'
        }`}
        style={{
          opacity: isHovered ? 1 : 0.7,
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0.95)',
          transformOrigin: 'center',
        }}
      />

      <div>
        {/* Premium header with label and action icons */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <span className="text-[11px] sm:text-[12px] text-slate-600 dark:text-slate-400 font-extrabold uppercase tracking-wider leading-snug">
            {label}
          </span>
          {showIcons && (
            <div className="flex items-center gap-1.5 shrink-0 relative">
              <button
                className="w-6 h-6 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition-all duration-200 cursor-pointer active:scale-95"
                aria-label="Filter"
                title="Filter by metric"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>filter_list</span>
              </button>
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
                className="w-6 h-6 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition-all duration-200 cursor-pointer active:scale-95"
                aria-label="Info"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>info</span>
              </button>

              {/* Premium Info Tooltip with animation */}
              {showTooltip && (
                <div className="absolute right-0 top-8 z-50 w-64 p-3.5 bg-slate-900 dark:bg-slate-950 text-white rounded-xl shadow-2xl border border-slate-700 dark:border-slate-600 animate-fadeIn">
                  <div className="font-extrabold text-blue-300 mb-1.5 text-[12px] tracking-wide">{label}</div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{tooltipText}</p>
                  {/* Tooltip arrow */}
                  <div className="absolute -top-2 right-6 w-4 h-4 bg-slate-900 dark:bg-slate-950 border-l border-t border-slate-700 dark:border-slate-600 transform rotate-45"></div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Premium KPI value display with sparkline */}
        <div className="flex items-end justify-between gap-3 mt-2">
          <div
            className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 dark:from-blue-300 dark:via-blue-200 dark:to-sky-300 bg-clip-text text-transparent"
            style={{ 
              fontVariantNumeric: 'tabular-nums',
              lineHeight: '1.1',
            }}
          >
            {displayValue}
          </div>

          {/* Premium Sparkline with gradient fill */}
          <div className="shrink-0 opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
            <svg width={width} height={height} className="overflow-visible drop-shadow-sm">
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={strokeColor} stopOpacity="0.05" />
                </linearGradient>
              </defs>
              {/* Fill area under the line */}
              <polygon
                fill={`url(#${gradientId})`}
                points={`0,${height} ${points} ${width},${height}`}
              />
              {/* Sparkline polyline */}
              <polyline
                fill="none"
                stroke={strokeColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
                className="transition-all duration-300"
              />
              {/* End point indicator */}
              <circle
                cx={sparklineData.length > 0 ? width : 0}
                cy={height - ((sparklineData[sparklineData.length - 1] - min) / range) * (height - 4) - 2}
                r="2.5"
                fill={strokeColor}
                className="animate-pulse"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Premium bottom status bar with trend and target */}
      {(trend || target) && (
        <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] font-bold">
          {trend && (
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-extrabold shadow-sm transition-all duration-200 hover:scale-105 ${
                trendIsPositive
                  ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700'
                  : 'bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-900/30 dark:to-orange-900/30 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-700'
              }`}
            >
              <span className="material-symbols-outlined font-black" style={{ fontSize: '14px' }}>
                {trendIsPositive ? 'trending_up' : 'trending_down'}
              </span>
              <span className="text-[12px]">{trend}</span>
            </span>
          )}
          {target && (
            <span className="text-slate-500 dark:text-slate-400 ml-auto text-[11px]">
              Target: <span className="text-slate-700 dark:text-slate-300 font-extrabold">{target}</span>
            </span>
          )}
        </div>
      )}

      {/* Subtle corner decoration */}
      <div className="absolute bottom-0 right-0 w-16 h-16 opacity-5 dark:opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="100" cy="100" r="60" fill={trendIsPositive ? '#059669' : '#E11D48'} />
        </svg>
      </div>
    </div>
  );
};

export default KpiCard;

