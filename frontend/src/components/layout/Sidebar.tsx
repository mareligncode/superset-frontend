import React from 'react';
import { IconButton } from '@/components/ui';

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  onClose,
  className = '',
}) => {
  const sidebarLinks = [
    { label: 'Dashboard', icon: 'dashboard', active: true },
    { label: 'Analytics', icon: 'monitoring', active: false },
    { label: 'Reports', icon: 'description', active: false },
    { label: 'Data Sources', icon: 'folder', active: false },
  ];

  const footerLinks = [
    { label: 'Settings', icon: 'settings' },
    { label: 'Help Center', icon: 'help' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto custom-scrollbar fixed md:relative h-full z-50 transition-all duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${className}`}
        style={{ boxShadow: '2px 0 8px rgba(0,0,0,0.03)' }}
      >
        {/* Sidebar Mobile Header */}
        <div className="p-4 border-b border-slate-100 md:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-slate-800">
              Menu
            </h2>
            <IconButton
              icon="close"
              ariaLabel="Close menu"
              onClick={onClose}
              variant="ghost"
            />
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <div className="flex-1 p-3">
          <nav className="space-y-1.5" aria-label="Sidebar navigation">
            {sidebarLinks.map((link) => (
              <button
                key={link.label}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer group text-left ${
                  link.active
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {/* Icon Container */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    link.active
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:scale-105'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {link.icon}
                  </span>
                </div>

                <span className="text-[13px] font-medium leading-none">
                  {link.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer Section */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <div className="space-y-1">
            {footerLinks.map((link) => (
              <button
                key={link.label}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 cursor-pointer group text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100/80 text-slate-500 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:scale-105 transition-all">
                  <span className="material-symbols-outlined text-[18px]">
                    {link.icon}
                  </span>
                </div>
                <span className="text-[13px] font-medium leading-none">
                  {link.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
