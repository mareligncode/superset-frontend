import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import FilterPanel from '@/components/layout/FilterPanel';

export interface DashboardLayoutProps {
  showFooter?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);

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
          className="flex-1 overflow-y-auto custom-scrollbar bg-surface-container-low"
          style={{
            background: 'linear-gradient(135deg, #f8f9ff 0%, #eff4ff 50%, #f0f8ff 100%)',
          }}
        >
          {/* Mobile Filter Toggle */}
          <div className="md:hidden p-3 border-b border-outline-variant bg-white">
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

          {/* FAB: Amazing Ask AI gradient pill badge */}
          <button
            className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-full shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_24px_rgba(37,99,235,0.5)] flex items-center gap-2.5 font-bold text-[12.5px] tracking-wide hover:scale-105 active:scale-95 transition-all z-40 cursor-pointer border border-white/20 hover:brightness-105"
            aria-label="Ask AI"
          >
            {/* Glowing Pulse Dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300"></span>
            </span>
            <span className="material-symbols-outlined text-[16px] animate-pulse">sparkles</span>
            <span>Ask AI</span>
          </button>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
