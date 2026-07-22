import React from 'react';
import { Card } from '@/components/ui';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen p-lg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-headline-lg font-bold text-on-surface mb-lg">
          Privacy Policy
        </h1>
        <Card>
          <div className="prose max-w-none">
            <p className="text-body-lg text-on-surface-variant mb-md">
              Ethiopian Ministry of Health is committed to protecting your privacy
              and ensuring the security of your personal information.
            </p>
            <h2 className="text-headline-md font-bold text-on-surface mt-lg mb-md">
              Data Collection
            </h2>
            <p className="text-body-md text-on-surface-variant">
              We collect only necessary information to provide health intelligence
              services and improve healthcare delivery across Ethiopia.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPage;
