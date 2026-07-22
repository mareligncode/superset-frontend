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
        className={`bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 overflow-x-auto custom-scrollbar touch-pan-x shrink-0 select-none relative ${className}`}
      >
        {/* Mobile scroll cue indicators */}
        <div className="scroll-cue-left md:hidden" />
        <div className="scroll-cue-right md:hidden" />
        
        <div className="flex flex-nowrap min-w-max">
          {tabs.map((tab) => {
            const active = tab === resolvedActive;
            return (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`relative px-3.5 sm:px-5 py-2.5 sm:py-3.5 text-xs sm:text-[13px] font-semibold shrink-0 transition-all duration-200 touch-target ${
                  active
                    ? 'text-blue-600 dark:text-blue-400 tab-active bg-blue-50/20 dark:bg-blue-900/20 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50/60 dark:hover:bg-slate-700/60'
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
      className={`border-b border-slate-200 dark:border-slate-700 overflow-x-auto custom-scrollbar touch-pan-x shrink-0 select-none relative ${className}`}
    >
      {/* Mobile scroll cue indicators */}
      <div className="scroll-cue-left md:hidden" />
      <div className="scroll-cue-right md:hidden" />
      
      <div className="flex flex-nowrap min-w-max px-2">
        {tabs.map((tab) => {
          const active = tab === resolvedActive;
          return (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`relative px-3 sm:px-4 py-2 sm:py-2.5 text-[11.5px] sm:text-[12.5px] font-semibold shrink-0 transition-all duration-200 touch-target ${
                active
                  ? 'text-blue-600 dark:text-blue-400 tab-active font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50/60 dark:hover:bg-slate-700/60 rounded-t-md'
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
