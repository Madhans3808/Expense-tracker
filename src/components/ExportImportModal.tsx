'use client';

import React, { useRef } from 'react';
import { Expense } from '@/types';
import { Download, Upload, RotateCcw, Trash2, X, FileSpreadsheet } from 'lucide-react';

interface ExportImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  expenses: Expense[];
  onImportExpenses: (imported: Expense[]) => void;
  onResetDefaults: () => void;
  onClearAll: () => void;
}

export function ExportImportModal({
  isOpen,
  onClose,
  expenses,
  onImportExpenses,
  onResetDefaults,
  onClearAll,
}: ExportImportModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Export to CSV
  const handleExportCSV = () => {
    if (expenses.length === 0) {
      alert('No expenses to export.');
      return;
    }

    const headers = ['id', 'title', 'amount', 'category', 'date', 'paymentMethod', 'notes'];
    const rows = expenses.map((e) => [
      `"${e.id}"`,
      `"${e.title.replace(/"/g, '""')}"`,
      e.amount,
      `"${e.category}"`,
      `"${e.date}"`,
      `"${e.paymentMethod}"`,
      `"${(e.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `expenses_backup_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import from CSV
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n').filter((l) => l.trim() !== '');
        if (lines.length <= 1) {
          alert('CSV file appears empty or missing headers.');
          return;
        }

        const newExpenses: Expense[] = [];
        for (let i = 1; i < lines.length; i++) {
          const row = lines[i].split(',').map((val) => val.trim().replace(/^"|"$/g, ''));
          if (row.length >= 6) {
            newExpenses.push({
              id: row[0] || `imp-${Date.now()}-${i}`,
              title: row[1] || 'Imported Expense',
              amount: parseFloat(row[2]) || 0,
              category: row[3] || 'Miscellaneous',
              date: row[4] || new Date().toISOString().split('T')[0],
              paymentMethod: (row[5] as any) || 'Other',
              notes: row[6] || '',
              createdAt: Date.now(),
            });
          }
        }

        if (newExpenses.length > 0) {
          onImportExpenses(newExpenses);
          alert(`Successfully imported ${newExpenses.length} transactions!`);
          onClose();
        } else {
          alert('Could not parse any valid expense rows from the CSV file.');
        }
      } catch (err) {
        console.error(err);
        alert('Failed to parse CSV file. Please make sure format matches.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Data Management & Backup
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            All your data is saved strictly in your browser's local storage. Use these tools to download backups, transfer data, or restore defaults.
          </p>

          <div className="space-y-3">
            {/* Export CSV */}
            <button
              onClick={handleExportCSV}
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                    Export to CSV Spreadsheet
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Download {expenses.length} records as a spreadsheet backup
                  </div>
                </div>
              </div>
            </button>

            {/* Import CSV */}
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 bg-slate-50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                    Import from CSV
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Append or restore transactions from a CSV file
                  </div>
                </div>
              </div>
            </button>

            {/* Reset to Demo Data */}
            <button
              onClick={() => {
                if (confirm('Reset to initial sample demo data? Your current list will be replaced.')) {
                  onResetDefaults();
                  onClose();
                }
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 bg-slate-50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                    Reset to Demo Data
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Load curated sample expenses and budgets
                  </div>
                </div>
              </div>
            </button>

            {/* Clear All */}
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete all recorded expenses? This cannot be undone.')) {
                  onClearAll();
                  onClose();
                }
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-red-200 dark:border-red-900/50 hover:border-red-500 bg-red-50/30 dark:bg-red-950/20 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-red-600 dark:text-red-400">
                    Clear All Expenses
                  </div>
                  <div className="text-[11px] text-red-400">
                    Wipe local transactions storage clean
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
