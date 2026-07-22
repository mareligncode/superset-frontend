import React, { useState } from 'react';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card, KpiCard } from '@/components/ui';
import {
  SimpleMeasureHorizontalBarChart,
  RatioToMinVerticalBarChart,
  AbsoluteConcentrationIndexVerticalBarChart,
  RelativeConcentrationIndexScatterPlot,
} from '@/components/charts/DashboardCharts';
import { ChartHeaderPills } from '@/components/charts/FamilyPlanningCharts';

const HealthEquityPage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'simple' | 'order'>('simple');

  return (
    <BaseDashboardTemplate
      category="Health Equity"
      showPrimaryTabs={true}
      showSecondaryTabs={false}
    >
      {/* ── Sub-tabs navigation (Level 2) ─────────────────────────── */}
      <div className="flex gap-1 border-b border-outline-variant mb-4 bg-white px-2">
        <button
          onClick={() => setActiveSubTab('simple')}
          className={`px-3 py-2 text-[12.5px] font-semibold transition-colors border-b-2 ${
            activeSubTab === 'simple'
              ? 'text-primary border-primary font-bold'
              : 'text-on-surface-variant border-transparent hover:text-on-surface'
          }`}
        >
          Simple Measures
        </button>
        <button
          onClick={() => setActiveSubTab('order')}
          className={`px-3 py-2 text-[12.5px] font-semibold transition-colors border-b-2 ${
            activeSubTab === 'order'
              ? 'text-primary border-primary font-bold'
              : 'text-on-surface-variant border-transparent hover:text-on-surface'
          }`}
        >
          Order Disproportionality
        </button>
      </div>

      {activeSubTab === 'simple' ? (
        <>
          {/* ── KPI Row: Simple Measures ───────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <KpiCard value="0.72" label="Difference (D)" showIcons={true} />
            <KpiCard value="0.49" label="Estimates" showIcons={true} />
            <KpiCard value="7.32" label="Ratio (R)" showIcons={true} />
          </div>

          {/* ── Charts Grid: Simple Measures ───────────────────────── */}
          <div className="chart-grid">
            <Card
              title="Simple Measure"
              headerAction={
                <ChartHeaderPills
                  legendItems={[{ label: 'Estimates', color: '#2563eb' }]}
                />
              }
            >
              <SimpleMeasureHorizontalBarChart />
            </Card>
            <Card title="Ratio to the minimum" showCardIcons>
              <RatioToMinVerticalBarChart />
            </Card>
          </div>
        </>
      ) : (
        <>
          {/* ── KPI Row: Order Disproportionality ──────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {/* Absolute Concentration Index Card */}
            <div className="bg-white border border-outline-variant rounded-lg p-4 flex items-center justify-between shadow-xs">
              <div className="flex flex-col">
                <span className="text-[12px] text-on-surface-variant font-semibold mb-1">
                  Absolute Concentration Index
                </span>
                <span className="text-4xl font-extrabold text-[#004482] tracking-tight">
                  0.3471
                </span>
              </div>
              <div className="flex flex-col text-slate-300 gap-1 shrink-0">
                <span className="material-symbols-outlined text-[18px] cursor-pointer hover:text-primary transition-colors">arrow_drop_up</span>
                <span className="material-symbols-outlined text-[18px] cursor-pointer hover:text-primary transition-colors">arrow_drop_down</span>
              </div>
            </div>

            {/* Relative Concentration Index Card */}
            <div className="bg-white border border-outline-variant rounded-lg p-4 flex items-center justify-between shadow-xs">
              <div className="flex flex-col">
                <span className="text-[12px] text-on-surface-variant font-semibold mb-1">
                  Relative Concentration Index
                </span>
                <span className="text-4xl font-extrabold text-[#004482] tracking-tight">
                  0.5185
                </span>
              </div>
              <div className="flex flex-col text-slate-300 gap-1 shrink-0">
                <span className="material-symbols-outlined text-[18px] cursor-pointer hover:text-primary transition-colors">arrow_drop_up</span>
                <span className="material-symbols-outlined text-[18px] cursor-pointer hover:text-primary transition-colors">arrow_drop_down</span>
              </div>
            </div>
          </div>

          {/* ── Charts Grid: Order Disproportionality ──────────────── */}
          <div className="chart-grid">
            <Card
              title="Absolute Concentration index"
              headerAction={
                <ChartHeaderPills
                  legendItems={[{ label: 'Estimate Value', color: '#2563eb' }]}
                />
              }
            >
              <AbsoluteConcentrationIndexVerticalBarChart />
            </Card>

            <Card
              title="Relative Concentration Index"
              headerAction={
                <ChartHeaderPills
                  legendItems={[
                    { label: 'AVG(relative_estimate)', color: '#2563eb' },
                    { label: 'Equity Line', color: '#ef4444', type: 'line' },
                  ]}
                />
              }
            >
              <RelativeConcentrationIndexScatterPlot />
            </Card>
          </div>
        </>
      )}
    </BaseDashboardTemplate>
  );
};

export default HealthEquityPage;
