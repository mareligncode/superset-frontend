import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import {
  MaternalANCLineChart,
  MaternalHealthBarChart,
  BloodTTIBars,
  NCDSexMetricTable,
} from '@/components/charts/DashboardCharts';

const TBPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <BaseDashboardTemplate
      category="Services Delivery"
      showPrimaryTabs={true}
      showSecondaryTabs={true}
      activeSecondaryTab="TB"
    >
      <div className="chart-grid">
        <Card title={t('tbCaseNotificationRate')} showCardIcons>
          <MaternalANCLineChart />
        </Card>
        <Card title={t('tbTreatmentSuccessRate')} showCardIcons>
          <MaternalHealthBarChart />
        </Card>
        <Card title={t('tbHivCoinfectionRate')} showCardIcons>
          <BloodTTIBars />
        </Card>
        <Card title={t('mdrTbCasesByRegion')} showCardIcons>
          <NCDSexMetricTable />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default TBPage;
