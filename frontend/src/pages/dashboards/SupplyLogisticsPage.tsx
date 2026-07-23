import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import KpiCard from '@/components/ui/KpiCard';
import {
  SupplyVsDistributedLineChart,
  InventoryFillRatesBar,
  BloodTTIBars,
  NCDSexMetricTable,
} from '@/components/charts/DashboardCharts';

const SupplyLogisticsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <BaseDashboardTemplate
      category="Supply and Logistics"
      showPrimaryTabs={true}
      showSecondaryTabs={false}
    >
      {/* KPI Row */}
      <div className="kpi-grid mb-4">
        <KpiCard value="0.68" label={t('pharmaceuticalsWastageRate')} />
        <KpiCard value="201" label={t('averageProcurementLeadTime')} />
      </div>

      {/* Chart grid */}
      <div className="chart-grid">
        <Card title={t('supplyVsDistributed')} showCardIcons>
          <SupplyVsDistributedLineChart />
        </Card>
        <Card title={t('inventoryManagement')} showCardIcons>
          <InventoryFillRatesBar />
        </Card>
        <Card title={t('procurementSupplyChain')} showCardIcons>
          <BloodTTIBars />
        </Card>
        <Card title={t('pharmaceuticalsProcurement')} showCardIcons>
          <NCDSexMetricTable />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default SupplyLogisticsPage;
