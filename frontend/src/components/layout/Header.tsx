import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface HeaderProps {
  className?: string;
}

type ThemeMode = 'light' | 'dark' | 'system';

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const [liveTime, setLiveTime] = useState(new Date());
  const [showGregorian, setShowGregorian] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const formatEATTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Africa/Nairobi'
    });
  };

  const getEthiopianDate = (date: Date) => {
    const yearEC = date.getFullYear() - 8;
    return `ሐምሌ 15, ${yearEC} E.C.`;
  };

  const getGregorianDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b border-slate-200 w-full shrink-0 select-none relative ${className}`}
      style={{ boxShadow: '0 2px 8px -4px rgba(0,68,130,0.12)' }}
    >
      <div className="flex items-center justify-between px-3 sm:px-5 h-[56px] w-full">
        {/* ── Left: Dual Logo + Navigation ────────────────────────── */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          {/* Dual Ethiopian Government & MOH Logos */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            {/* Logo 1: FDRE Emblem */}
            <div className="flex items-center gap-1.5">
              <svg viewBox="0 0 100 100" className="w-7 h-7 sm:w-8 sm:h-8 transition-transform group-hover:scale-105 duration-300 shrink-0">
                <defs>
                  <radialGradient id="fdreGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#075985" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#fdreGrad)" stroke="#facc15" strokeWidth="2" />
                <polygon
                  points="50,14 62,38 87,38 67,53 74,78 50,62 26,78 33,53 13,38 38,38"
                  fill="#facc15"
                  stroke="#075985"
                  strokeWidth="1.5"
                />
                <circle cx="50" cy="50" r="8" fill="#0284c7" stroke="#facc15" strokeWidth="1.5" />
              </svg>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[9px] font-bold text-slate-800 tracking-tight">የኢ.ፌ.ዲ.ሪ</span>
                <span className="text-[8.5px] font-black text-sky-700 tracking-wider">FDRE</span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-[1px] h-6 sm:h-7 bg-slate-200 mx-0.5"></div>

            {/* Logo 2: Ministry of Health Emblem */}
            <div className="flex items-center gap-1.5">
              <svg viewBox="0 0 100 100" className="w-7 h-7 sm:w-8 sm:h-8 transition-transform group-hover:scale-105 duration-300 shrink-0">
                <defs>
                  <linearGradient id="mohGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#mohGrad)" stroke="#10b981" strokeWidth="2" />
                <circle cx="50" cy="50" r="32" fill="none" stroke="#ffffff" strokeWidth="3" strokeOpacity="0.8" />
                <line x1="18" y1="50" x2="82" y2="50" stroke="#ffffff" strokeWidth="3" strokeOpacity="0.8" />
                <line x1="50" y1="18" x2="50" y2="82" stroke="#ffffff" strokeWidth="3" strokeOpacity="0.8" />
                <path d="M50,22 L50,78" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
                <path d="M42,34 Q54,42 42,50 T58,66" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[9px] font-bold text-slate-800 tracking-tight">የጤና ሚኒስቴር</span>
                <span className="text-[8.5px] font-black text-emerald-700 tracking-wider">MINISTRY OF HEALTH</span>
              </div>
            </div>
          </Link>

          {/* Live Clock / Calendar Widget with EC/GC Toggle */}
          <div
            onClick={() => setShowGregorian(!showGregorian)}
            className="hidden xl:flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200/80 rounded-full text-[11px] text-slate-600 font-medium cursor-pointer hover:bg-slate-100 transition-colors select-none"
            title="Click to toggle between Ethiopian and Gregorian Calendar"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono text-slate-800">{formatEATTime(liveTime)}</span>
            <span className="text-slate-300">|</span>
            <span>EAT</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-700 font-semibold">{showGregorian ? getGregorianDate(liveTime) : getEthiopianDate(liveTime)}</span>
            <span className="text-[10px] text-slate-400 font-normal hover:text-slate-600">⇄ Toggle</span>
          </div>

          {/* Global Command & Search Button (Desktop) */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-all text-xs font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">search</span>
            <span className="text-[11px] text-slate-600">Search indicators...</span>
            <kbd className="px-1.5 py-0.2 bg-white border border-slate-200 rounded text-[9px] font-mono text-slate-500 shadow-2xs">Ctrl+K</kbd>
          </button>

          {/* Primary Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 ml-1" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1 text-[13px] font-semibold transition-all rounded-md ${
                  isActive(link.to)
                    ? 'text-white font-bold bg-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ── Right: Theme, Settings, & Mobile Hamburger ──────── */}
        <div className="flex items-center gap-2.5">
          {/* User Status Badge */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Federal Admin
          </div>

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

          {/* Settings Dropdown Button */}
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

            {settingsOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150 font-sans">
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

                <div className="my-1.5 border-t border-slate-100"></div>

                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400">
                  About
                </div>
                <div className="px-4 py-1 text-[11.5px] text-slate-500 font-medium">
                  Powered by Apache Superset
                </div>
                <div className="px-4 py-1 text-[11.5px] text-slate-500 font-medium">
                  Version: MoH 6.0
                </div>
              </div>
            )}
          </div>

          {/* Three Dots (...) Options Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className="px-2.5 py-1 rounded-md text-primary hover:bg-blue-50 border border-blue-200 transition-all font-bold text-[13px] flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
              aria-label="More options"
              title="More options"
            >
              •••
            </button>

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
                  onClick={() => {
                    toggleFullscreen();
                    setMoreMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-surface-container-low flex items-center justify-between transition-colors"
                >
                  <span>{isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}</span>
                  <span className="material-symbols-outlined text-[15px] text-slate-400">fullscreen</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu Button with 3 Horizontal Bars (< md) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-800 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer flex items-center justify-center border border-slate-200 shrink-0 bg-white shadow-2xs"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            title="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              /* Close X SVG */
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-slate-800" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              /* Classic 3-Bar Hamburger SVG */
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-slate-800 fill-none" strokeWidth="2.5" strokeLinecap="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile Backdrop Overlay ── */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-[56px] bg-slate-900/40 backdrop-blur-xs z-[90] animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ── Mobile Dropdown Menu Popout (< md) ── */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200/90 shadow-2xl p-4 flex flex-col gap-4 z-[100] animate-slideUp select-none max-h-[85vh] overflow-y-auto">
          {/* Quick Search Input */}
          <button
            onClick={() => {
              setSearchModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 rounded-xl text-slate-700 text-xs font-semibold cursor-pointer shadow-2xs transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-blue-600">search</span>
            <span>Search indicators, regions & dashboards...</span>
            <kbd className="ml-auto px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9.5px] font-mono text-slate-500">Ctrl+K</kbd>
          </button>

          {/* All Dashboard Category Links Grid */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-1">
              Federal Dashboard Modules
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {[
                { label: 'Home', path: '/' },
                { label: 'Services Delivery', path: '/dashboards/services-delivery' },
                { label: 'Health Equity', path: '/dashboards/health-equity' },
                { label: 'Health Workforce', path: '/dashboards/health-workforce' },
                { label: 'Health Financing', path: '/dashboards/health-financing' },
                { label: 'Supply & Logistics', path: '/dashboards/supply-logistics' },
                { label: 'Blood Donation', path: '/dashboards/blood-donation' },
                { label: 'PHEM Outbreak', path: '/dashboards/phem' },
                { label: 'Infrastructure', path: '/dashboards/infrastructure' },
                { label: 'Primary Health Care (PHC)', path: '/dashboards/phc' },
                { label: 'Digital Systems', path: '/dashboards/digital-systems' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100 border border-slate-100'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Time & Ethiopian Calendar Section */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                East Africa Time (EAT)
              </span>
              <span className="font-mono font-bold text-slate-900">{formatEATTime(liveTime)}</span>
            </div>

            <button
              onClick={() => setShowGregorian(!showGregorian)}
              className="flex items-center justify-between text-xs font-semibold text-slate-700 bg-white p-2 rounded-lg border border-slate-200 hover:border-blue-300 transition-all cursor-pointer"
            >
              <span>Date: <strong className="text-blue-700">{showGregorian ? getGregorianDate(liveTime) : getEthiopianDate(liveTime)}</strong></span>
              <span className="text-[10px] text-blue-600 font-bold">⇄ Switch EC/GC</span>
            </button>
          </div>

          {/* Federal User Info & Theme */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">
                FA
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xs font-bold text-slate-800">Federal Administrator</span>
                <span className="text-[9.5px] text-emerald-600 font-semibold mt-0.5">Ethiopia MoH Live Sync</span>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveTheme(activeTheme === 'light' ? 'dark' : 'light');
              }}
              className="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">
                {activeTheme === 'dark' ? 'dark_mode' : 'light_mode'}
              </span>
              <span className="capitalize">{activeTheme}</span>
            </button>
          </div>
        </div>
      )}

      {/* ── Global Search Modal (Cmd + K) ── */}
      {searchModalOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-start justify-center pt-[10vh] z-[100] animate-in fade-in duration-200"
          onClick={() => setSearchModalOpen(false)}
        >
          <div 
            className="bg-white border border-slate-200 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col p-4 animate-in slide-in-from-top-4 duration-200 font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
              <input
                type="text"
                placeholder="Search indicators, regions, or modules..."
                className="w-full text-[13px] text-slate-800 placeholder-slate-400 bg-transparent border-none outline-none focus:ring-0 focus:outline-none"
                autoFocus
                onKeyDown={(e) => { if (e.key === 'Escape') setSearchModalOpen(false); }}
              />
              <button 
                onClick={() => setSearchModalOpen(false)}
                className="text-[10px] text-slate-400 hover:text-slate-600 border border-slate-200 rounded px-1.5 py-0.5 bg-slate-50 cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Popular Indicators */}
            <div className="pt-3">
              <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Popular Indicators</span>
              <div className="flex flex-col gap-1 mt-1.5">
                {[
                  { name: 'Maternal Mortality Ratio (MMR)', category: 'Maternal Health' },
                  { name: 'Neonatal Mortality Rate (NMR)', category: 'Neonatal Health' },
                  { name: 'ANC4 Coverage %', category: 'Services Delivery' },
                  { name: 'PHEM Outbreak Suspected Cases', category: 'PHEM' },
                  { name: 'Blood Bank Units Reactive', category: 'Blood Donation' },
                ].map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSearchModalOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-[12px] text-slate-700 hover:text-primary transition-all text-left cursor-pointer"
                  >
                    <span>{item.name}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-medium">{item.category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="pt-3 border-t border-slate-100 mt-2.5">
              <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Quick Dashboard Links</span>
              <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                {[
                  { name: 'Services Delivery', path: '/dashboards/services-delivery' },
                  { name: 'Health Equity', path: '/dashboards/health-equity' },
                  { name: 'Health Workforce', path: '/dashboards/health-workforce' },
                  { name: 'PHC Status', path: '/dashboards/phc' },
                ].map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSearchModalOpen(false)}
                    className="p-2 rounded-lg hover:bg-slate-50 text-[11.5px] text-slate-700 hover:text-primary border border-slate-100 hover:border-blue-100 transition-all text-left cursor-pointer font-medium"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
