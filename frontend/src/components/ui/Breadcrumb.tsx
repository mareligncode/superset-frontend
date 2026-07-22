import React from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-sm text-label-md">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const content = (
            <>
              {item.icon && (
                <span className="material-symbols-outlined text-sm mr-xs">
                  {item.icon}
                </span>
              )}
              {item.label}
            </>
          );

          return (
            <li key={index} className="flex items-center gap-sm">
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="text-on-surface-variant hover:text-primary transition-colors inline-flex items-center"
                >
                  {content}
                </Link>
              ) : (
                <span
                  className={`inline-flex items-center ${
                    isLast ? 'text-on-surface font-medium' : 'text-on-surface-variant'
                  }`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {content}
                </span>
              )}
              {!isLast && (
                <span className="material-symbols-outlined text-on-surface-variant text-sm">
                  chevron_right
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
