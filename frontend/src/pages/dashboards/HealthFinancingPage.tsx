import React from 'react';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import KpiCard from '@/components/ui/KpiCard';
import {
  MaternalANCLineChart,
  MaternalHealthBarChart,
  BloodTTIBars,
  NCDSexMetricTable,
} from '@/components/charts/DashboardCharts';

const HealthFinancingPage: React.FC = () => {
  return (
    <BaseDashboardTemplate
      category="Health Financing"
      showPrimaryTabs={true}
      showSecondaryTabs={false}
    >
      <div className="kpi-grid mb-4">
        <KpiCard value="$48" label="Per Capita Health Expenditure (USD)" />
        <KpiCard value="5.2%" label="Health Expenditure as % of GDP" />
        <KpiCard value="62%" label="Government Health Spending Share" />
      </div>
      <div className="chart-grid">
        <Card title="Health Expenditure Trends" showCardIcons>
          <MaternalANCLineChart />
        </Card>
        <Card title="Health Financing Sources" showCardIcons>
          <MaternalHealthBarChart />
        </Card>
        <Card title="Out-of-Pocket Expenditure by Region" showCardIcons>
          <BloodTTIBars />
        </Card>
        <Card title="Financial Protection Indicators" showCardIcons>
          <NCDSexMetricTable />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default HealthFinancingPage;
