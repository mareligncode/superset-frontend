import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { ThemeToggle } from '@/components/ui';
import mohLogo from '@/assets/logog.webp';

export interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const moreOptionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
      if (moreOptionsRef.current && !moreOptionsRef.current.contains(e.target as Node)) {
        setMoreOptionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: t('dashboards'), to: '/dashboards' },
  ];

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [liveTime, setLiveTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatEATTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Africa/Nairobi'
    });
  };

  return (
    <>
      <header className={`sticky top-0 z-[1000] bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 ${className}`}>
        <div className="flex items-center justify-between h-12 sm:h-14 md:h-16 px-2 sm:px-3 md:px-4 lg:px-6 w-full max-w-[1920px] mx-auto overflow-x-hidden">

          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0 min-w-fit">
            <img
              src={mohLogo}
              alt="Ministry of Health"
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:w-9 md:h-9 object-contain"
            />
            <span className="hidden sm:block text-[11px] sm:text-xs md:text-sm lg:text-base font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
              Ethiopia MoH
            </span>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  isActive(link.to)
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">

            {/* Time - Desktop Only */}
            <div className="hidden lg:flex items-center gap-1.5 px-2 sm:px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] sm:text-xs font-medium text-slate-600 dark:text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              {formatEATTime(liveTime)}
            </div>

            {/* Search - Desktop */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              aria-label="Search"
            >
              <span className="material-symbols-outlined text-[16px] sm:text-[18px]">search</span>
            </button>

            {/* Theme Toggle - Desktop */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Language Switcher - Desktop */}
            <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 sm:px-2 py-1 text-[10px] sm:text-xs font-semibold rounded transition-colors ${
                  language === 'en'
                    ? 'bg-white dark:bg-slate-700 text-blue-600'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('am')}
                className={`px-1.5 sm:px-2 py-1 text-[10px] sm:text-xs font-semibold rounded transition-colors ${
                  language === 'am'
                    ? 'bg-white dark:bg-slate-700 text-blue-600'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                አማ
              </button>
            </div>

            {/* Settings Dropdown */}
            <div className="relative hidden md:block" ref={settingsRef}>
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg transition-colors text-[10px] sm:text-xs font-semibold ${
                  settingsOpen
                    ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700'
                    : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-transparent hover:border-blue-200 dark:hover:border-blue-700'
                }`}
              >
                <span className="material-symbols-outlined text-[14px] sm:text-[16px]">settings</span>
                <span className="hidden sm:inline lg:inline">Settings</span>
                <span className="lg:hidden sm:inline">Set</span>
              </button>

              {settingsOpen && (
                <div className="fixed right-4 top-16 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xl py-1 z-[9999] text-xs font-medium text-slate-800 dark:text-slate-200">
                  <button className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">tune</span>
                    <span>Preferences</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">palette</span>
                    <span>Appearance</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">language</span>
                    <span>Language</span>
                  </button>
                </div>
              )}
            </div>

            {/* More Options (...) Dropdown */}
            <div className="relative hidden md:block" ref={moreOptionsRef}>
              <button
                onClick={() => setMoreOptionsOpen(!moreOptionsOpen)}
                className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg transition-colors text-xs font-semibold ${
                  moreOptionsOpen
                    ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">more_horiz</span>
              </button>

              {moreOptionsOpen && (
                <div className="fixed right-4 top-16 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xl py-1 z-[9999] text-xs font-medium text-slate-800 dark:text-slate-200">
                  <button className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                    <span>Full Screen</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">refresh</span>
                    <span>Refresh</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Download</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">print</span>
                    <span>Print</span>
                  </button>
                  <div className="border-t border-slate-200 dark:border-slate-700 my-1"></div>
                  <button className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">share</span>
                    <span>Share</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 sm:p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-700 dark:text-slate-300"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 w-full overflow-hidden">
            <div className="p-4 space-y-3">
              
              {/* Mobile Navigation */}
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3.5 min-h-[48px] flex items-center text-sm font-semibold rounded-lg transition-colors ${
                      isActive(link.to)
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Search */}
              <button
                onClick={() => {
                  setSearchModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-3.5 min-h-[48px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                Search
              </button>

              {/* Mobile Theme Toggle */}
              <div className="sm:hidden flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Theme</span>
                <ThemeToggle />
              </div>

              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex-1 whitespace-nowrap">Language</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`min-h-[40px] min-w-[40px] px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                      language === 'en' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('am')}
                    className={`min-h-[40px] min-w-[40px] px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                      language === 'am' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    አማ
                  </button>
                </div>
              </div>

              {/* Mobile Settings */}
              <button
                className="w-full flex items-center gap-2 px-4 py-3.5 min-h-[48px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <span className="material-symbols-outlined text-[18px]">settings</span>
                Settings
              </button>

              {/* Mobile Time Display */}
              <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  East Africa Time
                </span>
                <span className="ml-auto text-sm font-bold text-slate-800 dark:text-slate-200">
                  {formatEATTime(liveTime)}
                </span>
              </div>

            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          style={{ top: '56px' }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Search Modal */}
      {searchModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 z-[100] p-4"
          onClick={() => setSearchModalOpen(false)}
        >
          <div 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 p-4 border-b border-slate-200 dark:border-slate-700">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[20px]">search</span>
              <input
                type="text"
                placeholder="Search indicators, dashboards, regions..."
                className="w-full text-sm font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 bg-transparent border-none outline-none"
                autoFocus
              />
              <button 
                onClick={() => setSearchModalOpen(false)}
                className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 px-2 py-1 border border-slate-300 dark:border-slate-600 rounded"
              >
                ESC
              </button>
            </div>

            {/* Search Results */}
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-8">
                Start typing to search...
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
