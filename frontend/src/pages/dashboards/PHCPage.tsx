import React from 'react';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import {
  MaternalHealthBarChart,
  MaternalANCLineChart,
  BloodTTIBars,
  NCDSexMetricTable,
} from '@/components/charts/DashboardCharts';

const PHCPage: React.FC = () => {
  return (
    <BaseDashboardTemplate
      category="PHC"
      showPrimaryTabs={true}
      showSecondaryTabs={false}
    >
      <div className="chart-grid">
        <Card title="Primary Healthcare Coverage by Region" showCardIcons>
          <MaternalHealthBarChart />
        </Card>
        <Card title="Health Extension Program Performance" showCardIcons>
          <MaternalANCLineChart />
        </Card>
        <Card title="Essential Health Services Package Delivery" showCardIcons>
          <BloodTTIBars />
        </Card>
        <Card title="PHC Facility Readiness Index" showCardIcons>
          <NCDSexMetricTable />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default PHCPage;
