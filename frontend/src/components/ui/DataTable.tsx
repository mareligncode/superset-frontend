import React, { useState, useMemo } from 'react';

export interface ColumnDef<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T extends Record<string, any>> {
  title?: string;
  data: T[];
  columns: ColumnDef<T>[];
  pageSize?: number;
  searchable?: boolean;
}

/**
 * DataTable — Enterprise-grade data management component with advanced features
 * Features: Search, sort, pagination, CSV export, responsive design, premium styling
 */
export function DataTable<T extends Record<string, any>>({
  title,
  data,
  columns,
  pageSize = 5,
  searchable = true,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColIndex, setSortColIndex] = useState<number | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Search filtering
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lower = searchTerm.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(lower))
    );
  }, [data, searchTerm]);

  // Sorting
  const sortedData = useMemo(() => {
    if (sortColIndex === null) return filteredData;
    const col = columns[sortColIndex];
    if (!col.sortable) return filteredData;

    return [...filteredData].sort((a, b) => {
      let valA = typeof col.accessor === 'function' ? '' : String(a[col.accessor] ?? '');
      let valB = typeof col.accessor === 'function' ? '' : String(b[col.accessor] ?? '');

      valA = valA.toLowerCase();
      valB = valB.toLowerCase();

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColIndex, sortAsc, columns]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (idx: number) => {
    if (!columns[idx].sortable) return;
    if (sortColIndex === idx) {
      setSortAsc(!sortAsc);
    } else {
      setSortColIndex(idx);
      setSortAsc(true);
    }
  };

  const handleExportCSV = () => {
    if (!data || data.length === 0) return;
    const headers = columns.map((c) => c.header).join(',');
    const rows = sortedData.map((row) =>
      columns
        ? columns
            .map((c) => {
              const val = typeof c.accessor === 'function' ? '' : row[c.accessor];
              return `"${String(val).replace(/"/g, '""')}"`;
            })
            .join(',')
        : ''
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${title || 'export'}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Premium Header & Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 border-b border-slate-200/60 dark:border-slate-700/60 bg-gradient-to-r from-slate-50/80 to-slate-100/50 dark:from-slate-800/80 dark:to-slate-700/50">
        {title ? (
          <h4 className="text-[13px] font-extrabold text-slate-800 dark:text-slate-200 tracking-tight flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-blue-600 to-sky-600 rounded-full inline-block shadow-sm" />
            {title}
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold ml-1 px-2 py-0.5 bg-slate-200/60 dark:bg-slate-700/60 rounded-lg">
              {sortedData.length} {sortedData.length === 1 ? 'entry' : 'entries'}
            </span>
          </h4>
        ) : <div />}

        <div className="flex items-center gap-2.5">
          {searchable && (
            <div className="relative flex items-center group">
              <span className="material-symbols-outlined absolute left-3 text-[16px] text-slate-400 dark:text-slate-500 pointer-events-none group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                search
              </span>
              <input
                type="text"
                placeholder="Search table..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 pr-3 py-2.5 text-[12px] font-medium bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-36 sm:w-44 md:w-56 shadow-sm transition-all duration-200"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setCurrentPage(1);
                  }}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>
          )}

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 text-[12px] font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 border border-emerald-600 dark:border-emerald-500 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            title="Download CSV"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Premium Table Body */}
      <div className="overflow-x-auto custom-scrollbar-thin touch-pan-x min-w-full relative">
        {/* Mobile scroll indicators */}
        <div className="scroll-cue-left md:hidden" />
        <div className="scroll-cue-right md:hidden" />
        
        <table className="w-full text-[12px] text-left border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-slate-100/80 to-slate-200/60 dark:from-slate-700/60 dark:to-slate-600/40 border-b-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-extrabold tracking-wider select-none">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  onClick={() => handleSort(idx)}
                  className={`px-4 py-3.5 uppercase text-[11px] ${
                    col.sortable ? 'cursor-pointer hover:bg-slate-200/80 dark:hover:bg-slate-600/80 transition-colors duration-150 active:scale-95' : ''
                  } ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}
                >
                  <div className={`flex items-center gap-2 ${col.align === 'right' ? 'justify-end' : col.align === 'center' ? 'justify-center' : 'justify-start'}`}>
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className={`material-symbols-outlined text-[14px] transition-all duration-200 ${
                        sortColIndex === idx ? 'text-blue-600 dark:text-blue-400 scale-110' : 'text-slate-400 dark:text-slate-500'
                      }`}>
                        {sortColIndex === idx ? (sortAsc ? 'arrow_upward' : 'arrow_downward') : 'unfold_more'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-slate-600">search_off</span>
                    <p className="text-slate-400 dark:text-slate-500 text-[13px] font-semibold">No matching records found</p>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="text-[12px] text-blue-600 dark:text-blue-400 hover:underline font-bold"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-sky-50/50 dark:hover:from-blue-950/30 dark:hover:to-sky-950/30 transition-all duration-150 group"
                >
                  {columns.map((col, cIdx) => {
                    const content =
                      typeof col.accessor === 'function'
                        ? col.accessor(row)
                        : (row[col.accessor] as React.ReactNode);
                    return (
                      <td
                        key={cIdx}
                        className={`px-4 py-3.5 font-semibold text-slate-700 dark:text-slate-300 ${
                          col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                        }`}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Premium Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-slate-200/60 dark:border-slate-700/60 bg-gradient-to-r from-slate-50/80 to-slate-100/50 dark:from-slate-800/80 dark:to-slate-700/50">
          <span className="text-[12px] text-slate-600 dark:text-slate-400 font-semibold">
            Page <strong className="text-slate-800 dark:text-slate-200 text-[13px] mx-1">{currentPage}</strong> of <strong className="text-slate-800 dark:text-slate-200 text-[13px] mx-1">{totalPages}</strong>
            <span className="hidden sm:inline text-slate-500 dark:text-slate-400 ml-2">
              • Showing {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length}
            </span>
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-300 dark:hover:border-slate-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 font-semibold text-[12px] shadow-sm active:scale-95"
              title="First page"
            >
              <span className="material-symbols-outlined text-[16px]">first_page</span>
            </button>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-300 dark:hover:border-slate-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 font-bold text-[12px] shadow-sm active:scale-95 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              <span>Previous</span>
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-300 dark:hover:border-slate-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 font-bold text-[12px] shadow-sm active:scale-95 flex items-center gap-1.5"
            >
              <span>Next</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-300 dark:hover:border-slate-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 font-semibold text-[12px] shadow-sm active:scale-95"
              title="Last page"
            >
              <span className="material-symbols-outlined text-[16px]">last_page</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
