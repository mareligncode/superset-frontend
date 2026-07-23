import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import {
  MaternalHealthBarChart,
  MaternalANCLineChart,
  BloodTTIBars,
  NCDSexMetricTable,
} from '@/components/charts/DashboardCharts';

const HIVPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <BaseDashboardTemplate
      category="Services Delivery"
      showPrimaryTabs={true}
      showSecondaryTabs={true}
      activeSecondaryTab="HIV"
    >
      <div className="chart-grid">
        <Card title={t('hivTestingCounseling')} showCardIcons>
          <MaternalHealthBarChart />
        </Card>
        <Card title={t('artCoverageViralLoad')} showCardIcons>
          <MaternalANCLineChart />
        </Card>
        <Card title={t('pmtctCoverage')} showCardIcons>
          <BloodTTIBars />
        </Card>
        <Card title={t('hivPrevalenceByRegion')} showCardIcons>
          <NCDSexMetricTable />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default HIVPage;
