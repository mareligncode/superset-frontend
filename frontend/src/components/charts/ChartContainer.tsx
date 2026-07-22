import React, { useState } from 'react';

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

  const handleExport = () => {
    window.print();
  };

  return (
    <>
      <div
        className={`bg-white border border-slate-200/90 rounded-xl p-4 flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-slate-300 relative group ${className}`}
      >
        {/* Header toolbar */}
        <div className="flex items-start justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-bold text-slate-800 tracking-tight leading-tight flex items-center gap-1.5">
              <span className="w-1.5 h-3.5 rounded-full bg-blue-600 inline-block" />
              {title}
            </h3>
            {subtitle && (
              <p className="text-[10px] text-slate-500 font-medium mt-0.5 pl-3">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0 bg-slate-50 p-0.5 rounded-lg border border-slate-200/60">
            {tableData && tableData.length > 0 && (
              <button
                onClick={() => setViewMode(viewMode === 'chart' ? 'table' : 'chart')}
                className={`px-2 py-1 text-[10px] font-semibold rounded flex items-center gap-1 transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-blue-700 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title={viewMode === 'chart' ? 'View as Data Table' : 'View as Chart'}
              >
                <span className="material-symbols-outlined text-[13px]">
                  {viewMode === 'chart' ? 'table_chart' : 'bar_chart'}
                </span>
                <span>{viewMode === 'chart' ? 'Table' : 'Chart'}</span>
              </button>
            )}

            <button
              onClick={handleExport}
              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-white rounded transition-all"
              title="Print / Export Chart"
            >
              <span className="material-symbols-outlined text-[14px]">download</span>
            </button>

            <button
              onClick={() => setIsFullscreen(true)}
              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-white rounded transition-all"
              title="Expand Fullscreen"
            >
              <span className="material-symbols-outlined text-[14px]">fullscreen</span>
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="w-full relative min-h-[200px] flex items-center justify-center">
          {viewMode === 'chart' ? (
            children
          ) : tableData && tableData.length > 0 ? (
            <div className="w-full overflow-x-auto max-h-[240px] custom-scrollbar">
              <table className="w-full text-[10.5px] text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    {Object.keys(tableData[0]).map((key) => (
                      <th key={key} className="px-3 py-2">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tableData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/40">
                      {Object.values(row).map((val, i) => (
                        <td key={i} className="px-3 py-1.5 text-slate-700 font-medium">
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
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-4 rounded-full bg-blue-600" />
                  {title}
                </h2>
                {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
              </div>

              <button
                onClick={() => setIsFullscreen(false)}
                className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex-1 p-6 overflow-auto flex items-center justify-center bg-slate-50/50">
              <div className="w-full h-full max-w-4xl flex items-center justify-center bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
