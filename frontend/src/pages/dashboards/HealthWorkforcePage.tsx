import React from 'react';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card } from '@/components/ui';
import KpiCard from '@/components/ui/KpiCard';
import {
  HealthWorkforceCategoryTreemap,
  HealthWorkforceDensityBarChart,
  HealthWorkforceStaffBarChart,
} from '@/components/charts/DashboardCharts';
import { ChartHeaderPills } from '@/components/charts/FamilyPlanningCharts';

const HealthWorkforcePage: React.FC = () => {
  return (
    <BaseDashboardTemplate
      category="Health Work Force"
      showPrimaryTabs={true}
      showSecondaryTabs={false}
    >
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <KpiCard value="492,181" label="Total Work Force" showIcons={true} />
        <KpiCard value="167,171" label="Total Administrative Staff" showIcons={true} />
        <KpiCard value="325,010" label="Total Health Professionals" showIcons={true} />
      </div>

      {/* Chart grid */}
      <div className="chart-grid">
        <Card
          title="Health Workforce Category"
          headerAction={<ChartHeaderPills showAllInv={false} />}
        >
          <HealthWorkforceCategoryTreemap />
        </Card>
        <Card
          title="Health Work Force Density Per 1000"
          headerAction={
            <ChartHeaderPills
              legendItems={[{ label: 'Density', color: '#2563eb' }]}
              showAllInv={false}
            />
          }
        >
          <HealthWorkforceDensityBarChart />
        </Card>
      </div>

      {/* Full-width chart */}
      <div className="mt-4">
        <Card
          title="Number of health professionals and administrative staff"
          headerAction={
            <ChartHeaderPills
              legendItems={[
                { label: 'health professionals', color: '#2563eb' },
                { label: 'administrative staff', color: '#ea580c' },
              ]}
              showAllInv={false}
            />
          }
        >
          <HealthWorkforceStaffBarChart />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default HealthWorkforcePage;
