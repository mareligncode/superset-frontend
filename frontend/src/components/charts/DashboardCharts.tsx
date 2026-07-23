import React from 'react';
import { useTranslation } from 'react-i18next';
import { getLocalizedRegionName } from '@/utils/regionUtils';
import { getLocalizedMonthWithNumber } from '@/utils/monthUtils';


// ─────────────────────────────────────────────────────────────
// 1. MATERNAL HEALTH CHARTS
// ─────────────────────────────────────────────────────────────

export const MaternalHealthBarChart: React.FC = () => {
  const { t } = useTranslation();
  const monthKeys = ['01-hamle', '03-meskerem', '05-hidar', '07-tir', '09-megabit', '11-ginbot'];
  const months = monthKeys.map(m => getLocalizedMonthWithNumber(m, t));
  const data = [
    { pnc: 34, sba: 34.2, cs: 1.8 },
    { pnc: 37.1, sba: 36.5, cs: 2.1 },
    { pnc: 39.5, sba: 35.0, cs: 2.3 },
    { pnc: 37.8, sba: 36.6, cs: 2.0 },
    { pnc: 37.2, sba: 35.4, cs: 2.2 },
    { pnc: 32.1, sba: 33.8, cs: 1.9 },
  ];

  return (
    <div className="w-full relative select-none">
      <svg viewBox="0 0 540 220" className="w-full h-auto">
        {/* Grid */}
        {[0, 10, 20, 30, 40].map((val) => (
          <g key={val}>
            <line x1="35" y1={200 - val * 4} x2="520" y2={200 - val * 4} stroke="#e2e8f0" strokeDasharray="3 3" />
            <text x="28" y={204 - val * 4} textAnchor="end" className="text-[10px] fill-on-surface-variant">{val}</text>
          </g>
        ))}

        {/* Legend */}
        <g transform="translate(180, 15)">
          <rect x="0" y="0" width="10" height="10" fill="#2563eb" rx="2" />
          <text x="14" y="9" className="text-[9.5px] fill-on-surface-variant font-medium">PNC Coverage</text>
          <rect x="110" y="0" width="10" height="10" fill="#dc2626" rx="2" />
          <text x="124" y="9" className="text-[9.5px] fill-on-surface-variant font-medium">Skilled Birth Attendance</text>
          <rect x="250" y="0" width="10" height="10" fill="#d97706" rx="2" />
          <text x="264" y="9" className="text-[9.5px] fill-on-surface-variant font-medium">Caesarean Section Rate</text>
        </g>

        {/* Grouped Bars */}
        {data.map((d, i) => {
          const groupX = 55 + i * 78;
          return (
            <g key={i}>
              <rect x={groupX} y={200 - d.pnc * 4} width="16" height={d.pnc * 4} fill="#2563eb" rx="2" />
              <rect x={groupX + 18} y={200 - d.sba * 4} width="16" height={d.sba * 4} fill="#dc2626" rx="2" />
              <rect x={groupX + 36} y={200 - d.cs * 4} width="16" height={d.cs * 4} fill="#d97706" rx="2" />
              <text x={groupX + 26} y="214" textAnchor="middle" className="text-[9.5px] fill-on-surface-variant font-medium">{months[i]}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const MaternalANCLineChart: React.FC = () => {
  const { t } = useTranslation();
  const anc4 = [65, 62, 68, 65, 74, 66, 67, 75, 71];
  const anc8 = [22, 23, 24, 23.5, 25.2, 24, 23, 25, 30];
  const monthKeys = ['01-hamle', '03-meskerem', '05-hidar', '07-tir', '09-megabit', '11-ginbot'];
  const months = monthKeys.map(m => getLocalizedMonthWithNumber(m, t));

  const width = 540;
  const height = 220;

  const points4 = anc4.map((val, i) => ({
    x: 45 + i * 55,
    y: 190 - (val / 100) * 150,
    val,
  }));

  const points8 = anc8.map((val, i) => ({
    x: 45 + i * 55,
    y: 190 - (val / 100) * 150,
    val,
  }));

  const path4 = points4.reduce((acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), '');
  const path8 = points8.reduce((acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), '');

  return (
    <div className="w-full relative select-none">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {[0, 20, 40, 60, 80].map((val) => (
          <g key={val}>
            <line x1="35" y1={190 - (val / 100) * 150} x2="510" y2={190 - (val / 100) * 150} stroke="#e2e8f0" strokeDasharray="3 3" />
            <text x="28" y={194 - (val / 100) * 150} textAnchor="end" className="text-[10px] fill-on-surface-variant">{val}</text>
          </g>
        ))}

        <g transform="translate(180, 15)">
          <line x1="0" y1="5" x2="16" y2="5" stroke="#2563eb" strokeWidth="2" />
          <circle cx="8" cy="5" r="3" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" />
          <text x="22" y="8" className="text-[9.5px] fill-on-surface-variant font-medium">ANC 4+ Coverage</text>

          <line x1="140" y1="5" x2="156" y2="5" stroke="#dc2626" strokeWidth="2" />
          <circle cx="148" cy="5" r="3" fill="#ffffff" stroke="#dc2626" strokeWidth="1.5" />
          <text x="162" y="8" className="text-[9.5px] fill-on-surface-variant font-medium">ANC 8+ Coverage</text>
        </g>

        <path d={path4} fill="none" stroke="#2563eb" strokeWidth="2" />
        <path d={path8} fill="none" stroke="#dc2626" strokeWidth="2" />

        {points4.map((pt, i) => (
          <circle key={i} cx={pt.x} cy={pt.y} r="3.5" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
        ))}
        {points8.map((pt, i) => (
          <circle key={i} cx={pt.x} cy={pt.y} r="3.5" fill="#ffffff" stroke="#dc2626" strokeWidth="2" />
        ))}

        {months.map((m, i) => (
          <text key={i} x={45 + i * 85} y="208" textAnchor="middle" className="text-[9.5px] fill-on-surface-variant font-medium">{m}</text>
        ))}
      </svg>
    </div>
  );
};

export const MaternalMortalityBarChart: React.FC = () => {
  const data = [
    { year: '2000', ratio: 871 },
    { year: '2005', ratio: 673 },
    { year: '2011', ratio: 676 },
    { year: '2016', ratio: 412 },
    { year: '2019', ratio: 267 },
    { year: '2024', ratio: 175 },
  ];

  return (
    <div className="w-full relative select-none">
      <svg viewBox="0 0 540 220" className="w-full h-auto">
        {[0, 200, 400, 600, 800, 1000].map((val) => (
          <g key={val}>
            <line x1="45" y1={190 - (val / 1000) * 150} x2="510" y2={190 - (val / 1000) * 150} stroke="#e2e8f0" strokeDasharray="3 3" />
            <text x="38" y={194 - (val / 1000) * 150} textAnchor="end" className="text-[10px] fill-on-surface-variant">{val}</text>
          </g>
        ))}

        {data.map((d, i) => {
          const x = 70 + i * 72;
          const h = (d.ratio / 1000) * 150;
          return (
            <g key={d.year}>
              <rect x={x} y={190 - h} width="40" height={h} fill="#2563eb" rx="3" className="hover:opacity-85 transition-opacity cursor-pointer" />
              <text x={x + 20} y={182 - h} textAnchor="middle" className="text-[9.5px] font-bold fill-on-surface">{d.ratio}</text>
              <text x={x + 20} y="208" textAnchor="middle" className="text-[10px] font-medium fill-on-surface-variant">{d.year}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 2. NCD DASHBOARD CHARTS
// ─────────────────────────────────────────────────────────────

export const NCDRiskAgeGroupedBar: React.FC = () => {
  const groups = ['18-29', '30-44', '45-59', '60-69', 'Total'];
  const khat = [24.5, 24.6, 19.3, 21.6, 23.5];
  const alcohol = [17.3, 20.6, 24.5, 23.4, 20.1];
  const tobacco = [2.2, 2.5, 3.1, 4.0, 2.9];

  return (
    <div className="w-full relative select-none">
      <svg viewBox="0 0 540 220" className="w-full h-auto">
        {[0, 10, 20, 30].map((val) => (
          <g key={val}>
            <line x1="35" y1={190 - (val / 35) * 150} x2="510" y2={190 - (val / 35) * 150} stroke="#e2e8f0" strokeDasharray="3 3" />
            <text x="28" y={194 - (val / 35) * 150} textAnchor="end" className="text-[10px] fill-on-surface-variant">{val}</text>
          </g>
        ))}

        <g transform="translate(140, 10)">
          <rect x="0" y="0" width="10" height="10" fill="#2563eb" rx="2" />
          <text x="14" y="9" className="text-[9.5px] fill-on-surface-variant font-medium">Current Khat Use</text>
          <rect x="115" y="0" width="10" height="10" fill="#dc2626" rx="2" />
          <text x="129" y="9" className="text-[9.5px] fill-on-surface-variant font-medium">Current Alcohol Consumption</text>
          <rect x="275" y="0" width="10" height="10" fill="#d97706" rx="2" />
          <text x="289" y="9" className="text-[9.5px] fill-on-surface-variant font-medium">Current Tobacco Use</text>
        </g>

        {groups.map((g, i) => {
          const gx = 55 + i * 90;
          return (
            <g key={g}>
              <rect x={gx} y={190 - (khat[i] / 35) * 150} width="20" height={(khat[i] / 35) * 150} fill="#2563eb" rx="2" />
              <rect x={gx + 22} y={190 - (alcohol[i] / 35) * 150} width="20" height={(alcohol[i] / 35) * 150} fill="#dc2626" rx="2" />
              <rect x={gx + 44} y={190 - (tobacco[i] / 35) * 150} width="20" height={(tobacco[i] / 35) * 150} fill="#d97706" rx="2" />
              <text x={gx + 32} y="206" textAnchor="middle" className="text-[10px] fill-on-surface-variant font-medium">{g}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const NCDSexMetricTable: React.FC = () => {
  return (
    <div className="w-full overflow-x-auto custom-scrollbar text-[12px]">
      <table className="w-full text-left border-collapse border border-outline-variant">
        <thead>
          <tr className="bg-surface-container-low border-b border-outline-variant text-[11px] text-on-surface-variant font-semibold">
            <th className="p-2 border-r border-outline-variant">Indicator Name</th>
            <th className="p-2 border-r border-outline-variant text-center">Female</th>
            <th className="p-2 border-r border-outline-variant text-center">Male</th>
            <th className="p-2 text-center">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant text-on-surface">
          <tr className="hover:bg-surface-container/50">
            <td className="p-2 border-r border-outline-variant font-medium">Current Alcohol Consumption</td>
            <td className="p-2 border-r border-outline-variant text-center text-primary font-bold">16.5</td>
            <td className="p-2 border-r border-outline-variant text-center text-primary font-bold">22.9</td>
            <td className="p-2 text-center text-primary font-extrabold">20.1</td>
          </tr>
          <tr className="hover:bg-surface-container/50">
            <td className="p-2 border-r border-outline-variant font-medium">Current Khat Use</td>
            <td className="p-2 border-r border-outline-variant text-center text-primary font-bold">16.9</td>
            <td className="p-2 border-r border-outline-variant text-center text-primary font-bold">28.6</td>
            <td className="p-2 text-center text-primary font-extrabold">23.4</td>
          </tr>
          <tr className="hover:bg-surface-container/50">
            <td className="p-2 border-r border-outline-variant font-medium">Current Tobacco Use</td>
            <td className="p-2 border-r border-outline-variant text-center text-primary font-bold">0.5</td>
            <td className="p-2 border-r border-outline-variant text-center text-primary font-bold">4.9</td>
            <td className="p-2 text-center text-primary font-extrabold">2.9</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const BloodGlucoseSexDonut: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-6 w-full h-[220px]">
      <svg viewBox="0 0 160 160" className="w-[150px] h-[150px]">
        {/* Male slice 65% */}
        <path d="M 80 80 L 80 10 A 70 70 0 1 1 20 115 Z" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
        {/* Female slice 35% */}
        <path d="M 80 80 L 20 115 A 70 70 0 0 1 80 10 Z" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
      </svg>
      <div className="flex flex-col gap-2 text-[12px]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#2563eb] inline-block"></span>
          <span className="font-semibold text-on-surface">Male (64.2%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#dc2626] inline-block"></span>
          <span className="font-semibold text-on-surface">Female (35.8%)</span>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 3. MALARIA DASHBOARD CHARTS
// ─────────────────────────────────────────────────────────────

export const MalariaRiskCategoryPie: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-6 w-full h-[220px]">
      <svg viewBox="0 0 160 160" className="w-[150px] h-[150px]">
        <path d="M 80 80 L 80 10 A 70 70 0 0 1 145 105 Z" fill="#2563eb" />
        <path d="M 80 80 L 145 105 A 70 70 0 0 1 80 150 Z" fill="#dc2626" />
        <path d="M 80 80 L 80 150 A 70 70 0 0 1 80 10 Z" fill="#d97706" />
      </svg>
      <div className="flex flex-col gap-2 text-[12px]">
        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#2563eb] rounded-xs"></span><span>Low Risk (48%)</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#dc2626] rounded-xs"></span><span>Medium Risk (32%)</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#d97706] rounded-xs"></span><span>High Risk (20%)</span></div>
      </div>
    </div>
  );
};

export const TopHighRiskWoredasBar: React.FC = () => {
  const woredas = ['Awash Fentale', 'Amibara', 'Dullecha', 'Awash Town', 'Aysaita', 'Yalo', 'Afambo', 'Teru', 'Aysaita City'];
  return (
    <div className="w-full relative select-none">
      <svg viewBox="0 0 540 220" className="w-full h-auto">
        {woredas.map((w, i) => {
          const h = 130 - i * 9;
          const x = 40 + i * 52;
          return (
            <g key={w}>
              <rect x={x} y={180 - h} width="32" height={h} fill="#2563eb" rx="2" />
              <text x={x + 16} y="195" textAnchor="end" transform={`rotate(-45, ${x + 16}, 195)`} className="text-[8.5px] fill-on-surface-variant font-medium">{w}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 4. BLOOD DONATION DASHBOARD CHARTS
// ─────────────────────────────────────────────────────────────

export const BloodTTIBars: React.FC = () => {
  const tests = [
    { label: 'Syphilis Positive', val: 7800 },
    { label: 'Hepatitis C Positive', val: 5600 },
    { label: 'Hepatitis B Positive', val: 9400 },
    { label: 'HIV Positive', val: 3200 },
  ];
  return (
    <div className="w-full space-y-2 p-2">
      {tests.map((t) => (
        <div key={t.label} className="space-y-1">
          <div className="flex justify-between text-[11px] font-semibold text-on-surface">
            <span>{t.label}</span>
            <span className="text-primary">{t.val.toLocaleString()}</span>
          </div>
          <div className="w-full bg-surface-container-low h-3 rounded-full overflow-hidden border border-outline-variant">
            <div className="bg-[#2563eb] h-full rounded-full" style={{ width: `${(t.val / 10000) * 100}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const BloodUnitsTrendLine: React.FC = () => {
  const points = [80, 110, 140, 160, 200, 240, 230, 290, 310, 340, 380, 423];
  const years = ['2005', '2008', '2010', '2012', '2014', '2016', '2017'];
  const width = 540;
  const height = 200;

  const pts = points.map((val, i) => ({
    x: 40 + i * 42,
    y: 170 - (val / 450) * 140,
  }));
  const pathD = pts.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');

  return (
    <div className="w-full relative select-none">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2.5" />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
        ))}
        {years.map((y, i) => (
          <text key={y} x={40 + i * 70} y="190" textAnchor="middle" className="text-[9.5px] fill-on-surface-variant">{y}</text>
        ))}
      </svg>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 5. SUPPLY & LOGISTICS CHARTS
// ─────────────────────────────────────────────────────────────

export const SupplyVsDistributedLineChart: React.FC = () => {
  const years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'];
  const distributed = [18, 19, 20, 32, 44, 38, 48, 64];
  const procured = [12, 14, 15, 25, 46, 42, 34, 52];

  const ptsD = distributed.map((val, i) => ({ x: 40 + i * 65, y: 180 - (val / 70) * 150 }));
  const ptsP = procured.map((val, i) => ({ x: 40 + i * 65, y: 180 - (val / 70) * 150 }));

  const dPath = ptsD.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');
  const pPath = ptsP.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');

  return (
    <div className="w-full relative select-none">
      <svg viewBox="0 0 540 220" className="w-full h-auto">
        <path d={dPath} fill="none" stroke="#2563eb" strokeWidth="2" />
        <path d={pPath} fill="none" stroke="#dc2626" strokeWidth="2" />
        {years.map((y, i) => (
          <text key={y} x={40 + i * 65} y="200" textAnchor="middle" className="text-[10px] fill-on-surface-variant font-medium">{y}</text>
        ))}
      </svg>
    </div>
  );
};

export const InventoryFillRatesBar: React.FC = () => {
  const items = [
    { label: 'Drug Availability (%)', val: 78, color: '#2563eb' },
    { label: 'Forecast accuracy (%)', val: 74, color: '#dc2626' },
    { label: 'Stock availability', val: 70, color: '#d97706' },
    { label: 'Local Supplier fill rate', val: 68, color: '#16a34a' },
  ];
  return (
    <div className="w-full space-y-3 p-2">
      {items.map((it) => (
        <div key={it.label} className="space-y-1">
          <div className="flex justify-between text-[11px] font-semibold text-on-surface">
            <span>{it.label}</span>
            <span className="font-extrabold text-primary">{it.val}%</span>
          </div>
          <div className="w-full bg-surface-container-low h-3 rounded-full overflow-hidden border border-outline-variant">
            <div className="h-full rounded-full" style={{ width: `${it.val}%`, backgroundColor: it.color }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 6. HEALTH WORKFORCE CHARTS
// ─────────────────────────────────────────────────────────────

export const WorkforceDensityBar: React.FC = () => {
  const regions = [
    { region: 'Addis Ababa', density: 8.83 },
    { region: 'Gambela', density: 4.06 },
    { region: 'Harari', density: 2.45 },
    { region: 'Dire Dawa', density: 2.44 },
    { region: 'Benishangul', density: 2.25 },
    { region: 'Tigray', density: 1.82 },
    { region: 'Sidama', density: 1.8 },
  ];

  return (
    <div className="w-full space-y-2 p-2">
      {regions.map((r) => (
        <div key={r.region} className="flex items-center gap-3">
          <span className="w-24 text-[11px] font-semibold text-on-surface truncate">{r.region}</span>
          <div className="flex-1 bg-surface-container-low h-3 rounded-full overflow-hidden border border-outline-variant">
            <div className="bg-[#2563eb] h-full rounded-full" style={{ width: `${(r.density / 10) * 100}%` }}></div>
          </div>
          <span className="text-[11px] font-extrabold text-primary w-10 text-right">{r.density}</span>
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 7. HEALTH EQUITY CHARTS
// ─────────────────────────────────────────────────────────────

export const SimpleMeasureHorizontalBarChart: React.FC = () => {
  const { t } = useTranslation();
  const data = [
    { name: 'Tigray', val: 0.37 },
    { name: 'South West Ethiopia', val: 0.65 },
    { name: 'South Ethiopia', val: 0.63 },
    { name: 'Somali', val: 0.18 },
    { name: 'Sidama', val: 0.79 },
    { name: 'Oromia', val: 0.83 },
    { name: 'Harari', val: 0.57 },
    { name: 'Gambella', val: 0.21 },
    { name: 'Dire Dawa', val: 0.36 },
    { name: 'Central Ethiopian', val: 0.68 },
    { name: 'Benishangul Gumuz', val: 0.34 },
    { name: 'Amhara', val: 0.82 },
    { name: 'Afar', val: 0.20 },
    { name: 'Addis Ababa', val: 0.36 },
  ];

  return (
    <div className="w-full relative select-none">
      <svg viewBox="0 0 540 340" className="w-full h-auto">
        {/* Y Grid lines */}
        {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((val) => {
          const x = 110 + val * 380;
          return (
            <g key={val}>
              <line x1={x} y1="10" x2={x} y2="300" stroke="#e2e8f0" strokeDasharray="3 3" />
              <text x={x} y="316" textAnchor="middle" className="text-[9px] fill-on-surface-variant font-medium">{val}</text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const y = 15 + i * 20;
          const w = d.val * 380;
          const localized = getLocalizedRegionName(d.name, t);
          return (
            <g key={d.name}>
              <text x="100" y={y + 10} textAnchor="end" className="text-[10px] fill-on-surface font-semibold">{localized}</text>
              <rect x="110" y={y} width={w} height="13" fill="#2563eb" rx="2" className="hover:brightness-105 transition-all cursor-pointer" />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const RatioToMinVerticalBarChart: React.FC = () => {
  const { t } = useTranslation();
  const data = [
    { name: 'Addis Ababa', val: 3.1 },
    { name: 'Afar', val: 1.8 },
    { name: 'Amhara', val: 7.2 },
    { name: 'Benishangul Gumuz', val: 3.0 },
    { name: 'Central Ethiopian', val: 6.0 },
    { name: 'Dire Dawa', val: 3.2 },
    { name: 'Gambella', val: 1.9 },
    { name: 'Harari', val: 5.0 },
    { name: 'Oromia', val: 7.3 },
    { name: 'Sidama', val: 6.9 },
    { name: 'Somali', val: 1.0 },
    { name: 'South Ethiopia', val: 5.6 },
    { name: 'South West Ethiopia', val: 5.7 },
    { name: 'Tigray', val: 2.2 },
  ];

  return (
    <div className="w-full relative select-none">
      <svg viewBox="0 0 540 340" className="w-full h-auto">
        {/* Y Grid lines */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((val) => {
          const y = 280 - (val / 8) * 240;
          return (
            <g key={val}>
              <line x1="35" y1={y} x2="520" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
              <text x="28" y={y + 4} textAnchor="end" className="text-[9px] fill-on-surface-variant font-medium">{val}</text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const x = 42 + i * 34;
          const h = (d.val / 8) * 240;
          const localized = getLocalizedRegionName(d.name, t);
          return (
            <g key={d.name}>
              <rect x={x} y={280 - h} width="20" height={h} fill="#2563eb" rx="2" className="hover:brightness-105 transition-all cursor-pointer" />
              <text x={x + 10} y="292" textAnchor="end" transform={`rotate(-45, ${x + 10}, 292)`} className="text-[8.5px] fill-on-surface font-semibold truncate w-16">{localized}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const AbsoluteConcentrationIndexVerticalBarChart: React.FC = () => {
  const data = [
    { name: 'Addis Ababa City Administration', val: 0.3 },
    { name: 'Afar Region', val: 0.2 },
    { name: 'Amhara Region', val: 0.75 },
    { name: 'Benishangul Gumuz Regional Health Bureau', val: 0.3 },
    { name: 'Central Ethiopian region', val: 0.68 },
    { name: 'Dire Dawa City Administration', val: 0.32 },
    { name: 'Gambella Region', val: 0.21 },
    { name: 'Harari Region', val: 0.5 },
    { name: 'Oromia Region', val: 0.83 },
    { name: 'Sidama Region', val: 0.79 },
    { name: 'Somali Region', val: 0.18 },
    { name: 'South Ethiopia Region', val: 0.57 },
    { name: 'South West Ethiopia Region', val: 0.58 },
    { name: 'Tigray Region', val: 0.25 },
  ];

  return (
    <div className="w-full relative select-none">
      <svg viewBox="0 0 540 340" className="w-full h-auto">
        {/* Y Grid lines */}
        {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((val) => {
          const y = 260 - val * 220;
          return (
            <g key={val}>
              <line x1="35" y1={y} x2="520" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
              <text x="28" y={y + 4} textAnchor="end" className="text-[9px] fill-on-surface-variant font-medium">{val}</text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const x = 42 + i * 34;
          const h = d.val * 220;
          return (
            <g key={d.name}>
              <rect x={x} y={260 - h} width="20" height={h} fill="#2563eb" rx="2" className="hover:brightness-105 transition-all cursor-pointer" />
              <text x={x + 10} y="272" textAnchor="end" transform={`rotate(-45, ${x + 10}, 272)`} className="text-[8.5px] fill-on-surface font-semibold truncate w-16">{d.name}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const RelativeConcentrationIndexScatterPlot: React.FC = () => {
  const points = [
    { x: 50, y: 1.6 },
    { x: 80, y: 0.8 },
    { x: 120, y: 1.9 },
    { x: 160, y: 1.1 },
    { x: 200, y: 1.5 },
    { x: 240, y: 0.7 },
    { x: 280, y: 1.3 },
    { x: 320, y: 1.7 },
    { x: 360, y: 0.9 },
    { x: 400, y: 1.4 },
    { x: 440, y: 1.2 },
    { x: 480, y: 0.5 },
  ];

  return (
    <div className="w-full relative select-none">
      <svg viewBox="0 0 540 240" className="w-full h-auto">
        {/* Y Grid lines */}
        {[0, 0.5, 1.0, 1.5, 2.0].map((val) => {
          const y = 190 - (val / 2) * 150;
          return (
            <g key={val}>
              <line x1="45" y1={y} x2="510" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
              <text x="38" y={y + 4} textAnchor="end" className="text-[9.5px] fill-on-surface-variant font-medium">{val}</text>
            </g>
          );
        })}

        {/* Dotted Equity Line at Y = 1 */}
        <line x1="45" y1={190 - (1.0 / 2) * 150} x2="510" y2={190 - (1.0 / 2) * 150} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Scatter Dots */}
        {points.map((pt, i) => {
          const cx = 55 + i * 36;
          const cy = 190 - (pt.y / 2) * 150;
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r="4.5" fill="#2563eb" className="hover:scale-125 transition-transform cursor-pointer" />
            </g>
          );
        })}

        {/* X labels */}
        <text x="70" y="215" textAnchor="middle" className="text-[9px] fill-on-surface-variant font-medium">Addis Ababa City Administration</text>
        <text x="250" y="215" textAnchor="middle" className="text-[9px] fill-on-surface-variant font-medium">Gambella Region</text>
        <text x="430" y="215" textAnchor="middle" className="text-[9px] fill-on-surface-variant font-medium">South West Ethiopia Region</text>
      </svg>
    </div>
  );
};

export const HealthWorkforceCategoryTreemap: React.FC = () => {
  return (
    <div className="w-full h-[220px] grid grid-cols-12 grid-rows-6 gap-1 p-1 bg-slate-50 rounded-lg font-sans">
      {/* Support Staff (Red-Orange, cols 1-5) */}
      <div className="col-span-5 row-span-6 bg-gradient-to-br from-rose-500 to-red-600 text-white p-3 rounded flex flex-col justify-between shadow-sm hover:brightness-105 transition-all cursor-pointer">
        <span className="text-[12px] font-bold">Support Staff: 167.1k</span>
        <span className="text-[9px] text-white/80 font-medium">Administrative</span>
      </div>

      {/* Clinical Nurse (Purple, cols 6-9) */}
      <div className="col-span-4 row-span-6 bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-2.5 rounded flex flex-col justify-between shadow-sm hover:brightness-105 transition-all cursor-pointer">
        <span className="text-[11.5px] font-bold">Clinical Nurse: 125.4k</span>
        <span className="text-[9px] text-white/80 font-medium">Professional</span>
      </div>

      {/* Health Extension (Blue, cols 10-11) */}
      <div className="col-span-2 row-span-4 bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-2 rounded flex flex-col justify-between shadow-sm hover:brightness-105 transition-all cursor-pointer">
        <span className="text-[10px] font-bold leading-tight">HEW: 42.1k</span>
      </div>

      {/* Midwife (Green, col 12) */}
      <div className="col-span-1 row-span-6 bg-gradient-to-br from-emerald-500 to-green-600 text-white p-1 rounded flex flex-col justify-between shadow-sm hover:brightness-105 transition-all cursor-pointer">
        <span className="text-[9px] font-bold leading-tight">Midwife: 22k</span>
      </div>

      {/* General Practitioner (Yellow, cols 10-11) */}
      <div className="col-span-2 row-span-2 bg-gradient-to-br from-amber-400 to-yellow-600 text-white p-1.5 rounded flex flex-col justify-between shadow-sm hover:brightness-105 transition-all cursor-pointer">
        <span className="text-[9px] font-bold leading-tight">GPs: 18.5k</span>
      </div>
    </div>
  );
};

export const HealthWorkforceDensityBarChart: React.FC = () => {
  const regions = [
    { name: 'Addis Ababa', density: 8.83 },
    { name: 'Harari', density: 4.06 },
    { name: 'Gambela', density: 2.45 },
    { name: 'Dire Dawa', density: 2.44 },
    { name: 'Benishangul', density: 2.25 },
    { name: 'Tigray', density: 1.82 },
    { name: 'Sidama', density: 1.80 },
    { name: 'Somali', density: 1.20 },
    { name: 'Oromia', density: 0.90 },
    { name: 'Amhara', density: 0.85 },
  ];

  return (
    <div className="w-full relative select-none">
      <svg viewBox="0 0 540 220" className="w-full h-auto">
        {/* X Grid lines */}
        {[0, 2, 4, 6, 8, 10].map((val) => {
          const x = 100 + (val / 10) * 400;
          return (
            <g key={val}>
              <line x1={x} y1="10" x2={x} y2="190" stroke="#e2e8f0" strokeDasharray="3 3" />
              <text x={x} y="204" textAnchor="middle" className="text-[9px] fill-on-surface-variant font-medium">{val}</text>
            </g>
          );
        })}

        {/* Bars */}
        {regions.map((r, i) => {
          const y = 15 + i * 17;
          const w = (r.density / 10) * 400;
          return (
            <g key={r.name}>
              <text x="90" y={y + 10} textAnchor="end" className="text-[9.5px] fill-on-surface font-semibold">{r.name}</text>
              <rect x="100" y={y} width={w} height="10" fill="#2563eb" rx="1.5" className="hover:brightness-105 transition-all cursor-pointer" />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const HealthWorkforceStaffBarChart: React.FC = () => {
  const data = [
    { name: 'Addis Ababa', prof: 32.5, admin: 16.7 },
    { name: 'Afar', prof: 4.8, admin: 2.1 },
    { name: 'Amhara', prof: 28.2, admin: 14.5 },
    { name: 'Benishangul', prof: 5.1, admin: 2.4 },
    { name: 'Central Ethiopian', prof: 18.2, admin: 9.3 },
    { name: 'Dire Dawa', prof: 6.2, admin: 3.1 },
    { name: 'Gambela', prof: 3.8, admin: 1.9 },
    { name: 'Harari', prof: 5.0, admin: 2.2 },
    { name: 'Oromia', prof: 42.1, admin: 21.6 },
    { name: 'Sidama', prof: 15.6, admin: 7.9 },
    { name: 'Somali', prof: 11.2, admin: 5.8 },
    { name: 'South Ethiopia', prof: 16.5, admin: 8.2 },
    { name: 'South West Ethiopia', prof: 6.8, admin: 3.4 },
    { name: 'Tigray', prof: 22.0, admin: 11.1 },
  ];

  return (
    <div className="w-full relative select-none">
      <svg viewBox="0 0 1000 240" className="w-full h-auto">
        {/* Y Grid lines */}
        {[0, 10, 20, 30, 40, 50].map((val) => {
          const y = 190 - (val / 50) * 150;
          return (
            <g key={val}>
              <line x1="45" y1={y} x2="980" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
              <text x="38" y={y + 4} textAnchor="end" className="text-[10px] fill-on-surface-variant font-medium">{val}k</text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(420, 10)">
          <rect x="0" y="0" width="12" height="12" fill="#2563eb" rx="2" />
          <text x="16" y="10" className="text-[10.5px] fill-on-surface font-medium">Health Professionals</text>
          <rect x="180" y="0" width="12" height="12" fill="#ea580c" rx="2" />
          <text x="196" y="10" className="text-[10.5px] fill-on-surface font-medium">Administrative Staff</text>
        </g>

        {/* Groups */}
        {data.map((d, i) => {
          const groupX = 55 + i * 66;

          const profH = (d.prof / 50) * 150;
          const profY = 190 - profH;

          const adminH = (d.admin / 50) * 150;
          const adminY = 190 - adminH;

          return (
            <g key={d.name}>
              {/* Health Professionals (Blue) */}
              <rect x={groupX} y={profY} width="16" height={profH} fill="#2563eb" rx="2" className="hover:brightness-110 transition-all cursor-pointer" />
              {/* Administrative Staff (Orange) */}
              <rect x={groupX + 18} y={adminY} width="16" height={adminH} fill="#ea580c" rx="2" className="hover:brightness-110 transition-all cursor-pointer" />

              {/* X Axis Label */}
              <text x={groupX + 17} y="210" textAnchor="end" transform={`rotate(-35, ${groupX + 17}, 210)`} className="text-[9.5px] fill-on-surface font-semibold truncate w-20">{d.name}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};



