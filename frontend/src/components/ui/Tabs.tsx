import React, { useState } from 'react';

export interface Tab {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills';
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  onChange,
  variant = 'default',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  if (variant === 'pills') {
    return (
      <div className={`flex items-center gap-sm ${className}`} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            disabled={tab.disabled}
            onClick={() => handleTabChange(tab.id)}
            className={`px-md py-sm rounded-full text-label-md font-label-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              activeTab === tab.id
                ? 'bg-primary-container text-on-primary-container font-bold'
                : 'hover:bg-surface-container text-on-surface-variant'
            }`}
          >
            {tab.icon && (
              <span className="material-symbols-outlined text-sm mr-xs">
                {tab.icon}
              </span>
            )}
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`border-b border-outline-variant ${className}`} role="tablist">
      <div className="flex gap-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            disabled={tab.disabled}
            onClick={() => handleTabChange(tab.id)}
            className={`px-md py-lg text-label-md font-label-md transition-colors relative disabled:opacity-50 disabled:cursor-not-allowed ${
              activeTab === tab.id
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            {tab.icon && (
              <span className="material-symbols-outlined text-sm mr-xs">
                {tab.icon}
              </span>
            )}
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
