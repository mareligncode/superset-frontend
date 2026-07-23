import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import type { ThemeMode } from '@/contexts/ThemeContext';

export interface ThemeToggleProps {
  className?: string;
}

const options: { mode: ThemeMode; icon: string; label: string }[] = [
  { mode: 'light', icon: 'light_mode', label: 'Light' },
  { mode: 'system', icon: 'computer', label: 'System' },
  { mode: 'dark', icon: 'dark_mode', label: 'Dark' },
];

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentOption = options.find(opt => opt.mode === theme) || options[1];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-xs font-medium"
        aria-label="Select theme"
      >
        <span className="material-symbols-outlined text-[16px]">{currentOption.icon}</span>
        <span>{currentOption.label}</span>
        <span className="material-symbols-outlined text-[14px]">expand_more</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xl py-1 z-50 text-xs font-medium text-slate-800 dark:text-slate-200 animate-in fade-in zoom-in-95 duration-150">
          {options.map(({ mode, icon, label }) => (
            <button
              key={mode}
              onClick={() => {
                setTheme(mode);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 flex items-center gap-2 transition-colors ${
                theme === mode 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                  : 'hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
