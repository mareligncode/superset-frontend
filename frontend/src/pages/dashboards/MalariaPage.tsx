import React from 'react';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import KpiCard from '@/components/ui/KpiCard';
import {
  MalariaRiskCategoryPie,
  TopHighRiskWoredasBar,
  MaternalHealthBarChart,
} from '@/components/charts/DashboardCharts';

const MalariaPage: React.FC = () => {
  return (
    <BaseDashboardTemplate
      category="Services Delivery"
      showPrimaryTabs={true}
      showSecondaryTabs={true}
      activeSecondaryTab="Malaria"
    >
      {/* KPI Row */}
      <div className="kpi-grid mb-4">
        <KpiCard value="4.59k" label="Total Malaria Cases" />
        <KpiCard value="0.4" label="Avg risk index" />
        <KpiCard value="63.33" label="Avg morbidity per 1000" />
        <KpiCard value="0" label="High-risk woredas" />
      </div>

      {/* Chart grid */}
      <div className="chart-grid">
        <Card title="Risk by Climate Region and Season" showCardIcons>
          <MaternalHealthBarChart />
        </Card>
        <Card title="Malaria Risk Distribution Heatmap" showCardIcons>
          <MaternalHealthBarChart />
        </Card>
        <Card title="Malaria Risk Category" showCardIcons>
          <MalariaRiskCategoryPie />
        </Card>
        <Card title="Top 15 highest-risk woredas" showCardIcons>
          <TopHighRiskWoredasBar />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default MalariaPage;
