import React from 'react';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import {
  MaternalANCLineChart,
  MaternalHealthBarChart,
  BloodGlucoseSexDonut,
} from '@/components/charts/DashboardCharts';
import { AcceptorsByMethodTreemap } from '@/components/charts/FamilyPlanningCharts';

const NeonatalHealthPage: React.FC = () => {
  return (
    <BaseDashboardTemplate
      category="Services Delivery"
      showPrimaryTabs={true}
      showSecondaryTabs={true}
      activeSecondaryTab="Neonatal"
    >
      {/* Top row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card title="Institutional and Community Neonatal Deaths from DHIS2" showCardIcons>
          <MaternalANCLineChart />
        </Card>
        <Card title="Comparison of Neonatal Deaths for 2016" showCardIcons>
          <MaternalHealthBarChart />
        </Card>
        <Card title="Community Early Neonatal Death by time from DHIS2" showCardIcons>
          <BloodGlucoseSexDonut />
        </Card>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card title="Community Early Neonatal Death by time" showCardIcons>
          <BloodGlucoseSexDonut />
        </Card>
        <Card title="Institutional Early Neonatal Death from DHIS2" showCardIcons>
          <AcceptorsByMethodTreemap />
        </Card>
        <Card title="Institutional Early Neonatal Death from HHIS" showCardIcons>
          <MaternalHealthBarChart />
        </Card>
      </div>

      {/* Full-width control chart */}
      <Card title="% of Neonatal Deaths control chart" showCardIcons>
        <MaternalANCLineChart />
      </Card>
    </BaseDashboardTemplate>
  );
};

export default NeonatalHealthPage;
