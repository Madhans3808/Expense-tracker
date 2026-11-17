'use client';

import React, { useState, useEffect } from 'react';
import { CategoryBudget, CategoryDef } from '@/types';
import { CATEGORIES, DEFAULT_BUDGETS } from '@/lib/constants';
import { CategoryIcon } from './CategoryIcon';
import { X, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';

interface EditBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  budgets: CategoryBudget[];
  onSaveBudgets: (updated: CategoryBudget[]) => void;
  currencySymbol: string;
}

export function EditBudgetModal({
  isOpen,
  onClose,
  budgets,
  onSaveBudgets,
  currencySymbol,
}: EditBudgetModalProps) {
  const [localBudgets, setLocalBudgets] = useState<Record<string, number>>({});

  useEffect(() => {
    const map: Record<string, number> = {};
    budgets.forEach((b) => {
      map[b.category] = b.limit;
    });
    // Ensure all categories exist
    CATEGORIES.forEach((cat) => {
      if (map[cat.name] === undefined) {
        map[cat.name] = 5000;
      }
    });
    setLocalBudgets(map);
  }, [budgets, isOpen]);

  if (!isOpen) return null;

  const handleLimitChange = (catName: string, val: string) => {
    const num = parseFloat(val) || 0;
    setLocalBudgets((prev) => ({
      ...prev,
      [catName]: num,
    }));
  };

  const handleResetDefaults = () => {
    const map: Record<string, number> = {};
    DEFAULT_BUDGETS.forEach((b) => {
      map[b.category] = b.limit;
    });
    setLocalBudgets(map);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CategoryBudget[] = Object.entries(localBudgets).map(
      ([category, limit]) => ({
        category,
        limit,
      })
    );
    onSaveBudgets(updated);
    onClose();
  };

  const categoryMap = new Map<string, CategoryDef>(
    CATEGORIES.map((c) => [c.name, c])
  );

  const totalAllocated = Object.values(localBudgets).reduce((a, b) => a + b, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Set Monthly Category Budgets
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable list */}
        <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 overflow-y-auto space-y-3.5 flex-1">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400">
                Total Monthly Cap:
              </span>
              <span className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                {currencySymbol}
                {totalAllocated.toLocaleString()}
              </span>
            </div>

            {CATEGORIES.map((cat) => {
              const currentVal = localBudgets[cat.name] ?? 0;
              return (
                <div
                  key={cat.id}
                  className="flex items-center justify-between gap-4 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.bgColor} ${cat.textColor}`}
                    >
                      <CategoryIcon name={cat.iconName} className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {cat.name}
                      </div>
                    </div>
                  </div>

                  <div className="relative w-36 sm:w-44">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                      {currencySymbol}
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={currentVal}
                      onChange={(e) => handleLimitChange(cat.name, e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-right focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-sm transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Save Limits</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
