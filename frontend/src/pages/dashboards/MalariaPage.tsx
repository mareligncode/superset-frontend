import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import KpiCard from '@/components/ui/KpiCard';
import {
  MalariaRiskCategoryPie,
  TopHighRiskWoredasBar,
  MaternalHealthBarChart,
} from '@/components/charts/DashboardCharts';

const MalariaPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <BaseDashboardTemplate
      category="Services Delivery"
      showPrimaryTabs={true}
      showSecondaryTabs={true}
      activeSecondaryTab="Malaria"
    >
      {/* KPI Row */}
      <div className="kpi-grid mb-4">
        <KpiCard value="4.59k" label={t('totalMalariaCases')} />
        <KpiCard value="0.4" label={t('avgRiskIndex')} />
        <KpiCard value="63.33" label={t('avgMorbidityPer1000')} />
        <KpiCard value="0" label={t('highRiskWoredas')} />
      </div>

      {/* Chart grid */}
      <div className="chart-grid">
        <Card title={t('riskByClimateRegion')} showCardIcons>
          <MaternalHealthBarChart />
        </Card>
        <Card title={t('malariaRiskDistributionHeatmap')} showCardIcons>
          <MaternalHealthBarChart />
        </Card>
        <Card title={t('malariaRiskCategory')} showCardIcons>
          <MalariaRiskCategoryPie />
        </Card>
        <Card title={t('top15HighestRiskWoredas')} showCardIcons>
          <TopHighRiskWoredasBar />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default MalariaPage;
