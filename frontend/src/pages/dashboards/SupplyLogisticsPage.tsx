import React from 'react';
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
  return (
    <BaseDashboardTemplate
      category="Supply and Logistics"
      showPrimaryTabs={true}
      showSecondaryTabs={false}
    >
      {/* KPI Row */}
      <div className="kpi-grid mb-4">
        <KpiCard value="0.68" label="Pharmaceuticals wastage rate" />
        <KpiCard value="201" label="Average procurement lead time (Days)" />
      </div>

      {/* Chart grid */}
      <div className="chart-grid">
        <Card title="Supply Vs Distributed (In Billion ETB) Yearly Trend" showCardIcons>
          <SupplyVsDistributedLineChart />
        </Card>
        <Card title="Inventory Management and Supplier Fill Rates" showCardIcons>
          <InventoryFillRatesBar />
        </Card>
        <Card title="Procurement & Supply Chain Lead Times" showCardIcons>
          <BloodTTIBars />
        </Card>
        <Card title="Pharmaceuticals and Medical Supplies Procurement" showCardIcons>
          <NCDSexMetricTable />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default SupplyLogisticsPage;
