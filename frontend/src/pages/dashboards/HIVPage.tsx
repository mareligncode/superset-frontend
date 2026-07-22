import React from 'react';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import {
  MaternalHealthBarChart,
  MaternalANCLineChart,
  BloodTTIBars,
  NCDSexMetricTable,
} from '@/components/charts/DashboardCharts';

const HIVPage: React.FC = () => {
  return (
    <BaseDashboardTemplate
      category="Services Delivery"
      showPrimaryTabs={true}
      showSecondaryTabs={true}
      activeSecondaryTab="HIV"
    >
      <div className="chart-grid">
        <Card title="HIV Testing and Counseling" showCardIcons>
          <MaternalHealthBarChart />
        </Card>
        <Card title="ART Coverage and Viral Load Suppression" showCardIcons>
          <MaternalANCLineChart />
        </Card>
        <Card title="PMTCT Coverage" showCardIcons>
          <BloodTTIBars />
        </Card>
        <Card title="HIV Prevalence by Region" showCardIcons>
          <NCDSexMetricTable />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default HIVPage;
