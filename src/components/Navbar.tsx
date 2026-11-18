'use client';

import React from 'react';
import { Plus, Wallet, SlidersHorizontal, Download } from 'lucide-react';
import { CURRENCIES } from '@/lib/constants';

interface NavbarProps {
  currentMonth: string;
  onMonthChange: (month: string) => void;
  currencyCode: string;
  onCurrencyChange: (code: string) => void;
  onOpenAddExpense: () => void;
  onOpenBudgetsModal: () => void;
  onOpenBackupModal: () => void;
}

export function Navbar({
  currentMonth,
  onMonthChange,
  currencyCode,
  onCurrencyChange,
  onOpenAddExpense,
  onOpenBudgetsModal,
  onOpenBackupModal,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
            <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
                Expense<span className="text-emerald-600 dark:text-emerald-400">Pulse</span>
              </span>
              <span className="hidden md:inline-block text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Local
              </span>
            </div>
            <p className="hidden lg:block text-[11px] text-slate-500 dark:text-slate-400">
              Personal Finance & Budget Control
            </p>
          </div>
        </div>

        {/* Month Selector & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Month picker */}
          <input
            type="month"
            value={currentMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="text-xs font-semibold px-2 sm:px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
          />

          {/* Currency Dropdown */}
          <select
            value={currencyCode}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
            title="Select Currency"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.symbol} {c.code}
              </option>
            ))}
          </select>

          {/* Desktop-only Action Buttons */}
          <button
            onClick={onOpenBudgetsModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            title="Set Category Budgets"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Budgets</span>
          </button>

          <button
            onClick={onOpenBackupModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            title="Export / Import Data"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup</span>
          </button>

          {/* Add Expense Primary CTA */}
          <button
            onClick={onOpenAddExpense}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium text-xs sm:text-sm shadow-sm transition-all transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>
    </header>
  );
}
