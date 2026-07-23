import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import {
  NCDRiskAgeGroupedBar,
  NCDSexMetricTable,
  BloodGlucoseSexDonut,
} from '@/components/charts/DashboardCharts';

const NCDPage: React.FC = () => {
  const { t } = useTranslation();
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
          {t('riskFactors')}
        </button>
        <button className="px-3 py-2 text-[12.5px] font-medium text-on-surface-variant border-b-2 border-transparent hover:text-on-surface">
          {t('screenings')}
        </button>
      </div>

      <div className="chart-grid">
        <Card title={t('ncdRiskFactorsAge')} showCardIcons>
          <NCDRiskAgeGroupedBar />
        </Card>
        <Card title={t('ncdRiskFactorsSex')} showCardIcons>
          <NCDSexMetricTable />
        </Card>
        <Card title={t('elevatedBloodGlucoseAge')} showCardIcons>
          <NCDRiskAgeGroupedBar />
        </Card>
        <Card title={t('elevatedBloodGlucoseSex')} showCardIcons>
          <BloodGlucoseSexDonut />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default NCDPage;
