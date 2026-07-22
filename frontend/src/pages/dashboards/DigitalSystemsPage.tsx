import React from 'react';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import {
  MaternalANCLineChart,
  MaternalHealthBarChart,
  BloodTTIBars,
  NCDSexMetricTable,
} from '@/components/charts/DashboardCharts';

const DigitalSystemsPage: React.FC = () => {
  return (
    <BaseDashboardTemplate
      category="Digital Systems Monitoring"
      showPrimaryTabs={true}
      showSecondaryTabs={false}
    >
      <div className="chart-grid">
        <Card title="DHIS2 Reporting Rate & Timeliness" showCardIcons>
          <MaternalANCLineChart />
        </Card>
        <Card title="eCHIS Adoption & Active Users" showCardIcons>
          <MaternalHealthBarChart />
        </Card>
        <Card title="System Connectivity & Server Uptime" showCardIcons>
          <BloodTTIBars />
        </Card>
        <Card title="Data Quality & Completeness Index" showCardIcons>
          <NCDSexMetricTable />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default DigitalSystemsPage;
