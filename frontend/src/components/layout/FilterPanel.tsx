import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLocalizedRegionName } from '@/utils/regionUtils';


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

interface OrgUnitTreeSelectorProps {
  labelSize?: string;
  labelColor?: string;
  buttonColor?: string;
  showArrows?: boolean;
  checkedRegions: Set<number>;
  toggleRegion: (i: number) => void;
  selectAll: () => void;
  clearAll: () => void;
}

const OrgUnitTreeSelector: React.FC<OrgUnitTreeSelectorProps> = ({
  labelSize = 'text-[11px]',
  labelColor = 'text-slate-500 dark:text-slate-400',
  buttonColor = 'text-blue-600 dark:text-blue-400',
  showArrows = false,
  checkedRegions,
  toggleRegion,
  selectAll,
  clearAll,
}) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  
  const filtered = REGIONS
    .map((name, index) => ({ name, localizedName: getLocalizedRegionName(name, t), index }))
    .filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.localizedName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className={`${labelSize} font-extrabold uppercase tracking-wider ${labelColor}`}>
          {t('orgUnit')}
        </label>
        <div className="flex gap-2">
          <button 
            onClick={selectAll} 
            className={`text-[11px] ${buttonColor} hover:underline font-bold cursor-pointer transition-colors hover:scale-105 active:scale-95`}
          >
            {t('selectAll')}
          </button>
          <button 
            onClick={clearAll} 
            className="text-[11px] text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:underline cursor-pointer font-semibold transition-colors"
          >
            {t('clear')}
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Premium Search input */}
        <div className="flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-slate-50 to-slate-100/60 dark:from-slate-800/80 dark:to-slate-700/60 border-b border-slate-200 dark:border-slate-700">
          <span className="material-symbols-outlined text-[16px] text-blue-600 dark:text-blue-400">search</span>
          <input
            type="text"
            placeholder={t('filterRegions')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-[12px] font-medium text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 p-0 focus:ring-0 focus:outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          )}
        </div>
        <div className="overflow-y-auto overflow-x-hidden custom-scrollbar-thin max-h-56 space-y-0.5 p-2 bg-white dark:bg-slate-800/50">
          {filtered.length === 0 ? (
            <div className="text-[11px] text-slate-400 dark:text-slate-500 text-center py-6 flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-[24px] text-slate-300 dark:text-slate-600">search_off</span>
              <span className="font-semibold">{t('noRegionsFound')}</span>
            </div>
          ) : (
            filtered.map(({ localizedName, index: i }) => (
              <label
                key={localizedName}
                className="flex items-start gap-2 px-2 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 dark:hover:from-blue-950/30 dark:hover:to-sky-950/30 cursor-pointer transition-all duration-150 border border-transparent hover:border-blue-200 dark:hover:border-blue-700/60 group"
              >
                <span className="material-symbols-outlined text-[12px] text-slate-400 dark:text-slate-500 mt-[4px] shrink-0 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded leading-none h-[14px] w-[14px] flex items-center justify-center font-bold group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-colors">
                  add
                </span>
                <span className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={checkedRegions.has(i)}
                    onChange={() => toggleRegion(i)}
                    className="w-4 h-4 shrink-0 mt-[2px] rounded border-slate-300 dark:border-slate-600 accent-blue-600 cursor-pointer"
                  />
                  <span className="text-[12px] text-slate-700 dark:text-slate-300 leading-tight font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                    {localizedName}
                  </span>
                </span>
              </label>
            ))
          )}
        </div>
        {showArrows && (
          <div className="flex justify-between items-center px-6 py-2 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700 select-none">
            <span className="material-symbols-outlined text-[20px] text-slate-400 dark:text-slate-500 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all">arrow_left</span>
            <span className="material-symbols-outlined text-[20px] text-slate-400 dark:text-slate-500 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all">arrow_right</span>
          </div>
        )}
      </div>
    </div>
  );
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen = true,
  onClose,
  className = '',
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [selectedYear, setSelectedYear] = useState('2018');
  const [selectedQuarter, setSelectedQuarter] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [checkedRegions, setCheckedRegions] = useState<Set<number>>(new Set());
  const [scopeOpen, setScopeOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [width, setWidth] = useState(260);
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
        if (newWidth >= 240 && newWidth <= 600) {
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
  const isWorkforce = location.pathname.includes('/health-workforce');
  const isSupplyLogistics = location.pathname.includes('/supply-logistics');
  const isHealthFinancing = location.pathname.includes('/health-financing');
  const isBloodDonation = location.pathname.includes('/blood-donation');
  const isPHEM = location.pathname.includes('/phem');
  const isInfrastructure = location.pathname.includes('/infrastructure');
  const isPHC = location.pathname.includes('/phc');

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
          className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
          onClick={onClose}
        />
      )}

      {/* Panel Wrapper */}
      <div
        ref={panelRef}
        className={`shrink-0 fixed md:relative h-full z-50 transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${className}`}
        style={{ width: collapsed ? '40px' : `min(${width}px, 85vw)` }}
      >
        <aside
          className="bg-white/98 dark:bg-slate-800/98 backdrop-blur-xl border-r border-slate-200/80 dark:border-slate-700/80 flex flex-col w-full h-full overflow-y-auto custom-scrollbar-thin"
          style={{ boxShadow: '4px 0 24px -8px rgba(0,92,184,0.08)' }}
        >
        {/* Premium Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3 shrink-0 border-b border-slate-200 dark:border-slate-700 mb-2 bg-gradient-to-r from-slate-50/80 to-slate-100/50 dark:from-slate-800/80 dark:to-slate-700/50">
          {!collapsed && (
            <span className="text-[13px] font-extrabold text-slate-800 dark:text-slate-200 tracking-wide flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-blue-600 dark:text-blue-400">tune</span>
              {t('filters')}
            </span>
          )}

          <div className="flex items-center gap-2 ml-auto">
            {/* Mobile Close Button */}
            {onClose && (
              <button
                onClick={onClose}
                className="md:hidden px-3 py-2 text-[12px] font-bold text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 bg-white dark:bg-slate-700 hover:bg-red-50 dark:hover:bg-red-900/30 border border-slate-200 dark:border-slate-600 hover:border-red-300 dark:hover:border-red-600 rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md active:scale-95"
                aria-label="Close filters"
                title="Close filters drawer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
                <span>{t('close')}</span>
              </button>
            )}

            {/* Desktop Collapse Button */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex w-7 h-7 items-center justify-center rounded-lg bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 dark:hover:from-blue-950/40 dark:hover:to-sky-950/40 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 border border-slate-200 dark:border-slate-600 transition-all duration-200 hover:shadow-sm active:scale-95"
              aria-label={collapsed ? t('expandFilters') : t('collapseFilters')}
              title={collapsed ? t('expandFilters') : t('collapseFilters')}
            >
              <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${collapsed ? '' : 'rotate-0'}`}>
                {collapsed ? 'chevron_right' : 'chevron_left'}
              </span>
            </button>
          </div>
        </div>

        {!collapsed && (
          <div className="flex flex-col gap-4 px-4 pb-5">
            {isHealthEquity ? (
              // ── PREMIUM HEALTH EQUITY FILTERS ──────────────────────
              <>
                {/* Premium Equity Year Filter */}
                <div>
                  <label className="block text-[12px] font-extrabold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                    Equity Year
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {selectedYear && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/30 dark:to-sky-900/30 text-blue-700 dark:text-blue-300 text-[12px] font-bold rounded-lg border border-blue-200 dark:border-blue-700 shadow-sm">
                        {selectedYear}
                        <button 
                          onClick={() => setSelectedYear('')} 
                          aria-label="Remove year"
                          className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    )}
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150 shadow-sm cursor-pointer"
                    >
                      <option value="">Select year</option>
                      {YEARS.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Premium Equity Dimension Filter */}
                <div>
                  <label className="block text-[12px] font-extrabold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                    Equity Dimension
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {equityDimension && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 text-[12px] font-bold rounded-lg border border-emerald-200 dark:border-emerald-700 shadow-sm">
                        {equityDimension}
                        <button 
                          onClick={() => setEquityDimension('')} 
                          aria-label="Remove dimension"
                          className="hover:bg-emerald-200 dark:hover:bg-emerald-800 rounded-full p-0.5 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    )}
                    <select
                      value={equityDimension}
                      onChange={(e) => setEquityDimension(e.target.value)}
                      className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-150 shadow-sm cursor-pointer"
                    >
                      <option value="">Select dimension</option>
                      <option value="Region">Region</option>
                      <option value="Wealth Quintile">Wealth Quintile</option>
                    </select>
                  </div>
                </div>

                {/* Premium Equity Subgroup Filter */}
                <div>
                  <label className="block text-[12px] font-extrabold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                    Equity Subgroup
                  </label>
                  <select
                    className="text-[13px] font-semibold text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2.5 bg-slate-50 dark:bg-slate-800/50 w-full focus:outline-none cursor-not-allowed shadow-sm"
                    disabled
                  >
                    <option value="">14 options</option>
                  </select>
                </div>

                {/* Premium Equity Indicator Filter */}
                <div>
                  <label className="block text-[12px] font-extrabold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                    Equity Indicator
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {equityIndicator && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-[12px] font-bold rounded-lg border border-purple-200 dark:border-purple-700 shadow-sm max-w-full truncate">
                        {equityIndicator}
                        <button 
                          onClick={() => setEquityIndicator('')} 
                          aria-label="Remove indicator"
                          className="hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-0.5 transition-colors shrink-0"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    )}
                    <select
                      value={equityIndicator}
                      onChange={(e) => setEquityIndicator(e.target.value)}
                      className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-150 shadow-sm cursor-pointer"
                    >
                      <option value="">Select indicator</option>
                      <option value="MAT_Contraceptive Ac...">MAT_Contraceptive Ac...</option>
                    </select>
                  </div>
                </div>

                {/* Premium Filters out of scope accordion */}
                <div className="border-t border-slate-200 dark:border-slate-700 pt-3 mt-1">
                  <button
                    onClick={() => setScopeOpen(!scopeOpen)}
                    className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200 ${
                      scopeOpen
                        ? 'border-2 border-blue-300 dark:border-blue-600 bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-950/40 dark:to-sky-950/40 shadow-sm'
                        : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <span className="text-[12px] text-slate-700 dark:text-slate-300 font-extrabold flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-slate-500 dark:text-slate-400">
                        {scopeOpen ? 'expand_less' : 'expand_more'}
                      </span>
                      Filters out of scope (8)
                    </span>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${
                      scopeOpen 
                        ? 'bg-blue-600 dark:bg-blue-500 text-white' 
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}>
                      8
                    </span>
                  </button>
                  {scopeOpen && (
                    <div className="flex flex-col gap-4 mt-4 px-1 animate-slideIn">
                      {/* Year */}
                      <div>
                        <label className="block text-[11px] font-extrabold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
                          Year
                        </label>
                        <select className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150 shadow-sm cursor-pointer">
                          <option>2018</option>
                        </select>
                      </div>

                      {/* Quarter - Loading State */}
                      <div>
                        <label className="block text-[11px] font-extrabold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
                          Quarter
                        </label>
                        <div className="flex items-center gap-3 px-4 py-4 bg-gradient-to-r from-slate-50 to-slate-100/60 dark:from-slate-800/50 dark:to-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                          <div className="w-4 h-4 rounded-full border-2 border-blue-200 dark:border-blue-700 border-t-blue-600 dark:border-t-blue-400 animate-spin" />
                          <span className="text-[12px] text-slate-600 dark:text-slate-400 font-semibold">Loading filter values</span>
                        </div>
                      </div>

                      {/* Month - Loading State */}
                      <div>
                        <label className="block text-[11px] font-extrabold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
                          Month
                        </label>
                        <div className="flex items-center gap-3 px-4 py-4 bg-gradient-to-r from-slate-50 to-slate-100/60 dark:from-slate-800/50 dark:to-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                          <div className="w-4 h-4 rounded-full border-2 border-blue-200 dark:border-blue-700 border-t-blue-600 dark:border-t-blue-400 animate-spin" />
                          <span className="text-[12px] text-slate-600 dark:text-slate-400 font-semibold">Loading filter values</span>
                        </div>
                      </div>

                      {/* Org Unit tree */}
                      <OrgUnitTreeSelector
                        checkedRegions={checkedRegions}
                        toggleRegion={toggleRegion}
                        selectAll={selectAll}
                        clearAll={clearAll}
                        showArrows={false}
                      />

                      {/* Calendar Year */}
                      <div>
                        <label className="block text-[11px] font-extrabold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
                          Calendar Year
                        </label>
                        <select className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150 shadow-sm cursor-pointer">
                          <option>2017</option>
                        </select>
                      </div>

                      {/* Woed Region */}
                      <div>
                        <label className="block text-[11px] font-extrabold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
                          Woed Region
                        </label>
                        <select className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150 shadow-sm cursor-pointer">
                          <option>14 options</option>
                        </select>
                      </div>

                      {/* Center */}
                      <div>
                        <label className="block text-[11px] font-extrabold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
                          Center
                        </label>
                        <select className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150 shadow-sm cursor-pointer">
                          <option>24 options</option>
                        </select>
                      </div>

                      {/* Wealth Dimension */}
                      <div>
                        <label className="block text-[11px] font-extrabold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
                          Wealth Dimension
                        </label>
                        <select className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150 shadow-sm cursor-pointer">
                          <option>4 options</option>
                        </select>
                      </div>

                      {/* Extra bottom spacing */}
                      <div className="h-2" />
                    </div>
                  )}
                </div>

                {/* Premium Apply Button */}
                <button
                  className="w-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 text-[13px] font-extrabold py-3 rounded-xl cursor-not-allowed shadow-sm"
                  disabled
                >
                  <span className="flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    Apply filters
                  </span>
                </button>
              </>
            ) : isWorkforce || isSupplyLogistics || isHealthFinancing ? (
              // ── PREMIUM WORKFORCE FILTERS ──────────────────────
              <>
                {/* Calendar Year */}
                <div>
                  <label className="block text-[12px] font-extrabold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
                    Calendar Year
                  </label>
                  <select className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150 shadow-sm cursor-pointer">
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
                      <OrgUnitTreeSelector
                        checkedRegions={checkedRegions}
                        toggleRegion={toggleRegion}
                        selectAll={selectAll}
                        clearAll={clearAll}
                        showArrows={false}
                      />

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
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
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
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
                          <option>14 options</option>
                        </select>
                      </div>

                      {/* Center */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Center
                        </label>
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
                          <option>24 options</option>
                        </select>
                      </div>

                      {/* Wealth Dimension */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Wealth Dimension
                        </label>
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
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
            ) : isBloodDonation ? (
              // ── BLOOD DONATION SIDEBAR FILTERS ──────────────────────
              <>
                {/* Blood Region */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                    Blood Region
                  </label>
                  <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
                    <option>14 options</option>
                  </select>
                </div>

                {/* Center */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                    Center
                  </label>
                  <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
                    <option>54 options</option>
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
                      <OrgUnitTreeSelector
                        checkedRegions={checkedRegions}
                        toggleRegion={toggleRegion}
                        selectAll={selectAll}
                        clearAll={clearAll}
                        showArrows={true}
                      />

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
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
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

                      {/* Calendar Year */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Calendar Year
                        </label>
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
                          <option>2017</option>
                        </select>
                      </div>

                      {/* Wealth Dimension */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Wealth Dimension
                        </label>
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
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
            ) : isPHEM ? (
              // ── PHEM SIDEBAR FILTERS ──────────────────────
              <>
                {/* PHEM Diseases */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                    PHEM Diseases
                  </label>
                  <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
                    <option>4 options</option>
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
                      <OrgUnitTreeSelector
                        checkedRegions={checkedRegions}
                        toggleRegion={toggleRegion}
                        selectAll={selectAll}
                        clearAll={clearAll}
                        showArrows={true}
                      />

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
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
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

                      {/* Calendar Year */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Calendar Year
                        </label>
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
                          <option>2017</option>
                        </select>
                      </div>

                      {/* Blood Region */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Blood Region
                        </label>
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
                          <option>14 options</option>
                        </select>
                      </div>

                      {/* Center */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Center
                        </label>
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
                          <option>54 options</option>
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
            ) : isInfrastructure ? (
              // ── INFRASTRUCTURE SIDEBAR FILTERS ──────────────────────
              <>
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
                      <OrgUnitTreeSelector
                        checkedRegions={checkedRegions}
                        toggleRegion={toggleRegion}
                        selectAll={selectAll}
                        clearAll={clearAll}
                        showArrows={true}
                      />

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
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
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

                      {/* Calendar Year */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Calendar Year
                        </label>
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
                          <option>2017</option>
                        </select>
                      </div>

                      {/* Blood Region */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Blood Region
                        </label>
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
                          <option>14 options</option>
                        </select>
                      </div>

                      {/* Center */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Center
                        </label>
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
                          <option>54 options</option>
                        </select>
                      </div>

                      {/* PHEM Diseases */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          PHEM Diseases
                        </label>
                        <select className="text-[11px] text-slate-700 border border-slate-300 rounded px-1.5 py-1 bg-white w-full focus:outline-none focus:border-blue-400">
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
            ) : isPHC ? (
              // ── PHC SIDEBAR FILTERS ──────────────────────
              <div className="flex flex-col gap-4">
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
                  <div className="bg-white border border-slate-300 rounded overflow-hidden flex flex-col">
                    <div className="overflow-y-auto overflow-x-hidden custom-scrollbar max-h-96 space-y-0.5 p-1">
                      {REGIONS.map((region, i) => (
                        <label
                          key={region}
                          className="flex items-start gap-1.5 px-1 py-1 rounded hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
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
                </div>

                {/* Equity Year */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                    Equity Year
                  </label>
                  <div className="flex items-center gap-3 px-3 py-4 bg-slate-50/50 rounded border border-slate-200">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-100 border-t-blue-400 animate-spin" />
                    <span className="text-[10px] text-slate-600 font-medium">Loading filter values</span>
                  </div>
                </div>

                {/* Equity Dimension */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                    Equity Dimension
                  </label>
                  <div className="flex items-center gap-3 px-3 py-4 bg-slate-50/50 rounded border border-slate-200">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-100 border-t-blue-400 animate-spin" />
                    <span className="text-[10px] text-slate-600 font-medium">Loading filter values</span>
                  </div>
                </div>

                {/* Equity Subgroup */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                    Equity Subgroup
                  </label>
                  <div className="flex items-center gap-3 px-3 py-4 bg-slate-50/50 rounded border border-slate-200">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-100 border-t-blue-400 animate-spin" />
                    <span className="text-[10px] text-slate-600 font-medium">Loading filter values</span>
                  </div>
                </div>

                {/* Equity Indicator */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                    Equity Indicator
                  </label>
                  <div className="flex items-center gap-3 px-3 py-4 bg-slate-50/50 rounded border border-slate-200">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-100 border-t-blue-400 animate-spin" />
                    <span className="text-[10px] text-slate-600 font-medium">Loading filter values</span>
                  </div>
                </div>

                {/* Calendar Year */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                    Calendar Year
                  </label>
                  <div className="flex items-center gap-3 px-3 py-4 bg-slate-50/50 rounded border border-slate-200">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-100 border-t-blue-400 animate-spin" />
                    <span className="text-[10px] text-slate-600 font-medium">Loading filter values</span>
                  </div>
                </div>

                {/* Blood Region */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                    Blood Region
                  </label>
                  <div className="flex items-center gap-3 px-3 py-4 bg-slate-50/50 rounded border border-slate-200">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-100 border-t-blue-400 animate-spin" />
                    <span className="text-[10px] text-slate-600 font-medium">Loading filter values</span>
                  </div>
                </div>

                {/* Center */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                    Center
                  </label>
                  <div className="flex items-center gap-3 px-3 py-4 bg-slate-50/50 rounded border border-slate-200">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-100 border-t-blue-400 animate-spin" />
                    <span className="text-[10px] text-slate-600 font-medium">Loading filter values</span>
                  </div>
                </div>

                {/* PHEM Diseases */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                    PHEM Diseases
                  </label>
                  <div className="flex items-center gap-3 px-3 py-4 bg-slate-50/50 rounded border border-slate-200">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-100 border-t-blue-400 animate-spin" />
                    <span className="text-[10px] text-slate-600 font-medium">Loading filter values</span>
                  </div>
                </div>

                {/* Disabled Apply button */}
                <button
                  className="w-full bg-slate-100 text-slate-400 border border-slate-200 text-[12px] font-semibold py-1.5 rounded cursor-not-allowed mt-2"
                  disabled
                >
                  Apply filters
                </button>
              </div>
            ) : (
              // ── STANDARD SIDEBAR FILTERS ──────────────────────────
              <>
                {/* Year filter — tag style */}
                <div>
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                    {t('year')}
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
                      <option value="">{t('selectYear')}</option>
                      {YEARS.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quarter */}
                <div>
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
                    {t('quarter')}
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
                    {t('month')}
                  </label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="text-[12px] text-on-surface-variant border border-outline-variant rounded px-1.5 py-0.5 bg-white w-full focus:outline-none focus:border-primary"
                  >
                    <option value="">11 options</option>
                    {['meskerem','tikimt','hidar','tahsas','tir','yekatit','megabit','miazia','ginbot','sene','hamle','nehase'].map((m) => (
                      <option key={m} value={m}>{t(m)}</option>
                    ))}
                  </select>
                </div>

                {/* Org Unit tree */}
                <OrgUnitTreeSelector
                  labelSize="text-[11px]"
                  labelColor="text-on-surface-variant"
                  buttonColor="text-primary"
                  checkedRegions={checkedRegions}
                  toggleRegion={toggleRegion}
                  selectAll={selectAll}
                  clearAll={clearAll}
                />

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
                  {t('apply')}
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
              {t('clear')}
            </button>
          </div>
        )}
        </aside>

        {/* Resizer Handle */}
        {!collapsed && (
          <div
            className={`absolute top-0 right-0 w-[5px] h-full cursor-col-resize z-[60] transition-all flex items-center justify-center ${
              isResizing ? 'bg-primary' : 'bg-transparent hover:bg-slate-200'
            }`}
            style={{ right: '-2.5px' }}
            onMouseDown={startResizing}
          >
            <div className="w-[1.5px] h-12 bg-slate-300 rounded-full"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default FilterPanel;
