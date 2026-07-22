import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface HeaderProps {
  className?: string;
}

type ThemeMode = 'light' | 'dark' | 'system';

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const location = useLocation();
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ThemeMode>('light');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMoreMenuOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Dashboards', to: '/dashboards' },
    { label: 'Charts', to: '/charts' },
  ];

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b border-outline-variant flex items-center justify-between w-full px-4 h-[50px] shrink-0 select-none ${className}`}
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
    >
      {/* ── Left: Dual Logo + Navigation ────────────────────────── */}
      <div className="flex items-center gap-6">
        {/* Dual Ethiopian Government & MOH Logos */}
        <Link to="/" className="flex items-center gap-2 group">
          {/* Logo 1: FDRE Emblem */}
          <div className="flex items-center gap-1.5">
            <svg viewBox="0 0 100 100" className="w-7 h-7">
              <circle cx="50" cy="50" r="48" fill="#0284c7" />
              {/* Star */}
              <polygon
                points="50,15 61,38 85,38 66,53 73,77 50,62 27,77 34,53 15,38 39,38"
                fill="#facc15"
              />
            </svg>
            <div className="flex flex-col leading-none">
              <span className="text-[8.5px] font-bold text-slate-800 tracking-tight">የኢ.ፌ.ዲ.ሪ</span>
              <span className="text-[8px] font-extrabold text-blue-700 tracking-wider">FDRE</span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-6 bg-slate-200 mx-0.5"></div>

          {/* Logo 2: Ministry of Health Emblem */}
          <div className="flex items-center gap-1.5">
            <svg viewBox="0 0 100 100" className="w-7 h-7">
              <circle cx="50" cy="50" r="48" fill="#0284c7" />
              {/* Globe grid + cross */}
              <circle cx="50" cy="50" r="34" fill="none" stroke="#ffffff" strokeWidth="4" />
              <line x1="16" y1="50" x2="84" y2="50" stroke="#ffffff" strokeWidth="4" />
              <line x1="50" y1="16" x2="50" y2="84" stroke="#ffffff" strokeWidth="4" />
            </svg>
            <div className="flex flex-col leading-none">
              <span className="text-[8.5px] font-bold text-slate-800 tracking-tight">ጤና ሚኒስቴር</span>
              <span className="text-[8px] font-extrabold text-blue-900 tracking-wider">MINISTRY OF HEALTH</span>
            </div>
          </div>
        </Link>

        {/* Primary Navigation Links */}
        <nav className="flex items-center gap-1 ml-2" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1 text-[13px] font-semibold transition-colors rounded ${
                isActive(link.to)
                  ? 'text-primary font-bold bg-surface-container-low'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* ── Right: Theme, Settings, & More Options Dropdown ──────── */}
      <div className="flex items-center gap-2">
        {/* Light / Dark / System Theme Dropdown */}
        <div className="relative" ref={themeRef}>
          <button
            onClick={() => setThemeMenuOpen(!themeMenuOpen)}
            className="flex items-center gap-1 px-1.5 py-1 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors cursor-pointer"
            aria-label="Theme options"
          >
            <span className="material-symbols-outlined text-[17px] text-blue-600">
              {activeTheme === 'dark' ? 'dark_mode' : activeTheme === 'system' ? 'desktop_windows' : 'light_mode'}
            </span>
            <span className="material-symbols-outlined text-[14px]">expand_more</span>
          </button>

          {/* Theme Dropdown Menu */}
          {themeMenuOpen && (
            <div className="absolute right-0 mt-1 w-44 bg-white border border-outline-variant rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-2 py-1 text-[11px] font-semibold text-slate-400">
                Theme
              </div>

              <div className="flex flex-col gap-0.5 mt-1">
                {/* Light option */}
                <button
                  onClick={() => {
                    setActiveTheme('light');
                    setThemeMenuOpen(false);
                  }}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12.5px] font-medium transition-colors cursor-pointer w-full text-left ${
                    activeTheme === 'light'
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">light_mode</span>
                  <span>Light</span>
                </button>

                {/* Dark option */}
                <button
                  onClick={() => {
                    setActiveTheme('dark');
                    setThemeMenuOpen(false);
                  }}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12.5px] font-medium transition-colors cursor-pointer w-full text-left ${
                    activeTheme === 'dark'
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">dark_mode</span>
                  <span>Dark</span>
                </button>

                {/* Match system option */}
                <button
                  onClick={() => {
                    setActiveTheme('system');
                    setThemeMenuOpen(false);
                  }}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12.5px] font-medium transition-colors cursor-pointer w-full text-left ${
                    activeTheme === 'system'
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
                  <span>Match system</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Settings Dropdown Button — Matches Screenshot */}
        <div className="relative" ref={settingsRef}>
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[13px] font-semibold transition-colors cursor-pointer ${
              settingsOpen ? 'text-blue-600' : 'text-blue-600 hover:bg-blue-50'
            }`}
          >
            <span>Settings</span>
            <span className="material-symbols-outlined text-[14px]">expand_more</span>
          </button>

          {/* Settings Menu Popup — Matches Screenshot Exactly */}
          {settingsOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150 font-sans">
              {/* User Section */}
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400">
                User
              </div>
              <button
                className="w-full text-left px-4 py-1.5 text-[12.5px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setSettingsOpen(false)}
              >
                Info
              </button>
              <button
                className="w-full text-left px-4 py-1.5 text-[12.5px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setSettingsOpen(false)}
              >
                Logout
              </button>

              {/* Divider */}
              <div className="my-1.5 border-t border-slate-100"></div>

              {/* About Section */}
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400">
                About
              </div>
              <div className="px-4 py-1 text-[11.5px] text-slate-500 font-medium">
                Powered by Apache Superset
              </div>
              <div className="px-4 py-1 text-[11.5px] text-slate-500 font-medium">
                Version: MoH 6.0
              </div>
              <div className="px-4 py-1 text-[11.5px] text-slate-500 font-medium">
                SHA: ea34ba19
              </div>
            </div>
          )}
        </div>

        {/* Three Dots (...) Options Button & Interactive Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMoreMenuOpen(!moreMenuOpen)}
            className="px-2.5 py-1 rounded-md text-primary hover:bg-blue-50 border border-blue-200 transition-all font-bold text-[13px] flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
            aria-label="More options"
            title="More options"
          >
            •••
          </button>

          {/* Interactive Dropdown Menu */}
          {moreMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-52 bg-white border border-outline-variant rounded-lg shadow-2xl py-1 z-50 text-[12.5px] font-medium text-slate-800 animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => {
                  window.location.reload();
                  setMoreMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-surface-container-low flex items-center justify-between transition-colors"
              >
                <span>Refresh dashboard</span>
                <span className="material-symbols-outlined text-[15px] text-slate-400">refresh</span>
              </button>

              <button
                onClick={() => setMoreMenuOpen(false)}
                className="w-full text-left px-3 py-2 hover:bg-surface-container-low flex items-center justify-between transition-colors"
              >
                <span>Set auto-refresh</span>
                <span className="material-symbols-outlined text-[15px] text-slate-400">timer</span>
              </button>

              <button
                onClick={() => {
                  toggleFullscreen();
                  setMoreMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-surface-container-low flex items-center justify-between transition-colors"
              >
                <span>{isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}</span>
                <span className="material-symbols-outlined text-[15px] text-slate-400">fullscreen</span>
              </button>

              <div className="my-1 border-t border-outline-variant"></div>

              <button
                onClick={() => setMoreMenuOpen(false)}
                className="w-full text-left px-3 py-2 hover:bg-surface-container-low flex items-center justify-between transition-colors"
              >
                <span>Download</span>
                <span className="material-symbols-outlined text-[15px] text-slate-400">chevron_right</span>
              </button>

              <button
                onClick={() => setMoreMenuOpen(false)}
                className="w-full text-left px-3 py-2 hover:bg-surface-container-low flex items-center justify-between transition-colors"
              >
                <span>Share</span>
                <span className="material-symbols-outlined text-[15px] text-slate-400">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
