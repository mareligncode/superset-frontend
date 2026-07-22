import React from 'react';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import KpiCard from '@/components/ui/KpiCard';
import {
  TopHighRiskWoredasBar,
  MaternalHealthBarChart,
} from '@/components/charts/DashboardCharts';

const PHEMPage: React.FC = () => {
  return (
    <BaseDashboardTemplate
      category="PHEM"
      showPrimaryTabs={true}
      showSecondaryTabs={false}
    >
      <p className="text-[12px] font-semibold text-on-surface mb-3">Suspected Disease Analysis</p>

      <div className="kpi-grid mb-4">
        <KpiCard value="43.8k" label="Suspected Cases" />
        <KpiCard value="343" label="Nationalities" />
        <KpiCard value="6.8" label="Admission Id" />
      </div>

      <div className="chart-grid">
        <Card title="Cases by Region" showCardIcons>
          <TopHighRiskWoredasBar />
        </Card>
        <Card title="Deaths by Region" showCardIcons>
          <MaternalHealthBarChart />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default PHEMPage;
