import React from 'react';

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
}

/**
 * KpiCard — High-density, professional metric dashboard card.
 */
const KpiCard: React.FC<KpiCardProps> = ({
  value,
  label,
  className = '',
  showIcons = true,
  trend,
  trendIsPositive = true,
  target,
}) => {
  return (
    <div
      className={`bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between card-hover-effect ${className}`}
      style={{ boxShadow: '0 4px 16px -4px rgba(0,68,130,0.04)' }}
    >
      <div>
        {/* Top row: label (left) + icons (right) */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-snug">
            {label}
          </span>
          {showIcons && (
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
                aria-label="Filter"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>filter_list</span>
              </button>
              <button
                className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
                aria-label="Info"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>info</span>
              </button>
            </div>
          )}
        </div>

        {/* Large KPI number */}
        <div
          className="text-3xl font-extrabold tracking-tight mt-1"
          style={{ color: '#004482', fontVariantNumeric: 'tabular-nums' }}
        >
          {value}
        </div>
      </div>

      {/* Bottom status row: trend and target benchmark */}
      {(trend || target) && (
        <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-100 text-[10px] font-semibold">
          {trend && (
            <span className={`flex items-center gap-0.5 ${trendIsPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
              <span className="material-symbols-outlined font-bold" style={{ fontSize: '11px' }}>
                {trendIsPositive ? 'trending_up' : 'trending_down'}
              </span>
              <span>{trend} vs last period</span>
            </span>
          )}
          {target && (
            <span className="text-slate-400 ml-auto">
              Target: <span className="text-slate-600 font-bold">{target}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default KpiCard;
