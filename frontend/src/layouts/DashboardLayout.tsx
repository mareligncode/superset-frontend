import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import FilterPanel from '@/components/layout/FilterPanel';
import { useTheme } from '@/contexts/ThemeContext';

export interface DashboardLayoutProps {
  showFooter?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Top Header */}
      <Header />

      {/* Body: FilterPanel + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Filter Panel */}
        <FilterPanel
          isOpen={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
        />

        {/* Main scrollable content area */}
        <main
          className="flex-1 overflow-y-auto custom-scrollbar relative"
          style={{
            background:
              resolvedTheme === 'dark'
                ? 'linear-gradient(135deg, #0b1c30 0%, #0f2440 50%, #0d1f38 100%)'
                : 'linear-gradient(135deg, #f8f9ff 0%, #eff4ff 50%, #f0f8ff 100%)',
          }}
        >
          {/* Mobile Filter Toggle */}
          <div className="md:hidden p-3 border-b border-outline-variant bg-surface">
            <button
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className="flex items-center gap-2 text-[13px] text-primary font-medium"
              aria-label="Toggle filters"
            >
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filters
            </button>
          </div>

          {/* Dashboard page content */}
          <Outlet />

          {/* ── Premium Ask AI FAB ────────────────────────────────── */}
          <button
            className="ask-ai-fab"
            aria-label="Ask AI Assistant"
            title="Ask the AI Health Assistant"
          >
            {/* Live status dot */}
            <span className="ask-ai-fab-dot">
              <span className="ask-ai-fab-dot-ring" />
              <span className="ask-ai-fab-dot-inner" />
            </span>

            {/* Sparkle icon */}
            <span className="material-symbols-outlined ask-ai-fab-icon">auto_awesome</span>

            {/* Label */}
            <span>Ask AI</span>
          </button>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
