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
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const shareRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMoreMenuOpen(false);
        setDownloadMenuOpen(false);
        setShareMenuOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
      if (downloadRef.current && !downloadRef.current.contains(e.target as Node)) {
        setDownloadMenuOpen(false);
      }
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShareMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: t('home'), to: '/' },
    { label: t('dashboards'), to: '/dashboards' },
    { label: t('charts'), to: '/charts' },
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

  const handleDownloadPDF = () => {
    window.print();
    setDownloadMenuOpen(false);
    setMoreMenuOpen(false);
  };

  const handleDownloadImage = () => {
    // Capture current page as image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      ctx.scale(2, 2);
      ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const link = document.createElement('a');
      link.download = 'dashboard_screenshot.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
    setDownloadMenuOpen(false);
    setMoreMenuOpen(false);
  };

  const handleDownloadCSV = () => {
    // Create CSV from current data (placeholder)
    const csvContent = 'data:text/csv;charset=utf-8,Indicator,Value,Region\nMaternal Mortality,412,Addis Ababa\nANC4 Coverage,65,Amhara';
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'dashboard_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadMenuOpen(false);
    setMoreMenuOpen(false);
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    setShareMenuOpen(false);
    setMoreMenuOpen(false);
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent('Ethiopia MoH Health Dashboard');
    const body = encodeURIComponent(`Check out this health dashboard: ${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setShareMenuOpen(false);
    setMoreMenuOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
    setShareMenuOpen(false);
    setMoreMenuOpen(false);
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
      className={`sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 w-full shrink-0 select-none relative ${className}`}
      style={{ 
        boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px -4px rgba(0,92,184,0.08)',
        transition: 'all 0.2s ease'
      }}
    >
      <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 h-[58px] sm:h-[62px] w-full max-w-[1920px] mx-auto">
        {/* ── Left: Premium Dual Logo + Navigation ────────────────────────── */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-5 lg:gap-7">
          {/* Enhanced Dual Ethiopian Government & MOH Logos */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2.5 group shrink-0">
            {/* Logo 1: FDRE Emblem - Enhanced */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="relative">
                <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 transition-all duration-300 group-hover:scale-110 shrink-0 drop-shadow-sm">
                  <defs>
                    <radialGradient id="fdreGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#0ea5e9" />
                      <stop offset="100%" stopColor="#0369a1" />
                    </radialGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <circle cx="50" cy="50" r="47" fill="url(#fdreGrad)" stroke="#fbbf24" strokeWidth="2.5" filter="url(#glow)" />
                  <polygon
                    points="50,16 61,36 84,36 66,51 72,74 50,60 28,74 34,51 16,36 39,36"
                    fill="#fbbf24"
                    stroke="#0369a1"
                    strokeWidth="1.8"
                  />
                  <circle cx="50" cy="50" r="9" fill="#0ea5e9" stroke="#fbbf24" strokeWidth="1.8" />
                </svg>
                <div className="absolute inset-0 bg-sky-400/20 rounded-full blur-xl group-hover:bg-sky-400/30 transition-all duration-300 -z-10"></div>
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 tracking-tight">የኢ.ፌ.ዲ.ሪ</span>
                <span className="text-[9.5px] font-black text-sky-700 dark:text-sky-400 tracking-wider mt-0.5">FDRE</span>
              </div>
            </div>

            {/* Elegant Divider */}
            <div className="hidden sm:block w-[1.5px] h-6 sm:h-7 md:h-8 bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-600 to-transparent mx-1"></div>

            {/* Logo 2: Ministry of Health Emblem (logo.webp) */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="relative">
                <img
                  src={mohLogo}
                  alt="Ministry of Health Logo"
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain transition-all duration-300 group-hover:scale-110 shrink-0 drop-shadow-md"
                />
                <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl group-hover:bg-emerald-400/30 transition-all duration-300 -z-10"></div>
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 tracking-tight">የጤና ሚኒስቴር</span>
                <span className="text-[9.5px] font-black text-emerald-700 dark:text-emerald-400 tracking-wider mt-0.5">MINISTRY OF HEALTH</span>
              </div>
            </div>
          </Link>

          {/* Premium Live Clock / Calendar Widget with EC/GC Toggle */}
          <div
            onClick={() => setShowGregorian(!showGregorian)}
            className="hidden xl:flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-slate-50/80 to-slate-100/60 dark:from-slate-800/80 dark:to-slate-700/60 border border-slate-200/80 dark:border-slate-600/60 rounded-xl text-[11.5px] text-slate-600 dark:text-slate-300 font-semibold cursor-pointer hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-sm transition-all duration-200 select-none group"
            title="Click to toggle between Ethiopian and Gregorian Calendar"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-400"></span>
              <span className="font-mono text-[13px] font-bold text-slate-900 dark:text-slate-100 tracking-tight">{formatEATTime(liveTime)}</span>
            </div>
            <div className="w-[1px] h-4 bg-slate-300 dark:bg-slate-600"></div>
            <span className="text-[10.5px] text-slate-500 dark:text-slate-400">EAT</span>
            <div className="w-[1px] h-4 bg-slate-300 dark:bg-slate-600"></div>
            <span className="text-slate-800 dark:text-slate-200 font-bold tracking-tight">{showGregorian ? getGregorianDate(liveTime) : getEthiopianDate(liveTime)}</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">⇄</span>
          </div>

          {/* Premium Global Command & Search Button (Desktop) */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="hidden lg:flex items-center gap-2.5 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 dark:hover:from-blue-950/40 dark:hover:to-sky-950/40 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 text-[13px] font-semibold cursor-pointer shadow-sm hover:shadow-md group"
          >
            <span className="material-symbols-outlined text-[16px] group-hover:scale-110 transition-transform">search</span>
            <span className="hidden xl:inline text-[12px] text-slate-600 dark:text-slate-300 font-medium">Quick Search</span>
            <kbd className="hidden lg:inline px-2 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-[10px] font-mono text-slate-500 dark:text-slate-400 shadow-sm">⌘K</kbd>
          </button>

          {/* Premium Primary Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 ml-1" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 text-[13px] font-bold transition-all duration-200 rounded-xl ${
                  isActive(link.to)
                    ? 'text-white bg-gradient-to-r from-blue-600 to-sky-600 shadow-md shadow-blue-500/30 scale-105'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ── Right: Premium Theme, Settings, & Actions ──────── */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Premium User Status Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-700/60 rounded-xl text-[11px] font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-400"></span>
            <span className="hidden md:inline">{t('federalAdmin')}</span>
            <span className="md:hidden">Admin</span>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Premium Settings Dropdown Button */}
          <div className="relative hidden sm:block" ref={settingsRef}>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-bold transition-all duration-200 shadow-sm ${
                settingsOpen 
                  ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700' 
                  : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-transparent hover:border-blue-200 dark:hover:border-blue-700'
              }`}
            >
              <span className="hidden lg:inline">Settings</span>
              <span className="lg:hidden">Set</span>
              <span className="material-symbols-outlined text-[15px] transition-transform duration-200" style={{ transform: settingsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
            </button>

            {settingsOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl py-2 z-50 animate-fadeIn">
                <div className="px-4 py-2 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {t('language')}
                </div>
                <button
                  onClick={() => setLanguage('en')}
                  className={`w-full text-left px-4 py-2.5 text-[13px] font-semibold transition-all duration-150 flex items-center gap-3 ${
                    language === 'en'
                      ? 'text-blue-700 dark:text-blue-300 bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 border-l-4 border-blue-600'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border-l-4 border-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">language</span>
                  {t('english')}
                  {language === 'en' && <span className="ml-auto text-blue-600">✓</span>}
                </button>
                <button
                  onClick={() => setLanguage('am')}
                  className={`w-full text-left px-4 py-2.5 text-[13px] font-semibold transition-all duration-150 flex items-center gap-3 ${
                    language === 'am'
                      ? 'text-blue-700 dark:text-blue-300 bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 border-l-4 border-blue-600'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border-l-4 border-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">translate</span>
                  {t('amharic')}
                  {language === 'am' && <span className="ml-auto text-blue-600">✓</span>}
                </button>

                <div className="my-2 border-t border-slate-200 dark:border-slate-700"></div>

                <div className="px-4 py-2 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {t('userSection')}
                </div>
                <button
                  className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-150 flex items-center gap-3"
                  onClick={() => setSettingsOpen(false)}
                >
                  <span className="material-symbols-outlined text-[16px]">person</span>
                  {t('profile')}
                </button>
                <button
                  className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-150 flex items-center gap-3"
                  onClick={() => setSettingsOpen(false)}
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  {t('logout')}
                </button>

                <div className="my-2 border-t border-slate-200 dark:border-slate-700"></div>

                <div className="px-4 py-2 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {t('about')}
                </div>
                <div className="px-4 py-1.5 text-[11.5px] text-slate-500 dark:text-slate-400 font-medium">
                  {t('poweredBy')}
                </div>
                <div className="px-4 py-1.5 text-[11.5px] text-slate-500 dark:text-slate-400 font-medium">
                  {t('version')}
                </div>
              </div>
            )}
          </div>

          {/* Premium Three Dots (...) Options Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className="px-3 py-2 rounded-xl text-blue-600 dark:text-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 dark:hover:from-blue-950/40 dark:hover:to-sky-950/40 border border-blue-200/60 dark:border-blue-700/60 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 font-black text-[14px] flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md active:scale-95"
              aria-label="More options"
              title="More options"
            >
              <span className="tracking-wider">•••</span>
            </button>

            {moreMenuOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl py-2 z-50 text-[13px] font-semibold text-slate-800 dark:text-slate-200 animate-fadeIn">
                <button
                  onClick={() => {
                    window.location.reload();
                    setMoreMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between transition-all duration-150 group"
                >
                  <span className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px] text-blue-600 dark:text-blue-400 group-hover:rotate-180 transition-transform duration-300">refresh</span>
                    <span>{t('refreshDashboard')}</span>
                  </span>
                </button>

                <div className="relative" ref={downloadRef}>
                  <button
                    onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between transition-all duration-150"
                  >
                    <span className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[18px] text-emerald-600 dark:text-emerald-400">download</span>
                      <span>{t('download')}</span>
                    </span>
                    <span className="material-symbols-outlined text-[14px] text-slate-400 transition-transform duration-200" style={{ transform: downloadMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                  </button>

                  {downloadMenuOpen && (
                    <div className="absolute right-full top-0 mr-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl py-2 z-[60] text-[13px] font-semibold text-slate-800 dark:text-slate-200 animate-fadeIn">
                      <button
                        onClick={handleDownloadPDF}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-all duration-150"
                      >
                        <span className="material-symbols-outlined text-[18px] text-red-600 dark:text-red-400">picture_as_pdf</span>
                        <span>{t('downloadPDF')}</span>
                      </button>
                      <button
                        onClick={handleDownloadImage}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-all duration-150"
                      >
                        <span className="material-symbols-outlined text-[18px] text-purple-600 dark:text-purple-400">image</span>
                        <span>{t('downloadImage')}</span>
                      </button>
                      <button
                        onClick={handleDownloadCSV}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-all duration-150"
                      >
                        <span className="material-symbols-outlined text-[18px] text-teal-600 dark:text-teal-400">table_chart</span>
                        <span>{t('downloadCSV')}</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="relative" ref={shareRef}>
                  <button
                    onClick={() => setShareMenuOpen(!shareMenuOpen)}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between transition-all duration-150"
                  >
                    <span className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[18px] text-sky-600 dark:text-sky-400">share</span>
                      <span>{t('share')}</span>
                    </span>
                    <span className="material-symbols-outlined text-[14px] text-slate-400 transition-transform duration-200" style={{ transform: shareMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                  </button>

                  {shareMenuOpen && (
                    <div className="absolute right-full top-0 mr-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl py-2 z-[60] text-[13px] font-semibold text-slate-800 dark:text-slate-200 animate-fadeIn">
                      <button
                        onClick={handleShareFacebook}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-all duration-150"
                      >
                        <span className="material-symbols-outlined text-[18px] text-blue-600">facebook</span>
                        <span>{t('shareFacebook')}</span>
                      </button>
                      <button
                        onClick={handleShareEmail}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-all duration-150"
                      >
                        <span className="material-symbols-outlined text-[18px] text-orange-600 dark:text-orange-400">email</span>
                        <span>{t('shareEmail')}</span>
                      </button>
                      <button
                        onClick={handleCopyLink}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-all duration-150"
                      >
                        <span className="material-symbols-outlined text-[18px] text-slate-600 dark:text-slate-400">link</span>
                        <span>{t('copyLink')}</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="my-2 border-t border-slate-200 dark:border-slate-700"></div>

                <button
                  onClick={() => {
                    toggleFullscreen();
                    setMoreMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between transition-all duration-150 group"
                >
                  <span className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px] text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">fullscreen</span>
                    <span>{isFullscreen ? t('exitFullscreen') : t('enterFullscreen')}</span>
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Premium Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 dark:hover:from-blue-950/40 dark:hover:to-sky-950/40 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 cursor-pointer flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md active:scale-95"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            title="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-slate-800 dark:stroke-slate-200" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-slate-800 dark:stroke-slate-200 fill-none" strokeWidth="2.5" strokeLinecap="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Premium Mobile Backdrop Overlay ── */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-[58px] sm:top-[62px] bg-slate-950/80 dark:bg-black/90 backdrop-blur-sm z-[90] animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ── Premium Mobile Dropdown Menu Drawer ── */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[58px] sm:top-[62px] bg-white dark:bg-slate-900 border-t border-b-4 border-blue-600 dark:border-blue-500 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] p-5 flex flex-col gap-5 z-[100] animate-slideIn select-none max-h-[calc(100vh-62px)] overflow-y-auto custom-scrollbar">
          {/* Drawer Header Badge */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <img src={mohLogo} alt="MOH Logo" className="w-5 h-5 object-contain" />
              <span className="text-[12px] font-black tracking-wider uppercase text-slate-800 dark:text-slate-100">
                Navigation & Modules
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close navigation drawer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Main Navigation Links (Home, Dashboards, Charts) */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
              Primary Navigation
            </span>
            <div className="grid grid-cols-3 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-center py-2.5 px-3 rounded-xl text-[13px] font-bold transition-all duration-200 ${
                    isActive(link.to)
                      ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-md shadow-blue-500/30'
                      : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Premium Quick Search */}
          <button
            onClick={() => {
              setSearchModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-950/60 dark:to-sky-950/60 hover:from-blue-100 hover:to-sky-100 dark:hover:from-blue-900/70 dark:hover:to-sky-900/70 border border-blue-200 dark:border-blue-700 rounded-xl text-slate-700 dark:text-slate-200 text-[13px] font-bold cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[20px] text-blue-600 dark:text-blue-400">search</span>
            <span className="flex-1 text-left">Search indicators, regions & dashboards...</span>
            <kbd className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-[10px] font-mono text-slate-500 dark:text-slate-400 shadow-sm">⌘K</kbd>
          </button>

          {/* Premium Dashboard Links Grid */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
              {t('federalDashboardModules')}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: t('home'), path: '/' },
                { label: t('servicesDelivery'), path: '/dashboards/services-delivery' },
                { label: t('healthEquity'), path: '/dashboards/health-equity' },
                { label: t('healthWorkforce'), path: '/dashboards/health-workforce' },
                { label: t('healthFinancing'), path: '/dashboards/health-financing' },
                { label: t('supplyLogistics'), path: '/dashboards/supply-logistics' },
                { label: t('bloodDonation'), path: '/dashboards/blood-donation' },
                { label: t('phemOutbreak'), path: '/dashboards/phem' },
                { label: t('infrastructure'), path: '/dashboards/infrastructure' },
                { label: t('primaryHealthCarePHC'), path: '/dashboards/phc' },
                { label: t('digitalSystems'), path: '/dashboards/digital-systems' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-[13px] font-bold transition-all duration-200 ${
                    location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
                      ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-md shadow-blue-500/30'
                      : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Premium Time & Calendar Section */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100/80 dark:from-slate-800/90 dark:to-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-slate-600 dark:text-slate-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-400" />
                East Africa Time (EAT)
              </span>
              <span className="font-mono font-extrabold text-slate-900 dark:text-slate-100">{formatEATTime(liveTime)}</span>
            </div>

            <button
              onClick={() => setShowGregorian(!showGregorian)}
              className="flex items-center justify-between text-[13px] font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
            >
              <span>Date: <strong className="text-blue-700 dark:text-blue-400">{showGregorian ? getGregorianDate(liveTime) : getEthiopianDate(liveTime)}</strong></span>
              <span className="text-[11px] text-blue-600 dark:text-blue-400 font-extrabold">⇄ EC/GC</span>
            </button>
          </div>

          {/* Premium User Info & Theme */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/80 dark:to-teal-900/80 text-emerald-800 dark:text-emerald-200 font-extrabold text-[13px] flex items-center justify-center border-2 border-emerald-200 dark:border-emerald-700 shadow-sm">
                FA
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[13px] font-extrabold text-slate-800 dark:text-slate-200">Federal Administrator</span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">Ethiopia MoH • Live</span>
              </div>
            </div>

            <ThemeToggle />
          </div>
        </div>
      )}

      {/* ── Premium Global Search Modal (⌘K) ── */}
      {searchModalOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 dark:bg-black/70 backdrop-blur-md flex items-start justify-center pt-[12vh] z-[100] animate-fadeIn"
          onClick={() => setSearchModalOpen(false)}
        >
          <div 
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Premium Search Input */}
            <div className="flex items-center gap-3 p-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[24px]">search</span>
              <input
                type="text"
                placeholder="Search indicators, dashboards, regions..."
                className="w-full text-[15px] font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 bg-transparent border-none outline-none focus:ring-0"
                autoFocus
                onKeyDown={(e) => { if (e.key === 'Escape') setSearchModalOpen(false); }}
              />
              <button 
                onClick={() => setSearchModalOpen(false)}
                className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-all duration-150 shadow-sm"
              >
                ESC
              </button>
            </div>

            {/* Premium Search Results */}
            <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {/* Popular Indicators */}
              <div>
                <span className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2">{t('popularIndicators')}</span>
                <div className="flex flex-col gap-1 mt-2">
                  {[
                    { name: 'Maternal Mortality Ratio (MMR)', category: t('maternalHealth'), icon: 'monitoring', color: 'text-pink-600' },
                    { name: 'Neonatal Mortality Rate (NMR)', category: t('neonatalHealth'), icon: 'child_care', color: 'text-purple-600' },
                    { name: t('anc4Coverage'), category: t('servicesDelivery'), icon: 'health_and_safety', color: 'text-blue-600' },
                    { name: t('phemOutbreakSuspectedCases'), category: 'PHEM', icon: 'emergency', color: 'text-red-600' },
                    { name: t('bloodBankUnitsReactive'), category: t('bloodDonation'), icon: 'water_drop', color: 'text-rose-600' },
                  ].map((item, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setSearchModalOpen(false)}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 dark:hover:from-blue-950/40 dark:hover:to-sky-950/40 text-[13px] text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-150 text-left cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-blue-700 group"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className={`material-symbols-outlined text-[20px] ${item.color} group-hover:scale-110 transition-transform`}>{item.icon}</span>
                        <span className="font-semibold">{item.name}</span>
                      </div>
                      <span className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-lg font-bold group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-all">{item.category}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Dashboard Links */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-4">
                <span className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2">{t('quickDashboardLinks')}</span>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    { name: t('servicesDelivery'), path: '/dashboards/services-delivery', icon: 'local_hospital', color: 'text-blue-600' },
                    { name: t('healthEquity'), path: '/dashboards/health-equity', icon: 'balance', color: 'text-teal-600' },
                    { name: t('healthWorkforce'), path: '/dashboards/health-workforce', icon: 'groups', color: 'text-purple-600' },
                    { name: t('phcStatus'), path: '/dashboards/phc', icon: 'domain', color: 'text-emerald-600' },
                  ].map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={() => setSearchModalOpen(false)}
                      className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-[13px] font-bold text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-150 text-left cursor-pointer flex items-center gap-2 group"
                    >
                      <span className={`material-symbols-outlined text-[18px] ${item.color} group-hover:scale-110 transition-transform`}>{item.icon}</span>
                      <span className="flex-1">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
