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
 * KpiCard — High-density, professional metric dashboard card with Sparkline graph and tooltips.
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

  // Simple sparkline path generator
  const max = Math.max(...sparklineData, 1);
  const min = Math.min(...sparklineData, 0);
  const range = max - min || 1;
  const width = 64;
  const height = 20;

  const points = sparklineData
    .map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const strokeColor = trendIsPositive ? '#059669' : '#E11D48';

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return (
    <div
      className={`relative bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-blue-300 group ${className}`}
      style={{ boxShadow: '0 4px 16px -4px rgba(0,68,130,0.05)' }}
    >
      {/* Visual top bar glow accent */}
      <div
        className={`absolute top-0 left-4 right-4 h-[2px] rounded-t-full transition-all duration-300 opacity-60 group-hover:opacity-100 ${
          trendIsPositive ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-gradient-to-r from-rose-400 to-amber-500'
        }`}
      />

      <div>
        {/* Top row: label (left) + icons (right) */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <span className="text-[10.5px] text-slate-500 font-bold uppercase tracking-wider leading-snug">
            {label}
          </span>
          {showIcons && (
            <div className="flex items-center gap-1 shrink-0 relative">
              <button
                className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all cursor-pointer"
                aria-label="Filter"
                title="Filter by metric"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>filter_list</span>
              </button>
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
                className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all cursor-pointer"
                aria-label="Info"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>info</span>
              </button>

              {/* Interactive Info Tooltip */}
              {showTooltip && (
                <div className="absolute right-0 top-6 z-50 w-56 p-2.5 bg-slate-900 text-white text-[10px] rounded-lg shadow-xl leading-relaxed border border-slate-700 animate-fadeIn">
                  <div className="font-bold text-blue-300 mb-0.5">{label}</div>
                  <p className="text-slate-300">{tooltipText}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Large KPI number & Sparkline side-by-side */}
        <div className="flex items-baseline justify-between gap-2 mt-1">
          <div
            className="text-3xl font-black tracking-tight"
            style={{ color: '#004482', fontVariantNumeric: 'tabular-nums' }}
          >
            {displayValue}
          </div>

          {/* Mini Sparkline graph */}
          <div className="shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
            <svg width={width} height={height} className="overflow-visible">
              <polyline
                fill="none"
                stroke={strokeColor}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom status row: trend and target benchmark */}
      {(trend || target) && (
        <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-100 text-[10px] font-semibold">
          {trend && (
            <span
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md font-bold ${
                trendIsPositive
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                  : 'bg-rose-50 text-rose-700 border border-rose-200/60'
              }`}
            >
              <span className="material-symbols-outlined font-black" style={{ fontSize: '12px' }}>
                {trendIsPositive ? 'trending_up' : 'trending_down'}
              </span>
              <span>{trend}</span>
            </span>
          )}
          {target && (
            <span className="text-slate-400 ml-auto">
              Target: <span className="text-slate-700 font-bold">{target}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default KpiCard;

