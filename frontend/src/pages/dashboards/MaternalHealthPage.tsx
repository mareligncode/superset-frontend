import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import KpiCard from '@/components/ui/KpiCard';
import { ChartContainer } from '@/components/charts/ChartContainer';
import {
  MaternalHealthBarChart,
  MaternalANCLineChart,
  MaternalMortalityBarChart,
} from '@/components/charts/DashboardCharts';
import { getLocalizedMonthWithNumber } from '@/utils/monthUtils';

const MaternalHealthPage: React.FC = () => {
  const { t } = useTranslation();
  const monthKeys = ['01-hamle', '03-meskerem', '05-hidar', '07-tir', '09-megabit', '11-ginbot'];
  const coverageData = [
    { PNC_Coverage: '34.0%', SBA_Rate: '34.2%', CS_Rate: '1.8%' },
    { PNC_Coverage: '37.1%', SBA_Rate: '36.5%', CS_Rate: '2.1%' },
    { PNC_Coverage: '39.5%', SBA_Rate: '35.0%', CS_Rate: '2.3%' },
    { PNC_Coverage: '37.8%', SBA_Rate: '36.6%', CS_Rate: '2.0%' },
    { PNC_Coverage: '37.2%', SBA_Rate: '35.4%', CS_Rate: '2.2%' },
    { PNC_Coverage: '32.1%', SBA_Rate: '33.8%', CS_Rate: '1.9%' },
  ];
  const pncTableData = monthKeys.map((key, idx) => ({
    Month: getLocalizedMonthWithNumber(key, t),
    ...coverageData[idx]
  }));

  return (
    <BaseDashboardTemplate
      category="Services Delivery"
      showPrimaryTabs={true}
      showSecondaryTabs={true}
      activeSecondaryTab="Maternal"
    >
      <div className="space-y-4 sm:space-y-5 lg:space-y-6 animate-fadeIn">
        {/* KPI Executive Summary Grid */}
        <div className="kpi-responsive-grid">
          <KpiCard
            label={t('maternalMortalityRatio')}
            value="267 / 100k"
            trend="-3.4%"
            trendIsPositive={true}
            target="200"
            tooltipText={t('maternalDeathsPer100k')}
          />
          <KpiCard
            label={t('anc4CoverageRate')}
            value="74.2%"
            trend="+4.1%"
            trendIsPositive={true}
            target="80.0%"
            tooltipText={t('percentagePregnantWomen')}
          />
          <KpiCard
            label={t('skilledBirthAttendance')}
            value="68.5%"
            trend="+2.8%"
            trendIsPositive={true}
            target="75.0%"
            tooltipText={t('deliveriesSkilledPersonnel')}
          />
          <KpiCard
            label={t('postnatalCareCoverage')}
            value="34.2%"
            trend="+1.9%"
            trendIsPositive={true}
            target="50.0%"
            tooltipText={t('mothersPostnatalCheckup')}
          />
        </div>

        {/* Responsive Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          <ChartContainer
            title={t('maternalHealthSBA')}
            subtitle={t('maternalHealthSBASubtitle')}
            tableData={pncTableData}
          >
            <MaternalHealthBarChart />
          </ChartContainer>

          <ChartContainer
            title={t('maternalHealthANC')}
            subtitle={t('maternalHealthANCSubtitle')}
          >
            <MaternalANCLineChart />
          </ChartContainer>

          <ChartContainer
            title={t('institutionalMaternalDeaths')}
            subtitle={t('institutionalMaternalDeathsSubtitle')}
          >
            <MaternalHealthBarChart />
          </ChartContainer>

          <ChartContainer
            title={t('maternalMortalityRatioPer100k')}
            subtitle={t('maternalMortalityRatioSubtitle')}
          >
            <MaternalMortalityBarChart />
          </ChartContainer>
        </div>
      </div>
    </BaseDashboardTemplate>
  );
};

export default MaternalHealthPage;

