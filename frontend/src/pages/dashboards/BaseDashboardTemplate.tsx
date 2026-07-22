import React, { type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PRIMARY_CATEGORIES, SERVICES_DELIVERY_TABS } from '@/constants';

export interface BaseDashboardTemplateProps {
  title?: string;
  subtitle?: string;
  category?: string;
  children: ReactNode;
  showPrimaryTabs?: boolean;
  showSecondaryTabs?: boolean;
  /** Optional data-source notice line (e.g. "The data source is STEPS") */
  dataSourceNote?: string;
  /** Override for the active primary category key */
  activePrimaryTab?: string;
  /** Override for the active secondary tab key */
  activeSecondaryTab?: string;
}

// Path map for primary category tabs
const PRIMARY_TAB_PATHS: Record<string, string> = {
  'Services Delivery':        '/dashboards/services-delivery',
  'Health Equity':            '/dashboards/health-equity',
  'Health Work Force':        '/dashboards/health-workforce',
  'Health Financing':         '/dashboards/health-financing',
  'Supply and Logistics':     '/dashboards/supply-logistics',
  'Blood Donation':           '/dashboards/blood-donation',
  'PHEM':                     '/dashboards/phem',
  'Infrastructure':           '/dashboards/infrastructure',
  'PHC':                      '/dashboards/phc',
  'Digital Systems Monitoring':'/dashboards/digital-systems',
};

// Path map for services delivery secondary tabs
const SECONDARY_TAB_PATHS: Record<string, string> = {
  'Family Planning': '/dashboards/family-planning',
  'Maternal':        '/dashboards/maternal-health',
  'Neonatal':        '/dashboards/neonatal-health',
  'NCD':             '/dashboards/ncd',
  'Malaria':         '/dashboards/malaria',
  'HIV':             '/dashboards/hiv',
  'TB':              '/dashboards/tb',
};

const BaseDashboardTemplate: React.FC<BaseDashboardTemplateProps> = ({
  category,
  children,
  showPrimaryTabs = true,
  showSecondaryTabs = false,
  dataSourceNote,
  activePrimaryTab,
  activeSecondaryTab,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Resolve which primary tab is active from the URL
  const resolvedPrimary = activePrimaryTab || category || (() => {
    const found = Object.entries(PRIMARY_TAB_PATHS).find(([, p]) =>
      location.pathname.startsWith(p),
    );
    return found ? found[0] : PRIMARY_CATEGORIES[0];
  })();

  // Resolve which secondary tab is active from the URL
  const resolvedSecondary = activeSecondaryTab || (() => {
    const found = Object.entries(SECONDARY_TAB_PATHS).find(([, p]) =>
      location.pathname === p || location.pathname.startsWith(p + '/'),
    );
    return found ? found[0] : SERVICES_DELIVERY_TABS[0].label;
  })();

  return (
    <div className="flex flex-col h-full">
      {/* ── Primary category tab bar ─────────────────────────── */}
      {showPrimaryTabs && (
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 overflow-x-auto custom-scrollbar touch-pan-x shrink-0 select-none relative">
          {/* Mobile scroll cue indicators */}
          <div className="scroll-cue-left md:hidden" />
          <div className="scroll-cue-right md:hidden" />
          
          <div className="flex flex-nowrap min-w-max">
            {PRIMARY_CATEGORIES.map((tab) => {
              const active = tab === resolvedPrimary;
              return (
                <button
                  key={tab}
                  onClick={() => navigate(PRIMARY_TAB_PATHS[tab] || '/dashboards')}
                  className={`relative px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-[13px] font-medium shrink-0 transition-colors border-b-2 touch-target ${
                    active
                      ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Secondary sub-category tab bar (Services Delivery) ── */}
      {showSecondaryTabs && (
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 overflow-x-auto custom-scrollbar touch-pan-x shrink-0 select-none relative">
          {/* Mobile scroll cue indicators */}
          <div className="scroll-cue-left md:hidden" />
          <div className="scroll-cue-right md:hidden" />
          
          <div className="flex flex-nowrap min-w-max px-2">
            {SERVICES_DELIVERY_TABS.map(({ label, path }) => {
              const active = label === resolvedSecondary;
              return (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  className={`relative px-2.5 sm:px-3 py-2 sm:py-2.5 text-[11.5px] sm:text-[12.5px] font-medium shrink-0 transition-colors border-b-2 touch-target ${
                    active
                      ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 font-semibold'
                      : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Page content ─────────────────────────────────────── */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        {/* Optional data source note */}
        {dataSourceNote && (
          <p className="text-[12px] text-slate-600 dark:text-slate-400 mb-3">
            The data source is{' '}
            <span className="font-semibold text-slate-900 dark:text-slate-200">{dataSourceNote}</span>
          </p>
        )}

        {/* Dashboard content */}
        {children}
      </div>
    </div>
  );
};

export default BaseDashboardTemplate;
