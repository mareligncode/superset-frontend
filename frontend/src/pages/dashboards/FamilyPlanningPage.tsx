import React from 'react';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import {
  AcceptanceRateLineChart,
  AcceptorsByAgeDonutChart,
  ContraceptiveUseBarChart,
  AcceptorsByMethodTreemap,
  ChartHeaderPills,
} from '@/components/charts/FamilyPlanningCharts';

const FamilyPlanningPage: React.FC = () => {
  return (
    <BaseDashboardTemplate
      category="Services Delivery"
      showPrimaryTabs={true}
      showSecondaryTabs={true}
      activeSecondaryTab="Family Planning"
    >
      {/* ── Top Summary Stat Cards (Hero Metrics) ─────────────────── */}
      <div className="kpi-responsive-grid mb-4">
        {/* Metric 1 */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-3.5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-600 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Acceptance Rate</span>
            <span className="flex items-center text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
              ▲ +3.4%
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-blue-600 tracking-tight">28.6%</div>
          <span className="text-[10px] text-slate-600 mt-1 font-medium">DHIS2 Target: 30.0%</span>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-3.5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-600 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Acceptors</span>
            <span className="flex items-center text-[10px] font-extrabold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full border border-blue-200">
              Annual
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 tracking-tight">164.3k</div>
          <span className="text-[10px] text-slate-600 mt-1 font-medium">New & Repeat Acceptors</span>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-3.5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-600 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Unmet Need</span>
            <span className="flex items-center text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
              ▼ -7.2%
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-amber-600 tracking-tight">15.0%</div>
          <span className="text-[10px] text-slate-600 mt-1 font-medium">EDHS 2024 Survey Data</span>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-3.5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-600 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Top Method</span>
            <span className="material-symbols-outlined text-[16px] text-blue-600">syringe</span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-blue-600 tracking-tight">Injectables</div>
          <span className="text-[10px] text-slate-600 mt-1 font-medium">53.3% of total (77.1k)</span>
        </div>
      </div>

      {/* ── 4 Interactive Charts Grid ───────────────────────────── */}
      <div className="chart-grid">
        {/* 1. Line Chart: Contraceptive Acceptance Rate from DHIS2 */}
        <Card
          title="Contraceptive Acceptance Rate from DHIS2"
          headerAction={
            <ChartHeaderPills
              legendItems={[{ label: 'Performance', color: '#2563eb', type: 'line' }]}
              infoBadge={2}
            />
          }
        >
          <AcceptanceRateLineChart />
        </Card>

        {/* 2. Donut Chart: Contraceptive New and Repeat Acceptors By Age from DHIS2 */}
        <Card
          title="Contraceptive New and Repeat Acceptors By Age from DHIS2"
          headerAction={<ChartHeaderPills />}
        >
          <AcceptorsByAgeDonutChart />
        </Card>

        {/* 3. Bar Chart: Current Use Of Any Contraceptive Methods from EDHS */}
        <Card
          title="Current Use Of Any Contraceptive Methods from EDHS"
          headerAction={
            <ChartHeaderPills
              legendItems={[
                { label: 'Current Use Of Any Contraceptive Methods', color: '#2563eb' },
                { label: 'Unmet need', color: '#dc2626' },
              ]}
            />
          }
        >
          <ContraceptiveUseBarChart />
        </Card>

        {/* 4. Treemap: Contraceptive New and Repeat Acceptors By Method from DHIS2 */}
        <Card
          title="Contraceptive New and Repeat Acceptors By Method from DHIS2"
          headerAction={<ChartHeaderPills />}
        >
          <AcceptorsByMethodTreemap />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default FamilyPlanningPage;
