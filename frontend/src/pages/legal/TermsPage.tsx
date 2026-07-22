import React from 'react';
import { Card } from '@/components/ui';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen p-lg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-headline-lg font-bold text-on-surface mb-lg">
          Terms of Service
        </h1>
        <Card>
          <div className="prose max-w-none">
            <p className="text-body-lg text-on-surface-variant mb-md">
              Please read these terms carefully before using the Ethiopian Ministry
              of Health dashboard system.
            </p>
            <h2 className="text-headline-md font-bold text-on-surface mt-lg mb-md">
              Usage Terms
            </h2>
            <p className="text-body-md text-on-surface-variant">
              This system is intended for authorized healthcare professionals and
              government officials only.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TermsPage;
