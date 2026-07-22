import React from 'react';

export interface KpiCardProps {
  /** The large display number/value, e.g. "4.59k", "423k", "492,181" */
  value: string | number;
  /** Label displayed below the number */
  label: string;
  className?: string;
  /** Show the filter + info icon buttons in top-right */
  showIcons?: boolean;
}

/**
 * KpiCard — Large metric display card matching the design's big-number cards.
 * Used in: Malaria, Blood Donation, Health Workforce, PHEM, Infrastructure, Supply & Logistics dashboards.
 *
 * Design spec:
 *  - White card, subtle border, no heavy shadow
 *  - Large teal/blue number (color: #5b9bd5)
 *  - Small grey label below
 *  - Filter + info icons in top-right
 */
const KpiCard: React.FC<KpiCardProps> = ({
  value,
  label,
  className = '',
  showIcons = true,
}) => {
  return (
    <div
      className={`bg-white border border-outline-variant rounded-lg p-4 flex flex-col ${className}`}
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
    >
      {/* Top row: label (left) + icons (right) */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="text-[12px] text-on-surface-variant leading-snug">
          {label}
        </span>
        {showIcons && (
          <div className="flex items-center gap-0.5 shrink-0">
            <button
              className="w-5 h-5 flex items-center justify-center text-outline hover:text-on-surface-variant transition-colors"
              aria-label="Filter"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>filter_list</span>
            </button>
            <button
              className="w-5 h-5 flex items-center justify-center text-outline hover:text-on-surface-variant transition-colors"
              aria-label="Info"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>info</span>
            </button>
          </div>
        )}
      </div>

      {/* Large KPI number */}
      <div
        className="text-4xl font-bold tracking-tight mt-1"
        style={{ color: '#5b9bd5', fontVariantNumeric: 'tabular-nums' }}
      >
        {value}
      </div>
    </div>
  );
};

export default KpiCard;
