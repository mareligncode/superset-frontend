import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '@/components/ui';
import { ROUTES, PRIMARY_CATEGORIES } from '@/constants';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-xl px-margin">
        <div className="max-w-max_width mx-auto text-center">
          <h1 className="text-display-lg font-bold text-on-surface mb-lg">
            Ethiopian Ministry of Health
          </h1>
          <p className="text-headline-md text-on-surface-variant mb-xl max-w-3xl mx-auto">
            Comprehensive health intelligence system for data-driven decision making
            across all regions of Ethiopia
          </p>
          <div className="flex gap-md justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate(ROUTES.DASHBOARDS)}
            >
              View Dashboards
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate(ROUTES.CHARTS)}
            >
              Explore Charts
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Categories */}
      <section className="py-xl px-margin bg-surface-container-low">
        <div className="max-w-max_width mx-auto">
          <h2 className="text-headline-lg font-bold text-on-surface mb-lg text-center">
            Dashboard Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {PRIMARY_CATEGORIES.map((category) => (
              <Card
                key={category}
                variant="elevated"
                onClick={() => navigate(ROUTES.DASHBOARDS)}
                className="cursor-pointer"
              >
                <div className="flex flex-col items-center text-center p-lg">
                  <span className="material-symbols-outlined text-6xl text-primary mb-md">
                    dashboard
                  </span>
                  <h3 className="text-title-lg font-bold text-on-surface">
                    {category}
                  </h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-xl px-margin">
        <div className="max-w-max_width mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
            <Card variant="glass">
              <div className="text-center">
                <div className="text-headline-lg font-bold text-primary mb-sm">
                  14
                </div>
                <div className="text-body-md text-on-surface-variant">
                  Regions Covered
                </div>
              </div>
            </Card>
            <Card variant="glass">
              <div className="text-center">
                <div className="text-headline-lg font-bold text-secondary mb-sm">
                  16
                </div>
                <div className="text-body-md text-on-surface-variant">
                  Dashboard Categories
                </div>
              </div>
            </Card>
            <Card variant="glass">
              <div className="text-center">
                <div className="text-headline-lg font-bold text-tertiary mb-sm">
                  120M+
                </div>
                <div className="text-body-md text-on-surface-variant">
                  Population Served
                </div>
              </div>
            </Card>
            <Card variant="glass">
              <div className="text-center">
                <div className="text-headline-lg font-bold text-primary mb-sm">
                  24/7
                </div>
                <div className="text-body-md text-on-surface-variant">
                  Real-time Monitoring
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
