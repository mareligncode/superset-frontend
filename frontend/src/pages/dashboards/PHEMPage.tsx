import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import KpiCard from '@/components/ui/KpiCard';
import {
  TopHighRiskWoredasBar,
  MaternalHealthBarChart,
} from '@/components/charts/DashboardCharts';

const PHEMPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <BaseDashboardTemplate
      category="PHEM"
      showPrimaryTabs={true}
      showSecondaryTabs={false}
    >
      <p className="text-[12px] font-semibold text-on-surface mb-3">{t('suspectedDiseaseAnalysis')}</p>

      <div className="kpi-grid mb-4">
        <KpiCard value="43.8k" label={t('suspectedCases')} />
        <KpiCard value="343" label={t('nationalities')} />
        <KpiCard value="6.8" label={t('admissionId')} />
      </div>

      <div className="chart-grid">
        <Card title={t('casesByRegion')} showCardIcons>
          <TopHighRiskWoredasBar />
        </Card>
        <Card title={t('deathsByRegion')} showCardIcons>
          <MaternalHealthBarChart />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default PHEMPage;
