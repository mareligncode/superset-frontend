import React from 'react';
import { Link } from 'react-router-dom';

export interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-surface border-t border-outline-variant py-lg ${className}`}>
      <div className="flex flex-col md:flex-row justify-between items-center px-margin max-w-max_width mx-auto gap-md">
        <div className="flex items-center gap-sm">
          <span className="text-label-md font-bold text-on-surface">
            © {currentYear} Ethiopian Ministry of Health. All rights reserved.
          </span>
        </div>
        <div className="flex gap-lg">
          <Link
            to="/privacy"
            className="text-on-surface-variant text-label-md font-label-md hover:text-primary underline transition-all"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-on-surface-variant text-label-md font-label-md hover:text-primary underline transition-all"
          >
            Terms of Service
          </Link>
          <Link
            to="/data-governance"
            className="text-on-surface-variant text-label-md font-label-md hover:text-primary underline transition-all"
          >
            Data Governance
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
