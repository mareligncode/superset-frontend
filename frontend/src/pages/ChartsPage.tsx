import React from 'react';
import { Card, EmptyState } from '@/components/ui';

const ChartsPage: React.FC = () => {
  return (
    <div className="min-h-screen p-lg">
      <div className="max-w-max_width mx-auto">
        <h1 className="text-headline-lg font-bold text-on-surface mb-lg">
          Charts Library
        </h1>
        <Card>
          <EmptyState
            icon="bar_chart"
            title="Charts Library Coming Soon"
            description="Comprehensive chart library with all visualization types will be available here."
          />
        </Card>
      </div>
    </div>
  );
};

export default ChartsPage;
