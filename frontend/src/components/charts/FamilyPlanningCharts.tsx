import React, { useState } from 'react';

// ── Shared Card Header Pill Controls ─────────────────────────
export const ChartHeaderPills: React.FC<{
  legendItems?: { label: string; color: string; type?: 'line' | 'bar' }[];
  showAllInv?: boolean;
  infoBadge?: string | number;
}> = ({ legendItems, showAllInv = true, infoBadge }) => {
  return (
    <div className="flex items-center gap-2 text-[11px]">
      {legendItems?.map((item) => (
        <div key={item.label} className="flex items-center gap-1">
          {item.type === 'line' ? (
            <span className="flex items-center gap-0.5">
              <span className="w-3 h-0.5 bg-[#2563eb] rounded-full inline-block"></span>
              <span className="w-1.5 h-1.5 border border-[#2563eb] rounded-full inline-block bg-white"></span>
            </span>
          ) : (
            <span
              className="w-2.5 h-2.5 rounded-sm inline-block shadow-xs"
              style={{ backgroundColor: item.color }}
            ></span>
          )}
          <span className="text-slate-600 dark:text-slate-400 font-medium">{item.label}</span>
        </div>
      ))}

      {showAllInv && (
        <div className="flex items-center gap-1 ml-1">
          <button className="px-2 py-0.5 rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-[10px] font-semibold text-blue-600 dark:text-blue-400 shadow-xs hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
            All
          </button>
          <button className="px-2 py-0.5 rounded border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-[10px] font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
            Inv
          </button>
        </div>
      )}

      <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 ml-1">
        <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <span className="material-symbols-outlined text-[15px]">filter_list</span>
        </button>
        <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative">
          <span className="material-symbols-outlined text-[15px]">info</span>
          {infoBadge && (
            <span className="absolute -top-1 -right-1 bg-blue-600 dark:bg-blue-500 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs">
              {infoBadge}
            </span>
          )}
        </button>
        <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <span className="material-symbols-outlined text-[15px]">more_vert</span>
        </button>
      </div>
    </div>
  );
};

// Helper to construct smooth cubic bezier SVG path
function getSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

