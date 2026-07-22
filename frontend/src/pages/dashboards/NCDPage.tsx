import React from 'react';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import {
  NCDRiskAgeGroupedBar,
  NCDSexMetricTable,
  BloodGlucoseSexDonut,
} from '@/components/charts/DashboardCharts';

const NCDPage: React.FC = () => {
  return (
    <BaseDashboardTemplate
      category="Services Delivery"
      showPrimaryTabs={true}
      showSecondaryTabs={true}
      activeSecondaryTab="NCD"
      dataSourceNote="STEPS"
    >
      {/* Sub-tabs: Risk Factors | Screenings */}
      <div className="flex gap-1 border-b border-outline-variant mb-4">
        <button className="px-3 py-2 text-[12.5px] font-semibold text-primary border-b-2 border-primary">
          Risk Factors
        </button>
        <button className="px-3 py-2 text-[12.5px] font-medium text-on-surface-variant border-b-2 border-transparent hover:text-on-surface">
          Screenings
        </button>
      </div>

      <div className="chart-grid">
        <Card title="NCD Risk Factors by Age" showCardIcons>
          <NCDRiskAgeGroupedBar />
        </Card>
        <Card title="NCD Risk Factors by Sex" showCardIcons>
          <NCDSexMetricTable />
        </Card>
        <Card title="Elevated Blood Glucose by Age" showCardIcons>
          <NCDRiskAgeGroupedBar />
        </Card>
        <Card title="Elevated Blood Glucose by Sex" showCardIcons>
          <BloodGlucoseSexDonut />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default NCDPage;
