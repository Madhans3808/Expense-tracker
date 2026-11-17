'use client';

import React from 'react';
import { CategoryBudget, CategoryDef } from '@/types';
import { CATEGORIES } from '@/lib/constants';
import { CategoryIcon } from './CategoryIcon';
import { SlidersHorizontal, AlertCircle, CheckCircle, ShieldAlert } from 'lucide-react';

interface BudgetManagerProps {
  budgets: CategoryBudget[];
  categorySpending: Record<string, number>;
  currencySymbol: string;
  onOpenEditBudgets: () => void;
}

export function BudgetManager({
  budgets,
  categorySpending,
  currencySymbol,
  onOpenEditBudgets,
}: BudgetManagerProps) {
  // Map category definitions for quick lookup
  const categoryMap = new Map<string, CategoryDef>(
    CATEGORIES.map((c) => [c.name, c])
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Category Budget Tracker</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Monitor spending limits and avoid overspending
          </p>
        </div>
        <button
          onClick={onOpenEditBudgets}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Adjust Limits</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgets.map((b) => {
          const spent = categorySpending[b.category] || 0;
          const limit = b.limit || 1;
          const percentage = Math.round((spent / limit) * 100);
          const isExceeded = spent > limit;
          const isNearLimit = !isExceeded && percentage >= 75;
          const catDef = categoryMap.get(b.category);

          return (
            <div
              key={b.category}
              className={`p-3.5 rounded-xl border transition-all ${
                isExceeded
                  ? 'border-red-200 dark:border-red-900/50 bg-red-50/40 dark:bg-red-950/20'
                  : isNearLimit
                  ? 'border-amber-200 dark:border-amber-900/50 bg-amber-50/30 dark:bg-amber-950/20'
                  : 'border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-slate-200 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      catDef?.bgColor || 'bg-slate-100'
                    } ${catDef?.textColor || 'text-slate-600'}`}
                  >
                    <CategoryIcon name={catDef?.iconName || 'Tag'} className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {b.category}
                    </h4>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Limit: {currencySymbol}
                      {b.limit.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {currencySymbol}
                    {spent.toLocaleString()}
                  </div>
                  {isExceeded ? (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-red-600 dark:text-red-400">
                      <ShieldAlert className="w-3 h-3" /> Over by {currencySymbol}
                      {(spent - limit).toLocaleString()}
                    </span>
                  ) : isNearLimit ? (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                      <AlertCircle className="w-3 h-3" /> {percentage}% used
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      <CheckCircle className="w-3 h-3" /> {percentage}% used
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isExceeded
                      ? 'bg-red-500'
                      : isNearLimit
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