// ── 1. Line Chart: Contraceptive Acceptance Rate ──────────────
export const AcceptanceRateLineChart: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(10); // default focus on latest month

  const months = [
    '01-Hamle', '02-Nehase', '03-Meskerem', '04-Tikimt', '05-Hidar',
    '06-Tahsas', '07-Tir', '08-Yekatit', '09-Megabit', '10-Miazia', '11-Ginbot'
  ];
  const values = [25.5, 26.8, 27.2, 27.5, 26.9, 29.5, 28.0, 29.0, 27.8, 30.2, 28.6];

  const width = 560;
  const height = 220;
  const padding = { top: 25, right: 25, bottom: 45, left: 35 };

  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  const minY = 0;
  const maxY = 35;

  const points = values.map((val, idx) => {
    const x = padding.left + (idx / (values.length - 1)) * graphWidth;
    const y = padding.top + graphHeight - ((val - minY) / (maxY - minY)) * graphHeight;
    return { x, y, val, month: months[idx] };
  });

  const curveD = getSmoothPath(points);
  const areaD = `${curveD} L ${points[points.length - 1].x} ${padding.top + graphHeight} L ${points[0].x} ${padding.top + graphHeight} Z`;

  return (
    <div className="w-full relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none overflow-visible">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Y Grid lines */}
        {[0, 10, 20, 30].map((yVal) => {
          const yPos = padding.top + graphHeight - ((yVal - minY) / (maxY - minY)) * graphHeight;
          return (
            <g key={yVal}>
              <line
                x1={padding.left}
                y1={yPos}
                x2={width - padding.right}
                y2={yPos}
                stroke="#e2e8f0"
                strokeDasharray="3 3"
              />
              <text
                x={padding.left - 8}
                y={yPos + 4}
                textAnchor="end"
                className="text-[10px] fill-on-surface-variant font-medium"
              >
                {yVal}
              </text>
            </g>
          );
        })}

        {/* X Labels */}
        {points.map((pt, idx) => (
          <text
            key={idx}
            x={pt.x}
            y={height - 10}
            textAnchor="end"
            transform={`rotate(-35, ${pt.x}, ${height - 10})`}
            className={`text-[9px] font-medium transition-colors ${
              hoveredIdx === idx ? 'fill-primary font-bold' : 'fill-on-surface-variant'
            }`}
          >
            {pt.month}
          </text>
        ))}

        {/* Gradient Area under line */}
        <path d={areaD} fill="url(#areaGradient)" />

        {/* Smooth Curved Line Path */}
        <path
          d={curveD}
          fill="none"
          stroke="#2563eb"
          strokeWidth="2.5"
          filter="url(#glow)"
        />

        {/* Data points & hover triggers */}
        {points.map((pt, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <g
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer"
            >
              {/* Outer halo */}
              {isHovered && (
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="10"
                  fill="#2563eb"
                  opacity="0.2"
                  className="animate-ping"
                />
              )}
              {/* Main Point Circle */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? 6 : 4}
                fill="#ffffff"
                stroke="#2563eb"
                strokeWidth={isHovered ? '3' : '2.5'}
                className="transition-all duration-200"
              />

              {/* Tooltip Popup */}
              {isHovered && (
                <g className="transition-all duration-200">
                  <rect
                    x={pt.x - 32}
                    y={pt.y - 32}
                    width="64"
                    height="24"
                    rx="6"
                    fill="#0f172a"
                    className="shadow-xl"
                  />
                  <text
                    x={pt.x}
                    y={pt.y - 16}
                    textAnchor="middle"
                    fill="#ffffff"
                    className="text-[11px] font-extrabold"
                  >
                    {pt.val}%
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ── 2. Donut Chart: Contraceptive Acceptors By Age ─────────────
export const AcceptorsByAgeDonutChart: React.FC = () => {
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  const slices = [
    { label: '30 - 49 Years', val: 46.4, color: '#dc2626', grad: ['#ef4444', '#b91c1c'], text: '46.4k' },
    { label: '25 - 29 Years', val: 45.5, color: '#2563eb', grad: ['#3b82f6', '#1d4ed8'], text: '45.5k' },
    { label: '20 - 24 Years', val: 21.6, color: '#16a34a', grad: ['#22c55e', '#15803d'], text: '21.6k' },
    { label: '15 - 19 Years', val: 32.3, color: '#eab308', grad: ['#facc15', '#ca8a04'], text: '32.3k' },
    { label: '10 - 14 Years', val: 18.0, color: '#9333ea', grad: ['#a855f7', '#7e22ce'], text: '18.0k' },
  ];

  const total = slices.reduce((sum, s) => sum + s.val, 0);

  const size = 220;
  const center = size / 2;
  const radius = 75;
  const innerRadius = 48;

  let cumulativeAngle = -Math.PI / 2;

  const slicesWithAngles = slices.map((s) => {
    const angle = (s.val / total) * Math.PI * 2;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle = endAngle;

    const midAngle = startAngle + angle / 2;
    const labelR = radius + 15;
    const lx = center + labelR * Math.cos(midAngle);
    const ly = center + labelR * Math.sin(midAngle);

    return { ...s, startAngle, endAngle, midAngle, lx, ly };
  });

  const getArcPath = (start: number, end: number, r: number, ir: number) => {
    const x1 = center + r * Math.cos(start);
    const y1 = center + r * Math.sin(start);
    const x2 = center + r * Math.cos(end);
    const y2 = center + r * Math.sin(end);

    const ix1 = center + ir * Math.cos(end);
    const iy1 = center + ir * Math.sin(end);
    const ix2 = center + ir * Math.cos(start);
    const iy2 = center + ir * Math.sin(start);

    const largeArc = end - start > Math.PI ? 1 : 0;

    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${ir} ${ir} 0 ${largeArc} 0 ${ix2} ${iy2} Z`;
  };

  const activeSliceInfo = slices.find((s) => s.label === hoveredSlice);

  return (
    <div className="flex items-center justify-between gap-2 w-full h-[220px] px-2">
      {/* SVG Donut */}
      <div className="w-[200px] h-[200px] relative shrink-0">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
          <defs>
            {slices.map((s, i) => (
              <linearGradient id={`sliceGrad-${i}`} key={i} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={s.grad[0]} />
                <stop offset="100%" stopColor={s.grad[1]} />
              </linearGradient>
            ))}
          </defs>

          {/* Center Info Circle */}
          <circle cx={center} cy={center} r={innerRadius - 4} fill="#f8fafc" />
          <text
            x={center}
            y={center - 6}
            textAnchor="middle"
            className="text-[15px] font-extrabold fill-on-surface"
          >
            {activeSliceInfo ? activeSliceInfo.text : `${total.toFixed(1)}k`}
          </text>
          <text
            x={center}
            y={center + 10}
            textAnchor="middle"
            className="text-[9px] font-semibold fill-on-surface-variant uppercase tracking-wider"
          >
            {activeSliceInfo ? activeSliceInfo.label : 'Total Acceptors'}
          </text>

          {/* Slices */}
          {slicesWithAngles.map((slice, i) => {
            const isHovered = hoveredSlice === slice.label;
            const r = isHovered ? radius + 5 : radius;
            const pathD = getArcPath(slice.startAngle, slice.endAngle, r, innerRadius);

            return (
              <g
                key={slice.label}
                onMouseEnter={() => setHoveredSlice(slice.label)}
                onMouseLeave={() => setHoveredSlice(null)}
                className="cursor-pointer transition-all duration-200"
              >
                <path
                  d={pathD}
                  fill={`url(#sliceGrad-${i})`}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all duration-200 hover:brightness-110"
                />
                {/* Number Callout */}
                <text
                  x={slice.lx}
                  y={slice.ly}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`text-[10px] font-extrabold fill-on-surface transition-all ${
                    isHovered ? 'scale-110' : ''
                  }`}
                >
                  {slice.text}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend list */}
      <div className="flex flex-col gap-1.5 text-[11px] shrink-0 pr-2">
        {slices.map((s) => {
          const isHovered = hoveredSlice === s.label;
          return (
            <div
              key={s.label}
              className={`flex items-center justify-between gap-3 px-2 py-1 rounded-md cursor-pointer transition-all ${
                isHovered ? 'bg-surface-container shadow-xs font-semibold' : 'hover:bg-surface-container-low opacity-90'
              }`}
              onMouseEnter={() => setHoveredSlice(s.label)}
              onMouseLeave={() => setHoveredSlice(null)}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-xs inline-block shadow-xs"
                  style={{ backgroundColor: s.color }}
                ></span>
                <span className="text-on-surface font-medium text-[11px] whitespace-nowrap">
                  {s.label}
                </span>
              </div>
              <span className="text-[10px] font-bold text-on-surface-variant ml-2">
                {s.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── 3. Grouped Bar Chart: Current Use of Contraceptives ───────
export const ContraceptiveUseBarChart: React.FC = () => {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const yearsData = [
    { year: '2000', current: 7.05, unmet: 37 },
    { year: '2005', current: 14.35, unmet: 36 },
    { year: '2011', current: 28, unmet: 26 },
    { year: '2016', current: 35.5, unmet: 22 },
    { year: '2019', current: 41, unmet: 0 },
    { year: '2024', current: 34.95, unmet: 15 },
  ];

  const width = 560;
  const height = 220;
  const padding = { top: 25, right: 20, bottom: 35, left: 35 };

  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;
  const maxY = 55;

  const groupWidth = graphWidth / yearsData.length;
  const barWidth = 14;

  return (
    <div className="w-full relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none overflow-visible">
        <defs>
          <linearGradient id="blueBarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="redBarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
        </defs>

        {/* Y Grid lines */}
        {[0, 10, 20, 30, 40, 50].map((yVal) => {
          const yPos = padding.top + graphHeight - (yVal / maxY) * graphHeight;
          return (
            <g key={yVal}>
              <line
                x1={padding.left}
                y1={yPos}
                x2={width - padding.right}
                y2={yPos}
                stroke="#e2e8f0"
                strokeDasharray="3 3"
              />
              <text
                x={padding.left - 8}
                y={yPos + 4}
                textAnchor="end"
                className="text-[10px] fill-on-surface-variant font-medium"
              >
                {yVal}
              </text>
            </g>
          );
        })}

        {/* Groups */}
        {yearsData.map((d, gIdx) => {
          const groupX = padding.left + gIdx * groupWidth + groupWidth / 2;

          const currentH = (d.current / maxY) * graphHeight;
          const currentY = padding.top + graphHeight - currentH;

          const unmetH = (d.unmet / maxY) * graphHeight;
          const unmetY = padding.top + graphHeight - unmetH;

          const bar1X = groupX - barWidth - 2;
          const bar2X = groupX + 2;

          const isCurrentHovered = hoveredBar === `${d.year}-current`;
          const isUnmetHovered = hoveredBar === `${d.year}-unmet`;

          return (
            <g key={d.year}>
              {/* Current Use Bar (Blue Gradient) */}
              <rect
                x={bar1X}
                y={currentY}
                width={barWidth}
                height={currentH}
                fill="url(#blueBarGrad)"
                rx="3"
                opacity={hoveredBar && !isCurrentHovered ? 0.65 : 1}
                className="cursor-pointer transition-all duration-200 hover:brightness-110"
                onMouseEnter={() => setHoveredBar(`${d.year}-current`)}
                onMouseLeave={() => setHoveredBar(null)}
              />
              <text
                x={bar1X + barWidth / 2}
                y={currentY - 5}
                textAnchor="middle"
                className={`text-[9.5px] font-extrabold transition-all ${
                  isCurrentHovered ? 'fill-primary scale-110' : 'fill-on-surface'
                }`}
              >
                {d.current}
              </text>

              {/* Unmet Need Bar (Red Gradient) */}
              {d.unmet > 0 && (
                <>
                  <rect
                    x={bar2X}
                    y={unmetY}
                    width={barWidth}
                    height={unmetH}
                    fill="url(#redBarGrad)"
                    rx="3"
                    opacity={hoveredBar && !isUnmetHovered ? 0.65 : 1}
                    className="cursor-pointer transition-all duration-200 hover:brightness-110"
                    onMouseEnter={() => setHoveredBar(`${d.year}-unmet`)}
                    onMouseLeave={() => setHoveredBar(null)}
                  />
                  <text
                    x={bar2X + barWidth / 2}
                    y={unmetY - 5}
                    textAnchor="middle"
                    className={`text-[9.5px] font-extrabold transition-all ${
                      isUnmetHovered ? 'fill-error scale-110' : 'fill-on-surface'
                    }`}
                  >
                    {d.unmet}
                  </text>
                </>
              )}

              {/* Year Label */}
              <text
                x={groupX}
                y={height - 8}
                textAnchor="middle"
                className="text-[10.5px] font-bold fill-on-surface-variant"
              >
                {d.year}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ── 4. Treemap Chart: Acceptors By Method ──────────────────────
export const AcceptorsByMethodTreemap: React.FC = () => {
  return (
    <div className="w-full h-[220px] grid grid-cols-12 grid-rows-6 gap-1.5 p-1.5 bg-slate-100/70 rounded-xl font-sans">
      {/* Injectables: 77.1k (Red/Orange tile) */}
      <div className="col-span-7 row-span-6 bg-gradient-to-br from-rose-500 to-red-600 text-white p-3.5 rounded-lg flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-white/20 group">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-extrabold drop-shadow-sm group-hover:scale-105 transition-transform">
            Injectables: 77.1k
          </span>
          <span className="material-symbols-outlined text-[18px] opacity-80">syringe</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-white/90 font-semibold bg-white/15 px-2 py-0.5 rounded-full backdrop-blur-xs">
            53.3% Share
          </span>
          <span className="text-[10px] text-white/80 font-medium">DHIS2 System</span>
        </div>
      </div>

      {/* Oral Contraceptives: 46.7k (Green tile) */}
      <div className="col-span-3 row-span-6 bg-gradient-to-br from-emerald-500 to-green-600 text-white p-3 rounded-lg flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-white/20 group">
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-extrabold leading-tight drop-shadow-sm group-hover:scale-105 transition-transform">
            Oral: 46.7k
          </span>
          <span className="material-symbols-outlined text-[16px] opacity-80">medication</span>
        </div>
        <span className="text-[9.5px] text-white/90 font-semibold bg-white/15 px-1.5 py-0.5 rounded-full w-max backdrop-blur-xs">
          32.3% Share
        </span>
      </div>

      {/* Implants: 18.2k (Yellow tile) */}
      <div className="col-span-2 row-span-4 bg-gradient-to-br from-amber-400 to-yellow-600 text-white p-2.5 rounded-lg flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-white/20 group">
        <span className="text-[10.5px] font-extrabold leading-tight group-hover:scale-105 transition-transform">
          Implants: 18.2k
        </span>
        <span className="text-[9px] text-white/90 font-semibold bg-white/20 px-1 py-0.5 rounded-full w-max">
          12.6%
        </span>
      </div>

      {/* Others: 3.65k (Cyan tile) */}
      <div className="col-span-2 row-span-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white p-2 rounded-lg flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-white/20 group">
        <span className="text-[9.5px] font-extrabold leading-tight group-hover:scale-105 transition-transform">
          Others: 3.65k
        </span>
        <span className="text-[8.5px] text-white/90 font-semibold">2.5%</span>
      </div>
    </div>
  );
};
