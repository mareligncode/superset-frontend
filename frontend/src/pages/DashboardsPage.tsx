import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui';
import { DASHBOARD_METADATA } from '@/constants';

const DashboardsPage: React.FC = () => {
  const navigate = useNavigate();

  const dashboards = Object.entries(DASHBOARD_METADATA).map(([path, meta]) => ({
    path,
    ...meta,
  }));

  // Group dashboards by category
  const groupedDashboards = dashboards.reduce((acc, dashboard) => {
    if (!acc[dashboard.category]) {
      acc[dashboard.category] = [];
    }
    acc[dashboard.category].push(dashboard);
    return acc;
  }, {} as Record<string, typeof dashboards>);

  return (
    <div className="space-y-xl pb-xl">
      <div>
        <h1 className="text-headline-lg font-bold text-on-surface mb-sm">
          All Dashboards
        </h1>
        <p className="text-body-lg text-on-surface-variant">
          Browse and access all available health intelligence dashboards
        </p>
      </div>

      {Object.entries(groupedDashboards).map(([category, dashboards]) => (
        <section key={category}>
          <h2 className="text-headline-md font-bold text-on-surface mb-lg">
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {dashboards.map((dashboard) => (
              <Card
                key={dashboard.path}
                variant="elevated"
                onClick={() => navigate(dashboard.path)}
                className="cursor-pointer"
              >
                <div className="flex flex-col">
                  <div className="flex items-start justify-between mb-md">
                    <span className="material-symbols-outlined text-4xl text-primary">
                      monitoring
                    </span>
                  </div>
                  <h3 className="text-title-lg font-bold text-on-surface mb-sm">
                    {dashboard.title}
                  </h3>
                  <p className="text-body-md text-on-surface-variant">
                    {dashboard.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default DashboardsPage;
