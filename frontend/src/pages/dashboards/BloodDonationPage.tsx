import React from 'react';
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
  return (
    <BaseDashboardTemplate
      category="Blood Donation"
      showPrimaryTabs={true}
      showSecondaryTabs={false}
    >
      {/* KPI Row */}
      <div className="kpi-grid mb-4">
        <KpiCard value="423k" label="Total Tests" />
        <KpiCard value="21.1k" label="Total Positive" />
        <KpiCard value="4.99" label="Overall Reactivity Rate" />
      </div>

      {/* Chart grid */}
      <div className="chart-grid">
        <Card title="National Blood TTI Testing Status and Results, 2017 EFY" showCardIcons>
          <BloodTTIBars />
        </Card>
        <Card title="Trends of total blood unit collected (2006 – 2017 EFY)" showCardIcons>
          <BloodUnitsTrendLine />
        </Card>
        <Card title="Blood Donation By Region" showCardIcons>
          <MaternalHealthBarChart />
        </Card>
        <Card title="Top 10 Blood Collection Sites, 2017 EFY" showCardIcons>
          <TopHighRiskWoredasBar />
        </Card>
      </div>

      {/* Full-width table card */}
      <div className="mt-4">
        <Card title="Blood Donation by Centers" showCardIcons>
          <BloodTTIBars />
        </Card>
      </div>
    </BaseDashboardTemplate>
  );
};

export default BloodDonationPage;
