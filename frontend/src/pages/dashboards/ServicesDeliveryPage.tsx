import React from 'react';
import BaseDashboardTemplate from './BaseDashboardTemplate';
import { Card, Skeleton } from '@/components/ui';

const ServicesDeliveryPage: React.FC = () => {
  return (
    <BaseDashboardTemplate
      title="Services Delivery Dashboard"
      subtitle="Overview of health service delivery across all programs"
      category="Services Delivery"
      showPrimaryTabs={true}
      showSecondaryTabs={true}
    >
      <div className="chart-grid">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} title={`Services Delivery Metric ${i}`} variant="default">
            <Skeleton variant="rectangular" height="300px" />
          </Card>
        ))}
      </div>
    </BaseDashboardTemplate>
  );
};

export default ServicesDeliveryPage;
