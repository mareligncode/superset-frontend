import React from 'react';
import { Card } from '@/components/ui';

const DataGovernancePage: React.FC = () => {
  return (
    <div className="min-h-screen p-lg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-headline-lg font-bold text-on-surface mb-lg">
          Data Governance
        </h1>
        <Card>
          <div className="prose max-w-none">
            <p className="text-body-lg text-on-surface-variant mb-md">
              Our data governance framework ensures the quality, security, and
              ethical use of health data.
            </p>
            <h2 className="text-headline-md font-bold text-on-surface mt-lg mb-md">
              Data Quality
            </h2>
            <p className="text-body-md text-on-surface-variant mb-md">
              We maintain strict standards for data accuracy, completeness, and
              timeliness.
            </p>
            <h2 className="text-headline-md font-bold text-on-surface mt-lg mb-md">
              Data Security
            </h2>
            <p className="text-body-md text-on-surface-variant">
              All health data is encrypted and stored securely in compliance with
              Ethiopian data protection laws.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DataGovernancePage;
