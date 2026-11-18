'use client';

import React from 'react';
import { Home, SlidersHorizontal, Plus, Download, Coins } from 'lucide-react';

interface MobileNavProps {
  onOpenAddExpense: () => void;
  onOpenBudgetsModal: () => void;
  onOpenBackupModal: () => void;
}

export function MobileNav({
  onOpenAddExpense,
  onOpenBudgetsModal,
  onOpenBackupModal,
}: MobileNavProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-2 pb-safe shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={scrollToTop}
          className="flex flex-col items-center justify-center p-1.5 text-slate-600 dark:text-slate-400 active:text-emerald-600 dark:active:text-emerald-400 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Home</span>
        </button>

        {/* Budgets */}
        <button
          onClick={onOpenBudgetsModal}
          className="flex flex-col items-center justify-center p-1.5 text-slate-600 dark:text-slate-400 active:text-emerald-600 dark:active:text-emerald-400 transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Budgets</span>
        </button>

        {/* Center Prominent Add Button */}
        <button
          onClick={onOpenAddExpense}
          className="-mt-5 flex flex-col items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-600/30 active:scale-95 transition-transform"
          aria-label="Add New Expense"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Backup / Export */}
        <button
          onClick={onOpenBackupModal}
          className="flex flex-col items-center justify-center p-1.5 text-slate-600 dark:text-slate-400 active:text-emerald-600 dark:active:text-emerald-400 transition-colors"
        >
          <Download className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Backup</span>
        </button>
      </div>
    </nav>
  );
}
