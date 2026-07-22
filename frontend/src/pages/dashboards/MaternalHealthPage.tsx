import React from 'react';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import {
  MaternalHealthBarChart,
  MaternalANCLineChart,
  MaternalMortalityBarChart,
} from '@/components/charts/DashboardCharts';

const MaternalHealthPage: React.FC = () => {
  return (
    <BaseDashboardTemplate
      category="Services Delivery"
      showPrimaryTabs={true}
      showSecondaryTabs={true}
      activeSecondaryTab="Maternal"
    >
      <div className="chart-grid">
        <Card title="Maternal Health (SBA, CS, PNC) from DHIS2" showCardIcons>
          <MaternalHealthBarChart />
        </Card>

        <Card title="Maternal Health (ANC 4 & ANC8) from DHIS2" showCardIcons>
          <MaternalANCLineChart />
        </Card>

        <Card title="Institutional Maternal Deaths from DHIS2" showCardIcons>
          <MaternalHealthBarChart />
        </Card>

        <Card title="Maternal Mortality Ratio (Per 100000 Live Birth) from EDHS" showCardIcons>
          <MaternalMortalityBarChart />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default MaternalHealthPage;
