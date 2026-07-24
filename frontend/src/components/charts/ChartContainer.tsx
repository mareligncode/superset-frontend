import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  tableData?: Array<Record<string, string | number>>;
  className?: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  children,
  tableData,
  className = '',
}) => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  const downloadRef = useRef<HTMLDivElement>(null);
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
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

  const handleDownloadPDF = () => {
    window.print();
    setDownloadMenuOpen(false);
  };

  const handleDownloadImage = () => {
    const chartElement = document.querySelector('.chart-content') as HTMLElement;
    if (chartElement) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = chartElement.offsetWidth * 2;
        canvas.height = chartElement.offsetHeight * 2;
        ctx.scale(2, 2);
        ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const link = document.createElement('a');
        link.download = `${title.replace(/\s+/g, '_')}_chart.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    }
    setDownloadMenuOpen(false);
  };

  const handleDownloadCSV = () => {
    if (tableData && tableData.length > 0) {
      const headers = Object.keys(tableData[0]).join(',');
      const rows = tableData.map((row) =>
        Object.values(row).map((val) => `"${String(val).replace(/"/g, '""')}"`).join(',')
      );
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
      const link = document.createElement('a');
      link.setAttribute('href', encodeURI(csvContent));
      link.setAttribute('download', `${title.replace(/\s+/g, '_')}_data.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setDownloadMenuOpen(false);
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    setShareMenuOpen(false);
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`Check out this chart: ${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setShareMenuOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
    setShareMenuOpen(false);
  };

  return (
    <>
      <div
        className={`bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-700 hover:-translate-y-0.5 relative group ${className} w-full overflow-hidden`}
      >
        {/* Premium Header toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-slate-200/60 dark:border-slate-700/60 w-full">
          <div className="flex-1 min-w-0">
            <h3 className="text-[14px] font-extrabold text-slate-800 dark:text-slate-200 tracking-tight leading-tight flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-600 to-sky-600 inline-block shadow-sm" />
              {title}
            </h3>
            {subtitle && (
              <p className="text-[12px] text-slate-600 dark:text-slate-400 font-semibold mt-1.5 pl-3">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-600/60 shadow-sm">
            {tableData && tableData.length > 0 && (
              <button
                onClick={() => setViewMode(viewMode === 'chart' ? 'table' : 'chart')}
                className={`px-2.5 sm:px-3 py-1.5 text-[11px] font-bold rounded-lg flex items-center gap-1.5 transition-all duration-200 active:scale-95 min-h-[40px] sm:min-h-0 ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-600 text-blue-700 dark:text-blue-300 shadow-md border-2 border-blue-200 dark:border-blue-700'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-600/60'
                }`}
                title={viewMode === 'chart' ? t('view') : t('charts')}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {viewMode === 'chart' ? 'table_chart' : 'bar_chart'}
                </span>
                <span className="uppercase tracking-wider">{viewMode === 'chart' ? t('table') : t('charts')}</span>
              </button>
            )}

            <div className="relative" ref={downloadRef}>
              <button
                onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
                className="p-1.5 sm:p-1.5 min-h-[40px] min-w-[40px] sm:min-h-0 sm:min-w-0 text-slate-400 dark:text-slate-500 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-600 rounded-lg transition-all duration-200 active:scale-95"
                title={t('download')}
              >
                <span className="material-symbols-outlined text-[15px]">download</span>
              </button>

              {downloadMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-2 border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl py-1.5 z-50 text-[12px] font-semibold text-slate-800 dark:text-slate-200 animate-slideIn">
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full text-left px-4 py-2.5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 dark:hover:from-slate-700 dark:hover:to-slate-700 flex items-center gap-2.5 transition-all duration-150 active:scale-98"
                  >
                    <span className="material-symbols-outlined text-[16px] text-red-500 dark:text-red-400">picture_as_pdf</span>
                    <span>{t('downloadPDF')}</span>
                  </button>
                  <button
                    onClick={handleDownloadImage}
                    className="w-full text-left px-4 py-2.5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 dark:hover:from-slate-700 dark:hover:to-slate-700 flex items-center gap-2.5 transition-all duration-150 active:scale-98"
                  >
                    <span className="material-symbols-outlined text-[16px] text-green-500 dark:text-green-400">image</span>
                    <span>{t('downloadImage')}</span>
                  </button>
                  {tableData && (
                    <button
                      onClick={handleDownloadCSV}
                      className="w-full text-left px-4 py-2.5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 dark:hover:from-slate-700 dark:hover:to-slate-700 flex items-center gap-2.5 transition-all duration-150 active:scale-98"
                    >
                      <span className="material-symbols-outlined text-[16px] text-blue-500 dark:text-blue-400">table_chart</span>
                      <span>{t('downloadCSV')}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="relative" ref={shareRef}>
              <button
                onClick={() => setShareMenuOpen(!shareMenuOpen)}
                className="p-1.5 sm:p-1.5 min-h-[40px] min-w-[40px] sm:min-h-0 sm:min-w-0 text-slate-400 dark:text-slate-500 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-600 rounded-lg transition-all duration-200 active:scale-95"
                title={t('share')}
              >
                <span className="material-symbols-outlined text-[15px]">share</span>
              </button>

              {shareMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-2 border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl py-1.5 z-50 text-[12px] font-semibold text-slate-800 dark:text-slate-200 animate-slideIn">
                  <button
                    onClick={handleShareFacebook}
                    className="w-full text-left px-4 py-2.5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 dark:hover:from-slate-700 dark:hover:to-slate-700 flex items-center gap-2.5 transition-all duration-150 active:scale-98"
                  >
                    <span className="material-symbols-outlined text-[16px] text-blue-600 dark:text-blue-400">facebook</span>
                    <span>{t('shareFacebook')}</span>
                  </button>
                  <button
                    onClick={handleShareEmail}
                    className="w-full text-left px-4 py-2.5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 dark:hover:from-slate-700 dark:hover:to-slate-700 flex items-center gap-2.5 transition-all duration-150 active:scale-98"
                  >
                    <span className="material-symbols-outlined text-[16px] text-slate-500 dark:text-slate-400">email</span>
                    <span>{t('shareEmail')}</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="w-full text-left px-4 py-2.5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 dark:hover:from-slate-700 dark:hover:to-slate-700 flex items-center gap-2.5 transition-all duration-150 active:scale-98"
                  >
                    <span className="material-symbols-outlined text-[16px] text-emerald-500 dark:text-emerald-400">link</span>
                    <span>{t('copyLink')}</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsFullscreen(true)}
              className="p-1.5 sm:p-1.5 min-h-[40px] min-w-[40px] sm:min-h-0 sm:min-w-0 text-slate-400 dark:text-slate-500 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-600 rounded-lg transition-all duration-200 active:scale-95"
              title={t('enterFullscreen')}
            >
              <span className="material-symbols-outlined text-[15px]">fullscreen</span>
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="w-full relative min-h-[180px] sm:min-h-[200px] flex items-center justify-center chart-content overflow-hidden">
          {viewMode === 'chart' ? (
            children
          ) : tableData && tableData.length > 0 ? (
            <div className="w-full overflow-x-auto overflow-y-auto max-h-[250px] sm:max-h-[280px] rounded-xl border border-slate-200 dark:border-slate-700 custom-scrollbar">
              <table className="w-full text-[11px] text-left border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-slate-700 dark:to-slate-800 border-b-2 border-blue-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-extrabold uppercase tracking-wider">
                    {Object.keys(tableData[0]).map((key) => (
                      <th key={key} className="px-4 py-3 text-left">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {tableData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-sky-50/40 dark:hover:from-blue-950/20 dark:hover:to-sky-950/20 transition-colors duration-150">
                      {Object.values(row).map((val, i) => (
                        <td key={i} className="px-4 py-2.5 text-slate-700 dark:text-slate-300 font-semibold">
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            children
          )}
        </div>
      </div>

      {/* Premium Fullscreen Dialog Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-slate-900/90 dark:bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 sm:p-8 animate-fadeIn w-full h-full overflow-hidden">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border-2 border-slate-200 dark:border-slate-700 w-full max-w-6xl h-[90vh] sm:h-[88vh] flex flex-col overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b-2 border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 gap-3">
              <div className="flex-1 min-w-0">
                <h2 className="text-[15px] font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2.5 tracking-tight">
                  <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-blue-600 to-sky-600 shadow-md" />
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-[12px] text-slate-600 dark:text-slate-400 mt-1 font-semibold pl-4">
                    {subtitle}
                  </p>
                )}
              </div>

              <button
                onClick={() => setIsFullscreen(false)}
                className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            <div className="flex-1 p-6 overflow-auto flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
              <div className="w-full h-full max-w-5xl flex items-center justify-center bg-white dark:bg-slate-800 p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-xl">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
