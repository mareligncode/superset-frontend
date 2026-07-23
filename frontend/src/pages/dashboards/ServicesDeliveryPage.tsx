import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card, Skeleton } from '@/components/ui';

const ServicesDeliveryPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <BaseDashboardTemplate
      title={t('servicesDeliveryDashboard')}
      subtitle={t('servicesDeliveryOverview')}
      category="Services Delivery"
      showPrimaryTabs={true}
      showSecondaryTabs={true}
    >
      <div className="chart-grid">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} title={`${t('servicesDeliveryMetric')} ${i}`} variant="default">
            <Skeleton variant="rectangular" height="300px" />
          </Card>
        ))}
      </div>
    </BaseDashboardTemplate>
  );
};

export default ServicesDeliveryPage;
