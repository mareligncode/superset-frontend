import React, { useState } from 'react';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import KpiCard from '@/components/ui/KpiCard';
import { ChartContainer } from '@/components/charts/ChartContainer';
import {
  SimpleMeasureHorizontalBarChart,
  RatioToMinVerticalBarChart,
  AbsoluteConcentrationIndexVerticalBarChart,
  RelativeConcentrationIndexScatterPlot,
} from '@/components/charts/DashboardCharts';

const HealthEquityPage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'simple' | 'order'>('simple');

  const equityData = [
    { Indicator: 'Difference (D)', Value: '0.72', Status: 'Optimal', Baseline: '0.65' },
    { Indicator: 'Estimates (E)', Value: '0.49', Status: 'Warning', Baseline: '0.50' },
    { Indicator: 'Ratio (R)', Value: '7.32', Status: 'Critical', Baseline: '5.00' },
  ];

  return (
    <BaseDashboardTemplate
      category="Health Equity"
      showPrimaryTabs={true}
      showSecondaryTabs={false}
    >
      {/* ── Sub-tabs navigation (Level 2) ─────────────────────────── */}
      <div className="flex gap-1 border-b border-slate-200 dark:border-slate-700 mb-5 bg-white dark:bg-slate-800 px-2 rounded-t-lg">
        <button
          onClick={() => setActiveSubTab('simple')}
          className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 ${
            activeSubTab === 'simple'
              ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Simple Measures
        </button>
        <button
          onClick={() => setActiveSubTab('order')}
          className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 ${
            activeSubTab === 'order'
              ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Order Disproportionality
        </button>
      </div>

      {activeSubTab === 'simple' ? (
        <div className="space-y-5 animate-fadeIn">
          {/* ── KPI Row: Simple Measures ───────────────────────────── */}
          <div className="kpi-responsive-grid">
            <KpiCard
              value="0.72"
              label="Difference (D)"
              trend="+2.4%"
              trendIsPositive={true}
              target="0.65"
              tooltipText="Absolute difference between highest and lowest regional equity estimates."
            />
            <KpiCard
              value="0.49"
              label="Estimates (E)"
              trend="-1.1%"
              trendIsPositive={false}
              target="0.50"
              tooltipText="National mean coverage estimate across all sub-groups."
            />
            <KpiCard
              value="7.32"
              label="Ratio (R)"
              trend="+4.8%"
              trendIsPositive={false}
              target="5.00"
              tooltipText="Relative ratio of highest performing group to lowest performing group."
            />
          </div>

          {/* ── Charts Grid: Simple Measures ───────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ChartContainer
              title="Simple Measure Distribution"
              subtitle="Horizontal breakdown of coverage estimates across equity strata."
              tableData={equityData}
            >
              <SimpleMeasureHorizontalBarChart />
            </ChartContainer>

            <ChartContainer
              title="Ratio to the Minimum"
              subtitle="Relative disparity ratio calculated against the lowest performing Kebele benchmark."
            >
              <RatioToMinVerticalBarChart />
            </ChartContainer>
          </div>
        </div>
      ) : (
        <div className="space-y-5 animate-fadeIn">
          {/* ── KPI Row: Order Disproportionality ──────────────────── */}
          <div className="kpi-responsive-grid">
            <KpiCard
              value="0.3471"
              label="Absolute Concentration Index"
              trend="-0.02"
              trendIsPositive={true}
              target="0.30"
              tooltipText="Measures the extent to which a health indicator is concentrated among disadvantaged populations."
            />
            <KpiCard
              value="0.5185"
              label="Relative Concentration Index"
              trend="-0.04"
              trendIsPositive={true}
              target="0.45"
              tooltipText="Relative concentration index measuring economic inequality across quintiles."
            />
          </div>

          {/* ── Charts Grid: Order Disproportionality ──────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ChartContainer
              title="Absolute Concentration Index"
              subtitle="Vertical bar distribution showing absolute concentration values."
            >
              <AbsoluteConcentrationIndexVerticalBarChart />
            </ChartContainer>

            <ChartContainer
              title="Relative Concentration Index"
              subtitle="Scatter plot comparing relative estimate averages against the red equality baseline."
            >
              <RelativeConcentrationIndexScatterPlot />
            </ChartContainer>
          </div>
        </div>
      )}
    </BaseDashboardTemplate>
  );
};

export default HealthEquityPage;

