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
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 sm:mb-6">
            {t('ethiopianMinistryOfHealth')}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-6 sm:mb-8 max-w-3xl mx-auto">
            {t('comprehensiveHealthIntelligence')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xs sm:max-w-none mx-auto">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate(ROUTES.DASHBOARDS)}
            >
              {t('viewDashboards')}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate(ROUTES.CHARTS)}
            >
              {t('exploreCharts')}
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Categories */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-100 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 sm:mb-6 text-center">
            {t('dashboardCategories')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRIMARY_CATEGORIES.map((category) => {
              const key = category.toLowerCase().replace(/ /g, '');
              return (
                <Card
                  key={category}
                  variant="elevated"
                  onClick={() => navigate(ROUTES.DASHBOARDS)}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col items-center text-center p-4 sm:p-6">
                    <span className="material-symbols-outlined text-4xl sm:text-5xl text-blue-600 dark:text-blue-400 mb-2 sm:mb-3">
                      dashboard
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
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
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="glass">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 sm:mb-3">
                  14
                </div>
                <div className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  {t('regionsCovered')}
                </div>
              </div>
            </Card>
            <Card variant="glass">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2 sm:mb-3">
                  16
                </div>
                <div className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  {t('dashboardCategoriesCount')}
                </div>
              </div>
            </Card>
            <Card variant="glass">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800 dark:text-green-600 mb-2 sm:mb-3">
                  120M+
                </div>
                <div className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  {t('populationServed')}
                </div>
              </div>
            </Card>
            <Card variant="glass">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 sm:mb-3">
                  24/7
                </div>
                <div className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
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
