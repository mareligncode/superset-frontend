import React from 'react';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import {
  MaternalANCLineChart,
  MaternalHealthBarChart,
  BloodTTIBars,
  NCDSexMetricTable,
} from '@/components/charts/DashboardCharts';

const TBPage: React.FC = () => {
  return (
    <BaseDashboardTemplate
      category="Services Delivery"
      showPrimaryTabs={true}
      showSecondaryTabs={true}
      activeSecondaryTab="TB"
    >
      <div className="chart-grid">
        <Card title="TB Case Notification Rate" showCardIcons>
          <MaternalANCLineChart />
        </Card>
        <Card title="TB Treatment Success Rate" showCardIcons>
          <MaternalHealthBarChart />
        </Card>
        <Card title="TB/HIV Co-infection Rate" showCardIcons>
          <BloodTTIBars />
        </Card>
        <Card title="MDR-TB Cases by Region" showCardIcons>
          <NCDSexMetricTable />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default TBPage;
