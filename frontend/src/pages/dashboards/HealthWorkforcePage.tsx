import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  return (
    <BaseDashboardTemplate
      category="Health Work Force"
      showPrimaryTabs={true}
      showSecondaryTabs={false}
    >
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <KpiCard value="492,181" label={t('totalWorkForce')} showIcons={true} />
        <KpiCard value="167,171" label={t('totalAdministrativeStaff')} showIcons={true} />
        <KpiCard value="325,010" label={t('totalHealthProfessionals')} showIcons={true} />
      </div>

      {/* Chart grid */}
      <div className="chart-grid">
        <Card
          title={t('healthWorkforceCategory')}
          headerAction={<ChartHeaderPills showAllInv={false} />}
        >
          <HealthWorkforceCategoryTreemap />
        </Card>
        <Card
          title={t('healthWorkforceDensity')}
          headerAction={
            <ChartHeaderPills
              legendItems={[{ label: t('density'), color: '#2563eb' }]}
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
          title={t('numberOfHealthProfessionals')}
          headerAction={
            <ChartHeaderPills
              legendItems={[
                { label: t('healthProfessionals'), color: '#2563eb' },
                { label: t('administrativeStaff'), color: '#ea580c' },
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
