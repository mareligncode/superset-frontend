import React from 'react';
import BaseDashboardTemplate from './BaseDashboardTemplate';

const PHCPage: React.FC = () => {
  return (
    <BaseDashboardTemplate
      category="PHC"
      showPrimaryTabs={true}
      showSecondaryTabs={false}
    >
      <div className="w-full h-full bg-white flex items-start justify-center overflow-hidden">
        <img 
          src="/phc-mock.png" 
          alt="PHC Dashboard Mockup" 
          className="w-full object-contain"
        />
      </div>
    </BaseDashboardTemplate>
  );
};

export default PHCPage;
