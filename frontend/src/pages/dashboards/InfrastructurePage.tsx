import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import {
  WorkforceDensityBar,
  MaternalHealthBarChart,
  NCDSexMetricTable,
} from '@/components/charts/DashboardCharts';

const InfrastructurePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <BaseDashboardTemplate
      category="Infrastructure"
      showPrimaryTabs={true}
      showSecondaryTabs={false}
    >
      <div className="chart-grid mb-4">
        <Card title={t('healthFacilitiesStatus')} showCardIcons>
          <WorkforceDensityBar />
        </Card>
        <Card title={t('healthFacilitiesRegion')} showCardIcons>
          <MaternalHealthBarChart />
        </Card>
      </div>

      <div className="chart-grid">
        <Card title={t('healthFacilitiesDistribution')} showCardIcons>
          <MaternalHealthBarChart />
        </Card>
        <Card title={t('servicesSelectedFacility')} showCardIcons>
          <NCDSexMetricTable />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default InfrastructurePage;
