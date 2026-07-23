import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';

export interface MainLayoutProps {
  showSidebar?: boolean;
  showFooter?: boolean;
}

/**
 * MainLayout — Premium main layout with optional sidebar and footer
 * Features: Refined gradient backgrounds, smooth transitions, elegant spacing
 */
const MainLayout: React.FC<MainLayoutProps> = ({
  showSidebar = true,
  showFooter = true,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-all duration-300">
      {/* Premium Header */}
      <Header />
      
      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Premium Main Content with refined background */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-gradient-to-b from-transparent to-slate-50/50 dark:to-slate-900/50">
          <div className="animate-fadeIn">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Premium Footer */}
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
