import React, { useState, useRef, useEffect } from 'react';

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
        className={`bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 rounded-xl p-4 flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 relative group ${className}`}
      >
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-tight leading-tight flex items-center gap-1.5">
              <span className="w-1.5 h-3.5 rounded-full bg-blue-600 inline-block" />
              {title}
            </h3>
            {subtitle && (
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 pl-3">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0 bg-slate-50 dark:bg-slate-700 p-0.5 rounded-lg border border-slate-200/60 dark:border-slate-600">
            {tableData && tableData.length > 0 && (
              <button
                onClick={() => setViewMode(viewMode === 'chart' ? 'table' : 'chart')}
                className={`px-2 py-1 text-[10px] font-semibold rounded flex items-center gap-1 transition-all ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-600 text-blue-700 dark:text-blue-300 shadow-2xs font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title={viewMode === 'chart' ? 'View as Data Table' : 'View as Chart'}
              >
                <span className="material-symbols-outlined text-[13px]">
                  {viewMode === 'chart' ? 'table_chart' : 'bar_chart'}
                </span>
                <span>{viewMode === 'chart' ? 'Table' : 'Chart'}</span>
              </button>
            )}

            <div className="relative" ref={downloadRef}>
              <button
                onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
                className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-600 rounded transition-all"
                title="Download Chart"
              >
                <span className="material-symbols-outlined text-[14px]">download</span>
              </button>

              {downloadMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xl py-1 z-50 text-[11.5px] font-medium text-slate-800 dark:text-slate-200 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px] text-slate-400 dark:text-slate-500">picture_as_pdf</span>
                    <span>PDF</span>
                  </button>
                  <button
                    onClick={handleDownloadImage}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px] text-slate-400 dark:text-slate-500">image</span>
                    <span>Image</span>
                  </button>
                  {tableData && (
                    <button
                      onClick={handleDownloadCSV}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px] text-slate-400 dark:text-slate-500">table_chart</span>
                      <span>CSV</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="relative" ref={shareRef}>
              <button
                onClick={() => setShareMenuOpen(!shareMenuOpen)}
                className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-600 rounded transition-all"
                title="Share Chart"
              >
                <span className="material-symbols-outlined text-[14px]">share</span>
              </button>

              {shareMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xl py-1 z-50 text-[11.5px] font-medium text-slate-800 dark:text-slate-200 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={handleShareFacebook}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px] text-blue-600">facebook</span>
                    <span>Facebook</span>
                  </button>
                  <button
                    onClick={handleShareEmail}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px] text-slate-400 dark:text-slate-500">email</span>
                    <span>Email</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px] text-slate-400 dark:text-slate-500">link</span>
                    <span>Copy Link</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsFullscreen(true)}
              className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-600 rounded transition-all"
              title="Expand Fullscreen"
            >
              <span className="material-symbols-outlined text-[14px]">fullscreen</span>
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="w-full relative min-h-[200px] flex items-center justify-center chart-content">
          {viewMode === 'chart' ? (
            children
          ) : tableData && tableData.length > 0 ? (
            <div className="w-full overflow-x-auto max-h-[240px] custom-scrollbar">
              <table className="w-full text-[10.5px] text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider">
                    {Object.keys(tableData[0]).map((key) => (
                      <th key={key} className="px-3 py-2">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {tableData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/40 dark:hover:bg-blue-900/20">
                      {Object.values(row).map((val, i) => (
                        <td key={i} className="px-3 py-1.5 text-slate-700 dark:text-slate-300 font-medium">
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

      {/* Fullscreen Dialog Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 dark:bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-5xl h-[85vh] md:h-[85vh] flex flex-col overflow-hidden chart-fullscreen-mobile">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 gap-3">
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-4 rounded-full bg-blue-600" />
                  {title}
                </h2>
                {subtitle && <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>}
              </div>

              <button
                onClick={() => setIsFullscreen(false)}
                className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all cursor-pointer touch-target"
              >
                <span className="material-symbols-outlined text-[20px] sm:text-[18px]">close</span>
              </button>
            </div>

            <div className="flex-1 p-4 sm:p-6 overflow-auto flex items-center justify-center bg-slate-50/50 dark:bg-slate-900/50">
              <div className="w-full h-full max-w-4xl flex items-center justify-center bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
