import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import {
  MaternalANCLineChart,
  MaternalHealthBarChart,
  BloodGlucoseSexDonut,
} from '@/components/charts/DashboardCharts';
import { AcceptorsByMethodTreemap } from '@/components/charts/FamilyPlanningCharts';

const NeonatalHealthPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <BaseDashboardTemplate
      category="Services Delivery"
      showPrimaryTabs={true}
      showSecondaryTabs={true}
      activeSecondaryTab="Neonatal"
    >
      {/* Top row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card title={t('institutionalCommunityNeonatalDeaths')} showCardIcons>
          <MaternalANCLineChart />
        </Card>
        <Card title={t('comparisonNeonatalDeaths')} showCardIcons>
          <MaternalHealthBarChart />
        </Card>
        <Card title={t('communityEarlyNeonatalDeathTime')} showCardIcons>
          <BloodGlucoseSexDonut />
        </Card>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card title={t('communityEarlyNeonatalDeath')} showCardIcons>
          <BloodGlucoseSexDonut />
        </Card>
        <Card title={t('institutionalEarlyNeonatalDeathDHIS2')} showCardIcons>
          <AcceptorsByMethodTreemap />
        </Card>
        <Card title={t('institutionalEarlyNeonatalDeathHHIS')} showCardIcons>
          <MaternalHealthBarChart />
        </Card>
      </div>

      {/* Full-width control chart */}
      <Card title={t('neonatalDeathsControlChart')} showCardIcons>
        <MaternalANCLineChart />
      </Card>
    </BaseDashboardTemplate>
  );
};

export default NeonatalHealthPage;
