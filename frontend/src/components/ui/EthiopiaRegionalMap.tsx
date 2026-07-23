import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getLocalizedRegionName } from '@/utils/regionUtils';

export interface RegionData {
  id: string;
  name: string;
  code: string;
  coverage: number; // 0 - 100
  facilities: number;
  reportingRate: number;
  status: 'optimal' | 'warning' | 'critical';
}

const DEFAULT_REGIONS: RegionData[] = [
  { id: '1', name: 'Addis Ababa', code: 'AA', coverage: 94.2, facilities: 124, reportingRate: 98.5, status: 'optimal' },
  { id: '2', name: 'Afar', code: 'AF', coverage: 42.8, facilities: 68, reportingRate: 74.1, status: 'critical' },
  { id: '3', name: 'Amhara', code: 'AM', coverage: 78.4, facilities: 512, reportingRate: 91.2, status: 'optimal' },
  { id: '4', name: 'Benishangul-Gumuz', code: 'BG', coverage: 61.5, facilities: 89, reportingRate: 83.0, status: 'warning' },
  { id: '5', name: 'Dire Dawa', code: 'DD', coverage: 88.0, facilities: 45, reportingRate: 95.4, status: 'optimal' },
  { id: '6', name: 'Gambela', code: 'GA', coverage: 54.3, facilities: 52, reportingRate: 79.2, status: 'warning' },
  { id: '7', name: 'Harari', code: 'HA', coverage: 82.1, facilities: 38, reportingRate: 93.6, status: 'optimal' },
  { id: '8', name: 'Oromia', code: 'OR', coverage: 74.9, facilities: 890, reportingRate: 89.8, status: 'optimal' },
  { id: '9', name: 'Sidama', code: 'SI', coverage: 71.3, facilities: 210, reportingRate: 87.5, status: 'warning' },
  { id: '10', name: 'Somali', code: 'SO', coverage: 39.6, facilities: 185, reportingRate: 68.4, status: 'critical' },
  { id: '11', name: 'South Ethiopia', code: 'SE', coverage: 68.7, facilities: 340, reportingRate: 85.2, status: 'warning' },
  { id: '12', name: 'South West Ethiopia', code: 'SW', coverage: 63.4, facilities: 160, reportingRate: 81.9, status: 'warning' },
  { id: '13', name: 'Central Ethiopia', code: 'CE', coverage: 72.0, facilities: 290, reportingRate: 88.1, status: 'optimal' },
  { id: '14', name: 'Tigray', code: 'TG', coverage: 66.8, facilities: 245, reportingRate: 82.7, status: 'warning' },
];

export const EthiopiaRegionalMap: React.FC<{
  onSelectRegion?: (regionName: string) => void;
}> = ({ onSelectRegion }) => {
  const { t } = useTranslation();
  const [selectedMetric, setSelectedMetric] = useState<'coverage' | 'reportingRate'>('coverage');
  const [activeRegion, setActiveRegion] = useState<RegionData | null>(DEFAULT_REGIONS[0]);

  const getColor = (value: number) => {
    if (value >= 75) return '#059669'; // Emerald
    if (value >= 60) return '#D97706'; // Amber
    return '#E11D48'; // Crimson
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md">
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[20px]">map</span>
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
              {t('federalRegionalPerformanceMap')}
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            {t('federalRegionalPerformanceMapSubtitle')}
          </p>
        </div>

        {/* Metric Switcher & Legend */}
        <div className="flex items-center gap-3">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as 'coverage' | 'reportingRate')}
            className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="coverage" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200">{t('pncCoverageRate')}</option>
            <option value="reportingRate" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200">{t('dhis2ReportingRate')}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Visual Map Representation Grid */}
        <div className="lg:col-span-8 bg-slate-50/70 dark:bg-slate-800/40 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {DEFAULT_REGIONS.map((r) => {
              const isActive = activeRegion?.id === r.id;
              const val = r[selectedMetric];
              const localized = getLocalizedRegionName(r.name, t);
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    setActiveRegion(r);
                    onSelectRegion?.(r.name);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-20 ${
                    isActive
                      ? 'ring-2 ring-blue-500 border-blue-500 shadow-md bg-white dark:bg-slate-800 scale-[1.02]'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 hover:border-blue-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 font-mono">
                      {r.code}
                    </span>
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getColor(val) }}
                    />
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">
                      {localized}
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                      {val}%
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Region Detailed Inspector Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-4 sm:p-5 shadow-lg border border-slate-700 flex flex-col justify-between min-h-[280px] sm:min-h-[300px]">
          {activeRegion ? (
            <div>
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-3 mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                    {t('regionProfile')}
                  </span>
                  <h4 className="text-base sm:text-lg font-black tracking-tight text-white mt-0.5">
                    {getLocalizedRegionName(activeRegion.name, t)}
                  </h4>
                </div>
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                  style={{
                    backgroundColor: `${getColor(activeRegion[selectedMetric])}20`,
                    color: getColor(activeRegion[selectedMetric]),
                    borderColor: `${getColor(activeRegion[selectedMetric])}60`,
                  }}
                >
                  {activeRegion[selectedMetric] >= 75 ? t('optimal') : activeRegion[selectedMetric] >= 60 ? t('warning') : t('critical')}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60 flex items-center justify-between">
                  <span className="text-slate-400 font-medium">{t('pncCoverageRate')}</span>
                  <span className="text-base font-black text-emerald-400">{activeRegion.coverage}%</span>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60 flex items-center justify-between">
                  <span className="text-slate-400 font-medium">{t('dhis2Reporting')}</span>
                  <span className="text-base font-black text-blue-400">{activeRegion.reportingRate}%</span>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60 flex items-center justify-between">
                  <span className="text-slate-400 font-medium">{t('activeFacilities')}</span>
                  <span className="text-base font-black text-white">{activeRegion.facilities} {t('sites')}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-700/80 flex items-center justify-between text-[10px] text-slate-400">
                <span>{t('mohGisSync')}</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {t('liveSync')}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-xs">
              {t('clickRegionForDetails')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EthiopiaRegionalMap;
