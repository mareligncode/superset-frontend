import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import FilterPanel from '@/components/layout/FilterPanel';
import { useTheme } from '@/contexts/ThemeContext';

export interface DashboardLayoutProps {
  showFooter?: boolean;
}

/**
 * DashboardLayout — Premium layout for dashboard pages with filter panel
 * Features: Gradient backgrounds, premium Ask AI FAB, smooth animations
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const { t } = useTranslation();
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 overflow-hidden">
      {/* Premium Top Header */}
      <Header />

      {/* Body: FilterPanel + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Enhanced Left Filter Panel */}
        <FilterPanel
          isOpen={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
        />

        {/* Premium Main scrollable content area with refined gradient */}
        <main
          className="flex-1 overflow-y-auto custom-scrollbar relative transition-all duration-300"
          style={{
            background:
              resolvedTheme === 'dark'
                ? 'linear-gradient(135deg, #0a1628 0%, #0f1f35 25%, #0d1b2f 50%, #0b1828 75%, #081420 100%)'
                : 'linear-gradient(135deg, #fafbff 0%, #f5f8ff 25%, #eff4ff 50%, #f0f6ff 75%, #f8faff 100%)',
          }}
        >
          {/* Premium Mobile Filter Toggle */}
          <div className="md:hidden p-4 border-b-2 border-slate-200/60 dark:border-slate-700/60 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl shadow-sm">
            <button
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className="flex items-center gap-2.5 text-[13px] text-blue-700 dark:text-blue-400 font-extrabold bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/30 px-4 py-2.5 rounded-xl border-2 border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
              aria-label={t('filters')}
            >
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
              <span className="uppercase tracking-wider">{t('filters')}</span>
            </button>
          </div>

          {/* Dashboard page content with premium spacing */}
          <div className="animate-fadeIn">
            <Outlet />
          </div>

          {/* ── Premium Enhanced Ask AI FAB with glow effect - Mobile Optimized ────────────────────────────────── */}
          <button
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white px-4 py-3 sm:px-6 sm:py-3.5 rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300 active:scale-95 border-2 border-blue-400/30 backdrop-blur-sm group touch-target"
            aria-label={t('askAiFull')}
            title={t('askAiFull')}
          >
            {/* Enhanced live status dot with pulse */}
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500 shadow-lg shadow-emerald-500/50" />
            </span>

            {/* Premium Sparkle icon with rotation on hover */}
            <span className="material-symbols-outlined text-[20px] sm:text-[24px] group-hover:rotate-12 transition-transform duration-300">
              auto_awesome
            </span>

            {/* Enhanced Label - Hide text on very small screens */}
            <span className="hidden xs:inline font-extrabold text-[12px] sm:text-[14px] uppercase tracking-wider">{t('askAi')}</span>
          </button>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
