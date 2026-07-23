import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui';
import { DASHBOARD_METADATA } from '@/constants';

const DashboardsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dashboards = Object.entries(DASHBOARD_METADATA).map(([path, meta]) => ({
    path,
    ...meta,
  }));

  const groupedDashboards = dashboards.reduce((acc, dashboard) => {
    if (!acc[dashboard.category]) {
      acc[dashboard.category] = [];
    }
    acc[dashboard.category].push(dashboard);
    return acc;
  }, {} as Record<string, typeof dashboards>);

  return (
    <div className="space-y-8 sm:space-y-12 pb-8 sm:pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2 sm:mb-3">
          {t('allDashboards')}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
          {t('browseDashboards')}
        </p>
      </div>

      {Object.entries(groupedDashboards).map(([category, dashboards]) => {
        const key = category.toLowerCase().replace(/ /g, '');
        return (
          <section key={category}>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 sm:mb-6">
              {t(key) || category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {dashboards.map((dashboard) => (
                <Card
                  key={dashboard.path}
                  variant="elevated"
                  onClick={() => navigate(dashboard.path)}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <span className="material-symbols-outlined text-3xl sm:text-4xl text-blue-600 dark:text-blue-400">
                        monitoring
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 sm:mb-3">
                      {(() => {
                        const titleKey = dashboard.title.toLowerCase().replace(/[^a-z0-9]/g, '').replace('dashboard', 'Dashboard');
                        const translated = t(titleKey);
                        return translated !== titleKey ? translated : dashboard.title;
                      })()}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                      {(() => {
                        const descKey = dashboard.title.toLowerCase().replace(/[^a-z0-9]/g, '').replace('dashboard', 'Description');
                        const translated = t(descKey);
                        return translated !== descKey ? translated : dashboard.description;
                      })()}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default DashboardsPage;
