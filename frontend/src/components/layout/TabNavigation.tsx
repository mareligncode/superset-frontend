import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export interface TabNavigationProps {
  tabs: string[];
  defaultTab?: string;
  onTabChange?: (tab: string) => void;
  /** 'primary' = top-level category tabs (underline style, white bar)
   *  'secondary' = sub-category tabs (smaller, pill style below primary) */
  variant?: 'primary' | 'secondary';
  /** Optional path map so clicking a tab navigates */
  tabPaths?: Record<string, string>;
  className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  defaultTab,
  onTabChange,
  variant = 'primary',
  tabPaths,
  className = '',
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
    if (tabPaths?.[tab]) {
      navigate(tabPaths[tab]);
    }
  };

  // For primary tabs: determine active by current path if tabPaths provided
  const resolvedActive = (() => {
    if (tabPaths) {
      const matched = tabs.find((t) => {
        const p = tabPaths[t];
        return p && location.pathname.includes(p.replace('/dashboards/', ''));
      });
      return matched || activeTab;
    }
    return activeTab;
  })();

  /* ── PRIMARY TABS ─────────────────────────────────────────────────
     White horizontal bar, no outer border/card, tabs separated only
     by the active blue underline. Matches the design's top tab row.
  ─────────────────────────────────────────────────────────────────── */
  if (variant === 'primary') {
    return (
      <div
        className={`bg-white border-b border-outline-variant overflow-x-auto scrollbar-hide shrink-0 ${className}`}
      >
        <div className="flex whitespace-nowrap min-w-max">
          {tabs.map((tab) => {
            const active = tab === resolvedActive;
            return (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`relative px-4 py-3 text-[13px] font-medium transition-colors border-b-2 ${
                  active
                    ? 'text-primary border-primary font-semibold'
                    : 'text-on-surface-variant border-transparent hover:text-on-surface hover:border-outline-variant'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── SECONDARY TABS ───────────────────────────────────────────────
     Smaller, underline style row below the primary tabs.
     Matches "Family Planning | Maternal | Neonatal | NCD …" row.
  ─────────────────────────────────────────────────────────────────── */
  return (
    <div
      className={`border-b border-outline-variant overflow-x-auto scrollbar-hide ${className}`}
    >
      <div className="flex whitespace-nowrap min-w-max px-1">
        {tabs.map((tab) => {
          const active = tab === resolvedActive;
          return (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`relative px-3 py-2 text-[12px] font-medium transition-colors border-b-2 ${
                active
                  ? 'text-primary border-primary font-semibold'
                  : 'text-on-surface-variant border-transparent hover:text-on-surface'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;
