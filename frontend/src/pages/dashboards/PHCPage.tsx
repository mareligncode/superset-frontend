import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import KpiCard from '../../components/ui/KpiCard';
import { EthiopiaRegionalMap } from '../../components/ui';
import { ChartContainer } from '../../components/charts/ChartContainer';
import { getLocalizedRegionName } from '@/utils/regionUtils';

const PHCPage: React.FC = () => { 
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'mockup' | 'interactive'>('mockup');

  const phcTableData = [
    { Region: 'Addis Ababa', HealthPosts: 124, Coverage: '94.2%', HEW_Active: 480 },
    { Region: 'Oromia', HealthPosts: 890, Coverage: '74.9%', HEW_Active: 3200 },
    { Region: 'Amhara', HealthPosts: 512, Coverage: '78.4%', HEW_Active: 2150 },
    { Region: 'Sidama', HealthPosts: 210, Coverage: '71.3%', HEW_Active: 890 },
    { Region: 'Tigray', HealthPosts: 245, Coverage: '66.8%', HEW_Active: 940 },
  ];

  return (
    <BaseDashboardTemplate
      category="PHC"
      showPrimaryTabs={true}
      showSecondaryTabs={false}
    >
      <div className="flex flex-col gap-5 p-4 bg-slate-50 min-h-full">
        {/* Top Control Bar with View Switcher */}
        <div className="flex items-center justify-between bg-white border border-slate-200/90 rounded-xl px-4 py-2.5 shadow-2xs">
          <div>
            <h1 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {t('phcExecutiveScorecard')}
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              {t('nationalHealthExtensionProgram')}
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200/80">
            <button
              onClick={() => setViewMode('mockup')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 ${
                viewMode === 'mockup'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">dashboard</span>
              {t('officialMockupView')}
            </button>
            <button
              onClick={() => setViewMode('interactive')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 ${
                viewMode === 'interactive'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">analytics</span>
              {t('interactiveMapView')}
            </button>
          </div>
        </div>

        {viewMode === 'mockup' ? (
          <div className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex items-center justify-center p-2">
            <img 
              src="/phc-mock.png" 
              alt={t('phcDashboardMockup')} 
              className="w-full h-auto object-contain max-h-[85vh] rounded"
            />
          </div>
        ) : (
          <div className="space-y-5 animate-fadeIn">
            {/* KPI Metric Summary Grid */}
            <div className="kpi-responsive-grid">
              <KpiCard
                label={t('primaryHealthCareUnits')}
                value="17,542"
                trend="+5.4%"
                trendIsPositive={true}
                target="18,000"
                tooltipText={t('totalOperationalHealthExtension')}
              />
              <KpiCard
                label={t('activeHealthExtensionWorkers')}
                value="39,820"
                trend="+3.1%"
                trendIsPositive={true}
                target="42,000"
                tooltipText={t('certifiedHEWs')}
              />
              <KpiCard
                label={t('universalPHCCoverage')}
                value="74.2%"
                trend="+4.8%"
                trendIsPositive={true}
                target="85.0%"
                tooltipText={t('percentageRuralHouseholds')}
              />
              <KpiCard
                label={t('kebleHouseholdVisitRate')}
                value="68.9%"
                trend="-1.2%"
                trendIsPositive={false}
                target="75.0%"
                tooltipText={t('proportionTargetedRural')}
              />
            </div>

            {/* Regional Map Component */}
            <EthiopiaRegionalMap />

            {/* PHC Performance Chart & Data Table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-12">
                <ChartContainer
                  title={t('primaryCareKebeleCoverage')}
                  subtitle={t('quarterlyPerformanceAnalysis')}
                  tableData={phcTableData}
                >
                  <div className="w-full p-4 flex flex-col items-center justify-center min-h-[220px]">
                    <div className="w-full flex items-end justify-between gap-4 h-40 pt-4 px-6 border-b border-slate-200">
                      {[
                        { label: 'Addis Ababa', val: 94 },
                        { label: 'Dire Dawa', val: 88 },
                        { label: 'Harari', val: 82 },
                        { label: 'Amhara', val: 78 },
                        { label: 'Oromia', val: 75 },
                        { label: 'Sidama', val: 71 },
                        { label: 'Central Eth.', val: 72 },
                        { label: 'Tigray', val: 67 },
                        { label: 'South Eth.', val: 68 },
                        { label: 'Benishangul', val: 61 },
                        { label: 'Gambela', val: 54 },
                        { label: 'Afar', val: 42 },
                        { label: 'Somali', val: 39 },
                      ].map((item) => (
                        <div key={item.label} className="flex flex-col items-center gap-1.5 flex-1 group">
                          <span className="text-[9.5px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.val}%
                          </span>
                          <div
                            className="w-full max-w-[24px] rounded-t-md transition-all duration-300 group-hover:brightness-110"
                            style={{
                              height: `${item.val * 1.4}px`,
                              backgroundColor: item.val >= 75 ? '#059669' : item.val >= 60 ? '#D97706' : '#BA1A1A',
                            }}
                          />
                          <span className="text-[9px] font-semibold text-slate-500 truncate max-w-[40px]" title={getLocalizedRegionName(item.label, t)}>
                            {getLocalizedRegionName(item.label, t)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ChartContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseDashboardTemplate>
  );
};

export default PHCPage;

