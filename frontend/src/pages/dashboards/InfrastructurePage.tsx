import React from 'react';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import {
  WorkforceDensityBar,
  MaternalHealthBarChart,
  NCDSexMetricTable,
} from '@/components/charts/DashboardCharts';

const InfrastructurePage: React.FC = () => {
  return (
    <BaseDashboardTemplate
      category="Infrastructure"
      showPrimaryTabs={true}
      showSecondaryTabs={false}
    >
      <div className="chart-grid mb-4">
        <Card title="Health Facilities by Status" showCardIcons>
          <WorkforceDensityBar />
        </Card>
        <Card title="Health Facilities by Region" showCardIcons>
          <MaternalHealthBarChart />
        </Card>
      </div>

      <div className="chart-grid">
        <Card title="Health Facilities Distribution" showCardIcons>
          <MaternalHealthBarChart />
        </Card>
        <Card title="Services for selected facility" showCardIcons>
          <NCDSexMetricTable />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default InfrastructurePage;
