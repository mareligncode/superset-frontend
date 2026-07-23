import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Card } from '@/components/ui';
import { ROUTES, PRIMARY_CATEGORIES } from '@/constants';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Hero Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4 md:mb-6 leading-tight px-2">
            {t('ethiopianMinistryOfHealth')}
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-5 sm:mb-6 md:mb-8 max-w-3xl mx-auto px-4 leading-relaxed">
            {t('comprehensiveHealthIntelligence')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xs sm:max-w-none mx-auto px-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate(ROUTES.DASHBOARDS)}
              className="w-full sm:w-auto min-h-[48px] text-sm sm:text-base font-semibold"
            >
              {t('viewDashboards')}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate(ROUTES.CHARTS)}
              className="w-full sm:w-auto min-h-[48px] text-sm sm:text-base font-semibold"
            >
              {t('exploreCharts')}
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Categories */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-slate-100 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 sm:mb-5 md:mb-6 text-center px-2">
            {t('dashboardCategories')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {PRIMARY_CATEGORIES.map((category) => {
              const key = category.toLowerCase().replace(/ /g, '');
              return (
                <Card
                  key={category}
                  variant="elevated"
                  onClick={() => navigate(ROUTES.DASHBOARDS)}
                  className="cursor-pointer hover:scale-105 transition-transform active:scale-95"
                >
                  <div className="flex flex-col items-center text-center p-4 sm:p-5 md:p-6">
                    <span className="material-symbols-outlined text-3xl sm:text-4xl md:text-5xl text-blue-600 dark:text-blue-400 mb-2 sm:mb-2.5 md:mb-3">
                      dashboard
                    </span>
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 dark:text-slate-100">
                      {t(key) || category}
                    </h3>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Card variant="glass" className="p-4 sm:p-5 md:p-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1.5 sm:mb-2 md:mb-3">
                  14
                </div>
                <div className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 leading-tight">
                  {t('regionsCovered')}
                </div>
              </div>
            </Card>
            <Card variant="glass" className="p-4 sm:p-5 md:p-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-1.5 sm:mb-2 md:mb-3">
                  16
                </div>
                <div className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 leading-tight">
                  {t('dashboardCategoriesCount')}
                </div>
              </div>
            </Card>
            <Card variant="glass" className="p-4 sm:p-5 md:p-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 dark:text-green-600 mb-1.5 sm:mb-2 md:mb-3">
                  120M+
                </div>
                <div className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 leading-tight">
                  {t('populationServed')}
                </div>
              </div>
            </Card>
            <Card variant="glass" className="p-4 sm:p-5 md:p-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1.5 sm:mb-2 md:mb-3">
                  24/7
                </div>
                <div className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 leading-tight">
                  {t('realtimeMonitoring')}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
