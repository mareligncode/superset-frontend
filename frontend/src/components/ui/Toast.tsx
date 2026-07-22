import React, { useEffect } from 'react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  isVisible,
  onClose,
  duration = 5000,
  position = 'top-right',
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: 'bg-tertiary-container text-on-tertiary-container border-tertiary',
    error: 'bg-error-container text-on-error-container border-error',
    warning: 'bg-secondary-container text-on-secondary-container border-secondary',
    info: 'bg-primary-container text-on-primary-container border-primary',
  };

  const typeIcons = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };

  const positionStyles = {
    'top-right': 'top-lg right-lg',
    'top-left': 'top-lg left-lg',
    'bottom-right': 'bottom-lg right-lg',
    'bottom-left': 'bottom-lg left-lg',
    'top-center': 'top-lg left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-lg left-1/2 -translate-x-1/2',
  };

  return (
    <div
      className={`fixed ${positionStyles[position]} z-50 animate-in slide-in-from-top-5 fade-in duration-300`}
      role="alert"
      aria-live="polite"
    >
      <div
        className={`flex items-center gap-md p-md rounded-lg shadow-lg border ${typeStyles[type]} min-w-[300px] max-w-md`}
      >
        <span className="material-symbols-outlined flex-shrink-0">
          {typeIcons[type]}
        </span>
        <p className="flex-1 text-body-md font-medium">{message}</p>
        <button
          onClick={onClose}
          className="p-xs rounded-full hover:bg-black/10 transition-colors flex-shrink-0"
          aria-label="Close notification"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>
    </div>
  );
};

export default Toast;
