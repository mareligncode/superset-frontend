import React from 'react';
import { Link } from 'react-router-dom';

export interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-slate-50 border-t border-slate-200 py-4 sm:py-6 ${className}`}>
      <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 max-w-7xl mx-auto gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] sm:text-[13px] font-bold text-slate-800 text-center sm:text-left">
            © {currentYear} Ethiopian Ministry of Health. All rights reserved.
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
          <Link
            to="/privacy"
            className="text-slate-600 text-[11px] sm:text-[13px] hover:text-blue-600 underline transition-all"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-slate-600 text-[11px] sm:text-[13px] hover:text-blue-600 underline transition-all"
          >
            Terms of Service
          </Link>
          <Link
            to="/data-governance"
            className="text-slate-600 text-[11px] sm:text-[13px] hover:text-blue-600 underline transition-all"
          >
            Data Governance
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
