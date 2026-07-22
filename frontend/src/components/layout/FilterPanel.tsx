import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export interface FilterPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

const REGIONS = [
  'Addis Ababa City Administration',
  'Afar Region',
  'Amhara Region',
  'Benishangul Gumuz Region',
  'Central Ethiopian Region',
  'Dire Dawa City Administration',
  'Gambela Region',
  'Harari Region',
  'Oromia Region',
  'Sidama Region',
  'Somali Region',
  'South West Ethiopia Region',
  'Southern Nations Region',
  'Tigray Region',
];

const YEARS = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017'];

const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen = true,
  onClose,
  className = '',
}) => {
  const location = useLocation();
  const [selectedYear, setSelectedYear] = useState('2018');
  const [selectedQuarter, setSelectedQuarter] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [checkedRegions, setCheckedRegions] = useState<Set<number>>(new Set());
  const [scopeOpen, setScopeOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [width, setWidth] = useState(152);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const startResizing = useCallback((e: React.MouseEvent) => {
    if (collapsed) return;
    e.preventDefault();
    setIsResizing(true);
  }, [collapsed]);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing && panelRef.current) {
        const rect = panelRef.current.getBoundingClientRect();
        const newWidth = e.clientX - rect.left;
        if (newWidth >= 152 && newWidth <= 600) {
          setWidth(newWidth);
        }
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  useEffect(() => {
    if (isResizing) {
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    } else {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }
  }, [isResizing]);

  // Health Equity Specific States
  const [equityDimension, setEquityDimension] = useState('Region');
  const [equityIndicator, setEquityIndicator] = useState('MAT_Contraceptive Ac...');

  const isHealthEquity = location.pathname.includes('/health-equity');
  const isWorkforce = location.pathname.includes('/workforce');

  const toggleRegion = (i: number) => {
    setCheckedRegions((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const selectAll = () => setCheckedRegions(new Set(REGIONS.map((_, i) => i)));
  const clearAll = () => setCheckedRegions(new Set());

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Panel Wrapper */}
      <div
        ref={panelRef}
        className={`shrink-0 fixed md:relative h-full z-50 transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${className}`}
        style={{ width: collapsed ? '40px' : `${width}px` }}
      >
        <aside
          className="bg-white border-r border-outline-variant flex flex-col w-full h-full overflow-y-auto custom-scrollbar"
          style={{ boxShadow: '2px 0 6px rgba(0,0,0,0.04)' }}
        >
        {/* Header row */}
        <div className="flex items-center justify-between px-3 pt-3 pb-2 shrink-0">
          {!collapsed && (
            <span className="text-[12px] font-semibold text-slate-800 tracking-wide">
              Filters and controls
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto w-6 h-6 flex items-center justify-center rounded bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 border border-slate-200 transition-all hover:shadow-sm"
            aria-label={collapsed ? 'Expand filters' : 'Collapse filters'}
            title={collapsed ? 'Expand filters' : 'Collapse filters'}
          >
            <span className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${collapsed ? '' : 'rotate-0'}`}>
              {collapsed ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
        </div>

        {!collapsed && (
          <div className="flex flex-col gap-3 px-3 pb-4">
            {isHealthEquity ? (
              // ── HEALTH EQUITY SIDEBAR FILTERS ──────────────────────
              <>
                {/* Equity Year */}
                <div>
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                    Equity Year
                  </label>
                  <div className="flex items-center gap-1 flex-wrap">
                    {selectedYear && (
                      <span className="filter-tag">
                        {selectedYear}
                        <button onClick={() => setSelectedYear('')} aria-label="Remove year">×</button>
                      </span>
                    )}
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="text-[12px] text-on-surface-variant border border-outline-variant rounded px-1 py-0.5 bg-white w-full mt-1 focus:outline-none focus:border-primary"
                    >
                      <option value="">Select year</option>
                      {YEARS.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Equity Dimension */}
                <div>
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                    Equity Dimension
                  </label>
                  <div className="flex items-center gap-1 flex-wrap">
                    {equityDimension && (
                      <span className="filter-tag">
                        {equityDimension}
                        <button onClick={() => setEquityDimension('')} aria-label="Remove dimension">×</button>
                      </span>
                    )}
                    <select
                      value={equityDimension}
                      onChange={(e) => setEquityDimension(e.target.value)}
                      className="text-[12px] text-on-surface-variant border border-outline-variant rounded px-1 py-0.5 bg-white w-full mt-1 focus:outline-none focus:border-primary"
                    >
                      <option value="">Select dimension</option>
                      <option value="Region">Region</option>
                      <option value="Wealth Quintile">Wealth Quintile</option>
                    </select>
                  </div>
                </div>

                {/* Equity Subgroup */}
                <div>
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                    Equity Subgroup
                  </label>
                  <select
                    className="text-[12px] text-on-surface-variant border border-outline-variant rounded px-1 py-0.5 bg-white w-full focus:outline-none focus:border-primary"
                    disabled
                  >
                    <option value="">14 options</option>
                  </select>
                </div>

                {/* Equity Indicator */}
                <div>
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                    Equity Indicator
                  </label>
                  <div className="flex items-center gap-1 flex-wrap">
                    {equityIndicator && (
                      <span className="filter-tag text-[10px] truncate max-w-full">
                        {equityIndicator}
                        <button onClick={() => setEquityIndicator('')} aria-label="Remove indicator">×</button>
                      </span>
                    )}
                    <select
                      value={equityIndicator}
                      onChange={(e) => setEquityIndicator(e.target.value)}
                      className="text-[12px] text-on-surface-variant border border-outline-variant rounded px-1 py-0.5 bg-white w-full mt-1 focus:outline-none focus:border-primary"
                    >
                      <option value="">Select indicator</option>
                      <option value="MAT_Contraceptive Ac...">MAT_Contraceptive Ac...</option>
                    </select>
                  </div>
                </div>

                {/* Filters out of scope (8) */}
                <div className="border-t border-outline-variant pt-2">
                  <button
                    onClick={() => setScopeOpen(!scopeOpen)}
                    className={`flex items-center justify-between w-full text-left px-2 py-1.5 rounded transition-all ${
                      scopeOpen
                        ? 'border border-blue-400 bg-blue-50/30'
                        : 'border border-transparent hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-[11px] text-slate-700 font-semibold">
                      Filters out of scope (8)
                    </span>
                    <span className="material-symbols-outlined text-[14px] text-slate-500 transition-transform" style={{ transform: scopeOpen ? 'rotate(180deg)' : '' }}>
                      expand_more
                    </span>
                  </button>
                  {scopeOpen && (
                    <div className="flex flex-col gap-3 mt-3 px-1">
                      {/* Year */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Year
                        </label>
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
                          <option>2018</option>
                        </select>
                      </div>

                      {/* Quarter */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Quarter
                        </label>
                        <div className="flex items-center gap-3 px-3 py-4 bg-slate-50/50 rounded border border-slate-200">
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-100 border-t-blue-400 animate-spin" />
                          <span className="text-[10px] text-slate-600 font-medium">Loading filter values</span>
                        </div>
                      </div>

                      {/* Month */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Month
                        </label>
                        <div className="flex items-center gap-3 px-3 py-4 bg-slate-50/50 rounded border border-slate-200">
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-100 border-t-blue-400 animate-spin" />
                          <span className="text-[10px] text-slate-600 font-medium">Loading filter values</span>
                        </div>
                      </div>

                      {/* Org Unit tree */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] font-semibold text-slate-500">
                            Org Unit
                          </label>
                          <div className="flex gap-2">
                            <button onClick={selectAll} className="text-[10px] text-blue-600 hover:underline font-medium">
                              Select all
                            </button>
                            <button onClick={clearAll} className="text-[10px] text-slate-400 hover:underline">
                              Clear
                            </button>
                          </div>
                        </div>
                        <div className="bg-white border border-slate-300 rounded overflow-y-auto custom-scrollbar max-h-48 space-y-0.5 p-1">
                          {REGIONS.map((region, i) => (
                            <label
                              key={region}
                              className="flex items-start gap-1.5 px-1 py-1 rounded hover:bg-slate-50 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[10px] text-slate-600 mt-[3px] shrink-0 bg-slate-100 border border-slate-300 rounded-[2px] leading-none h-[12px] w-[12px] flex items-center justify-center font-bold">
                                add
                              </span>
                              <span className="flex items-start gap-1.5">
                                <input
                                  type="checkbox"
                                  checked={checkedRegions.has(i)}
                                  onChange={() => toggleRegion(i)}
                                  className="w-3 h-3 shrink-0 mt-[2px] rounded border-slate-300"
                                />
                                <span className="text-[10px] text-slate-700 leading-tight">
                                  {region}
                                </span>
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Calendar Year */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Calendar Year
                        </label>
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
                          <option>2017</option>
                        </select>
                      </div>

                      {/* Woed Region */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Woed Region
                        </label>
                        <select className="text-[11px] text-slate-400 border border-slate-200 rounded px-1.5 py-1 bg-slate-50 w-full" disabled>
                          <option>14 options</option>
                        </select>
                      </div>

                      {/* Center */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Center
                        </label>
                        <select className="text-[11px] text-slate-400 border border-slate-200 rounded px-1.5 py-1 bg-slate-50 w-full" disabled>
                          <option>24 options</option>
                        </select>
                      </div>

                      {/* Wealth Dimension */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Wealth Dimension
                        </label>
                        <select className="text-[11px] text-slate-400 border border-slate-200 rounded px-1.5 py-1 bg-slate-50 w-full" disabled>
                          <option>4 options</option>
                        </select>
                      </div>

                      {/* Extra bottom spacing */}
                      <div className="h-2" />
                    </div>
                  )}
                </div>

                {/* Disabled Apply button */}
                <button
                  className="w-full bg-slate-100 text-slate-400 border border-slate-200 text-[12px] font-semibold py-1.5 rounded cursor-not-allowed"
                  disabled
                >
                  Apply filters
                </button>
              </>
            ) : isWorkforce ? (
              // ── WORKFORCE SIDEBAR FILTERS ──────────────────────
              <>
                {/* Calendar Year */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                    Calendar Year
                  </label>
                  <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
                    <option>2017</option>
                  </select>
                </div>

                {/* Filters out of scope (10) */}
                <div className="pt-2">
                  <button
                    onClick={() => setScopeOpen(!scopeOpen)}
                    className={`flex items-center justify-between w-full text-left px-2 py-1.5 rounded transition-all ${
                      scopeOpen
                        ? 'border border-blue-400 bg-blue-50/30'
                        : 'border border-transparent hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-[11px] text-slate-700 font-semibold">
                      Filters out of scope (10)
                    </span>
                    <span className="material-symbols-outlined text-[14px] text-slate-500 transition-transform" style={{ transform: scopeOpen ? 'rotate(180deg)' : '' }}>
                      expand_more
                    </span>
                  </button>
                  {scopeOpen && (
                    <div className="flex flex-col gap-3 mt-3 px-1">
                      {/* Year */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Year
                        </label>
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
                          <option>2018</option>
                        </select>
                      </div>

                      {/* Quarter */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Quarter
                        </label>
                        <div className="flex items-center gap-3 px-3 py-4 bg-slate-50/50 rounded border border-slate-200">
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-100 border-t-blue-400 animate-spin" />
                          <span className="text-[10px] text-slate-600 font-medium">Loading filter values</span>
                        </div>
                      </div>

                      {/* Month */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Month
                        </label>
                        <div className="flex items-center gap-3 px-3 py-4 bg-slate-50/50 rounded border border-slate-200">
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-100 border-t-blue-400 animate-spin" />
                          <span className="text-[10px] text-slate-600 font-medium">Loading filter values</span>
                        </div>
                      </div>

                      {/* Org Unit tree */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] font-semibold text-slate-500">
                            Org Unit
                          </label>
                          <div className="flex gap-2">
                            <button onClick={selectAll} className="text-[10px] text-blue-600 hover:underline font-medium">
                              Select all
                            </button>
                            <button onClick={clearAll} className="text-[10px] text-slate-400 hover:underline">
                              Clear
                            </button>
                          </div>
                        </div>
                        <div className="bg-white border border-slate-300 rounded overflow-y-auto custom-scrollbar max-h-48 space-y-0.5 p-1">
                          {REGIONS.map((region, i) => (
                            <label
                              key={region}
                              className="flex items-start gap-1.5 px-1 py-1 rounded hover:bg-slate-50 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[10px] text-slate-600 mt-[3px] shrink-0 bg-slate-100 border border-slate-300 rounded-[2px] leading-none h-[12px] w-[12px] flex items-center justify-center font-bold">
                                add
                              </span>
                              <span className="flex items-start gap-1.5">
                                <input
                                  type="checkbox"
                                  checked={checkedRegions.has(i)}
                                  onChange={() => toggleRegion(i)}
                                  className="w-3 h-3 shrink-0 mt-[2px] rounded border-slate-300"
                                />
                                <span className="text-[10px] text-slate-700 leading-tight">
                                  {region}
                                </span>
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Equity Year */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Equity Year
                        </label>
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
                          <option>2018</option>
                        </select>
                      </div>

                      {/* Equity Dimension */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Equity Dimension
                        </label>
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
                          <option>Region</option>
                        </select>
                      </div>

                      {/* Equity Subgroup */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Equity Subgroup
                        </label>
                        <select className="text-[11px] text-slate-400 border border-slate-200 rounded px-1.5 py-1 bg-slate-50 w-full" disabled>
                          <option>14 options</option>
                        </select>
                      </div>

                      {/* Equity Indicator */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Equity Indicator
                        </label>
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
                          <option>MAT_Contraceptive A...</option>
                        </select>
                      </div>

                      {/* Woed Region */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Woed Region
                        </label>
                        <select className="text-[11px] text-slate-400 border border-slate-200 rounded px-1.5 py-1 bg-slate-50 w-full" disabled>
                          <option>14 options</option>
                        </select>
                      </div>

                      {/* Center */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Center
                        </label>
                        <select className="text-[11px] text-slate-400 border border-slate-200 rounded px-1.5 py-1 bg-slate-50 w-full" disabled>
                          <option>24 options</option>
                        </select>
                      </div>

                      {/* Wealth Dimension */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Wealth Dimension
                        </label>
                        <select className="text-[11px] text-slate-400 border border-slate-200 rounded px-1.5 py-1 bg-slate-50 w-full" disabled>
                          <option>4 options</option>
                        </select>
                      </div>

                      {/* Extra bottom spacing */}
                      <div className="h-2" />
                    </div>
                  )}
                </div>

                {/* Disabled Apply button */}
                <button
                  className="w-full bg-slate-100 text-slate-400 border border-slate-200 text-[12px] font-semibold py-1.5 rounded cursor-not-allowed mt-2"
                  disabled
                >
                  Apply filters
                </button>
              </>
            ) : (
              // ── STANDARD SIDEBAR FILTERS ──────────────────────────
              <>
                {/* Year filter — tag style */}
                <div>
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                    Year
                  </label>
                  <div className="flex items-center gap-1 flex-wrap">
                    {selectedYear && (
                      <span className="filter-tag">
                        {selectedYear}
                        <button onClick={() => setSelectedYear('')} aria-label="Remove year">×</button>
                      </span>
                    )}
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="text-[12px] text-on-surface-variant border border-outline-variant rounded px-1 py-0.5 bg-white w-full mt-1 focus:outline-none focus:border-primary"
                    >
                      <option value="">Select year</option>
                      {YEARS.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quarter */}
                <div>
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                    Quarter
                  </label>
                  <select
                    value={selectedQuarter}
                    onChange={(e) => setSelectedQuarter(e.target.value)}
                    className="text-[12px] text-on-surface-variant border border-outline-variant rounded px-1 py-0.5 bg-white w-full focus:outline-none focus:border-primary"
                  >
                    <option value="">4 options</option>
                    <option value="q1">Q1</option>
                    <option value="q2">Q2</option>
                    <option value="q3">Q3</option>
                    <option value="q4">Q4</option>
                  </select>
                </div>

                {/* Month */}
                <div>
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                    Month
                  </label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="text-[12px] text-on-surface-variant border border-outline-variant rounded px-1 py-0.5 bg-white w-full focus:outline-none focus:border-primary"
                  >
                    <option value="">11 options</option>
                    {['Meskerem','Tikimt','Hidar','Tahsas','Tir','Yekatit','Megabit','Miazia','Ginbot','Sene','Hamle','Nehase'].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* Org Unit tree */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
                      Org Unit
                    </label>
                    <div className="flex gap-2">
                      <button onClick={selectAll} className="text-[10px] text-primary hover:underline font-medium">
                        Select all
                      </button>
                      <button onClick={clearAll} className="text-[10px] text-on-surface-variant hover:underline">
                        Clear
                      </button>
                    </div>
                  </div>

                  <div className="bg-surface-container-low border border-outline-variant rounded overflow-y-auto custom-scrollbar max-h-52 space-y-0.5 p-1">
                    {REGIONS.map((region, i) => (
                      <label
                        key={region}
                        className="flex items-start gap-1.5 px-1 py-0.5 rounded hover:bg-surface-container cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[13px] text-outline mt-0.5 shrink-0">
                          {checkedRegions.has(i) ? 'indeterminate_check_box' : 'add_box'}
                        </span>
                        <span className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            checked={checkedRegions.has(i)}
                            onChange={() => toggleRegion(i)}
                            className="w-3 h-3 shrink-0 mt-0.5"
                          />
                          <span className="text-[11px] text-on-surface leading-tight">
                            {region}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filters out of scope */}
                <div className="border-t border-outline-variant pt-2">
                  <button
                    onClick={() => setScopeOpen(!scopeOpen)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <span className="text-[11px] text-on-surface-variant font-medium">
                      Filters out of scope (II)
                    </span>
                    <span className="material-symbols-outlined text-[14px] text-outline transition-transform" style={{ transform: scopeOpen ? 'rotate(180deg)' : '' }}>
                      expand_more
                    </span>
                  </button>
                  {scopeOpen && (
                    <p className="text-[11px] text-on-surface-variant mt-1 leading-relaxed">
                      Extended regional data filters and demographic overlays.
                    </p>
                  )}
                </div>

                {/* Apply button */}
                <button className="w-full bg-primary text-on-primary text-[12px] font-semibold py-1.5 rounded hover:bg-primary/90 transition-colors">
                  Apply filters
                </button>
              </>
            )}

            {/* Clear All Link */}
            <button
              onClick={() => {
                setSelectedYear('2018');
                setSelectedQuarter('');
                setSelectedMonth('');
                setCheckedRegions(new Set());
                setEquityDimension('Region');
                setEquityIndicator('MAT_Contraceptive Ac...');
              }}
              className="text-[11px] text-on-surface-variant hover:text-primary transition-colors text-center w-full mt-1 hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
        </aside>

        {/* Resizer Handle */}
        {!collapsed && (
          <div
            className={`absolute top-0 right-0 w-2 h-full cursor-col-resize z-[60] transition-colors ${
              isResizing ? 'bg-blue-500' : 'bg-transparent hover:bg-blue-400/50'
            }`}
            style={{ right: '-2px' }}
            onMouseDown={startResizing}
          />
        )}
      </div>
    </>
  );
};

export default FilterPanel;
