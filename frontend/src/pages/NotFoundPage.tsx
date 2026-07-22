import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from '@/components/ui';
import { ROUTES } from '@/constants';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-lg">
      <EmptyState
        icon="error"
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        action={{
          label: 'Go to Home',
          onClick: () => navigate(ROUTES.HOME),
        }}
      />
    </div>
  );
};

export default NotFoundPage;
