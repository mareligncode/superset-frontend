import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';

export interface MainLayoutProps {
  showSidebar?: boolean;
  showFooter?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  showSidebar = true,
  showFooter = true,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
