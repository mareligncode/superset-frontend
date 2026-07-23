import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import KpiCard from '@/components/ui/KpiCard';
import {
  BloodTTIBars,
  BloodUnitsTrendLine,
  MaternalHealthBarChart,
  TopHighRiskWoredasBar,
} from '@/components/charts/DashboardCharts';

const BloodDonationPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <BaseDashboardTemplate
      category="Blood Donation"
      showPrimaryTabs={true}
      showSecondaryTabs={false}
    >
      {/* KPI Row */}
      <div className="kpi-grid mb-4">
        <KpiCard value="423k" label={t('totalTests')} />
        <KpiCard value="21.1k" label={t('totalPositive')} />
        <KpiCard value="4.99" label={t('overallReactivityRate')} />
      </div>

      {/* Chart grid */}
      <div className="chart-grid">
        <Card title={t('nationalBloodTTITesting')} showCardIcons>
          <BloodTTIBars />
        </Card>
        <Card title={t('trendsBloodUnitCollected')} showCardIcons>
          <BloodUnitsTrendLine />
        </Card>
        <Card title={t('bloodDonationByRegion')} showCardIcons>
          <MaternalHealthBarChart />
        </Card>
        <Card title={t('top10BloodCollectionSites')} showCardIcons>
          <TopHighRiskWoredasBar />
        </Card>
      </div>

      {/* Full-width table card */}
      <div className="mt-4">
        <Card title={t('bloodDonationByCenters')} showCardIcons>
          <BloodTTIBars />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default BloodDonationPage;
