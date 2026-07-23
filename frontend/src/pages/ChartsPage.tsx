import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, EmptyState } from '@/components/ui';

const ChartsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen p-lg">
      <div className="max-w-max_width mx-auto">
        <h1 className="text-headline-lg font-bold text-on-surface mb-lg">
          {t('chartsLibrary')}
        </h1>
        <Card>
          <EmptyState
            icon="bar_chart"
            title={t('chartsLibraryComingSoon')}
            description={t('chartsLibraryDescription')}
          />
        </Card>
      </div>
    </div>
  );
};

export default ChartsPage;
