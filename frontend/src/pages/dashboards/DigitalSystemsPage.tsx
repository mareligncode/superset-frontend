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

const DigitalSystemsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <BaseDashboardTemplate
      category="Digital Systems Monitoring"
      showPrimaryTabs={true}
      showSecondaryTabs={false}
    >
      <div className="chart-grid">
        <Card title={t('dhis2ReportingRate')} showCardIcons>
          <MaternalANCLineChart />
        </Card>
        <Card title={t('echisAdoption')} showCardIcons>
          <MaternalHealthBarChart />
        </Card>
        <Card title={t('systemConnectivity')} showCardIcons>
          <BloodTTIBars />
        </Card>
        <Card title={t('dataQualityIndex')} showCardIcons>
          <NCDSexMetricTable />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default DigitalSystemsPage;
