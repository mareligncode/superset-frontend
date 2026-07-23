import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@/components/ui';
import { ROUTES } from '@/constants';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-lg">
      <EmptyState
        icon="error"
        title={t('pageNotFound')}
        description={t('pageNotFoundDescription')}
        action={{
          label: t('goBackHome'),
          onClick: () => navigate(ROUTES.HOME),
        }}
      />
    </div>
  );
};

export default NotFoundPage;
