import React from 'react';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import KpiCard from '@/components/ui/KpiCard';
import { ChartContainer } from '@/components/charts/ChartContainer';
import {
  MaternalHealthBarChart,
  MaternalANCLineChart,
  MaternalMortalityBarChart,
} from '@/components/charts/DashboardCharts';

const MaternalHealthPage: React.FC = () => {
  const pncTableData = [
    { Month: '01-Hamle', PNC_Coverage: '34.0%', SBA_Rate: '34.2%', CS_Rate: '1.8%' },
    { Month: '03-Meskerem', PNC_Coverage: '37.1%', SBA_Rate: '36.5%', CS_Rate: '2.1%' },
    { Month: '05-Hidar', PNC_Coverage: '39.5%', SBA_Rate: '35.0%', CS_Rate: '2.3%' },
    { Month: '07-Tir', PNC_Coverage: '37.8%', SBA_Rate: '36.6%', CS_Rate: '2.0%' },
    { Month: '09-Megabit', PNC_Coverage: '37.2%', SBA_Rate: '35.4%', CS_Rate: '2.2%' },
    { Month: '11-Ginbot', PNC_Coverage: '32.1%', SBA_Rate: '33.8%', CS_Rate: '1.9%' },
  ];

  return (
    <BaseDashboardTemplate
      category="Services Delivery"
      showPrimaryTabs={true}
      showSecondaryTabs={true}
      activeSecondaryTab="Maternal"
    >
      <div className="space-y-5 animate-fadeIn">
        {/* KPI Executive Summary Grid */}
        <div className="kpi-responsive-grid">
          <KpiCard
            label="Maternal Mortality Ratio"
            value="267 / 100k"
            trend="-3.4%"
            trendIsPositive={true}
            target="200"
            tooltipText="Maternal deaths per 100,000 live births from EDHS report."
          />
          <KpiCard
            label="ANC4+ Coverage Rate"
            value="74.2%"
            trend="+4.1%"
            trendIsPositive={true}
            target="80.0%"
            tooltipText="Percentage of pregnant women attending at least 4 antenatal care visits."
          />
          <KpiCard
            label="Skilled Birth Attendance"
            value="68.5%"
            trend="+2.8%"
            trendIsPositive={true}
            target="75.0%"
            tooltipText="Deliveries attended by skilled health personnel in facilities."
          />
          <KpiCard
            label="Postnatal Care (PNC) Rate"
            value="34.2%"
            trend="+1.9%"
            trendIsPositive={true}
            target="50.0%"
            tooltipText="Mothers receiving postnatal checkup within 48 hours of delivery."
          />
        </div>

        {/* Responsive Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ChartContainer
            title="Maternal Health (SBA, CS, PNC) from DHIS2"
            subtitle="Monthly coverage comparison for PNC, Skilled Birth Attendance, and Caesarean Sections."
            tableData={pncTableData}
          >
            <MaternalHealthBarChart />
          </ChartContainer>

          <ChartContainer
            title="Maternal Health (ANC4 & ANC8) from DHIS2"
            subtitle="Trend analysis of Antenatal Care 4+ vs ANC 8+ visits."
          >
            <MaternalANCLineChart />
          </ChartContainer>

          <ChartContainer
            title="Institutional Maternal Deaths from DHIS2"
            subtitle="Reported facility-based maternal mortality count."
          >
            <MaternalHealthBarChart />
          </ChartContainer>

          <ChartContainer
            title="Maternal Mortality Ratio (Per 100,000 Live Births)"
            subtitle="Historical trend benchmarks from Demographic and Health Surveys (EDHS)."
          >
            <MaternalMortalityBarChart />
          </ChartContainer>
        </div>
      </div>
    </BaseDashboardTemplate>
  );
};

export default MaternalHealthPage;

