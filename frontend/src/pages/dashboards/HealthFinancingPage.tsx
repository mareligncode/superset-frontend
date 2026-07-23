import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import KpiCard from '@/components/ui/KpiCard';
import {
  MaternalANCLineChart,
  MaternalHealthBarChart,
  BloodTTIBars,
  NCDSexMetricTable,
} from '@/components/charts/DashboardCharts';

const HealthFinancingPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <BaseDashboardTemplate
      category="Health Financing"
      showPrimaryTabs={true}
      showSecondaryTabs={false}
    >
      <div className="kpi-grid mb-4">
        <KpiCard value="$48" label={t('perCapitaHealthExpenditure')} />
        <KpiCard value="5.2%" label={t('healthExpenditureGDP')} />
        <KpiCard value="62%" label={t('governmentHealthSpending')} />
      </div>
      <div className="chart-grid">
        <Card title={t('healthExpenditureTrends')} showCardIcons>
          <MaternalANCLineChart />
        </Card>
        <Card title={t('healthFinancingSources')} showCardIcons>
          <MaternalHealthBarChart />
        </Card>
        <Card title={t('outOfPocketExpenditure')} showCardIcons>
          <BloodTTIBars />
        </Card>
        <Card title={t('financialProtectionIndicators')} showCardIcons>
          <NCDSexMetricTable />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default HealthFinancingPage;
