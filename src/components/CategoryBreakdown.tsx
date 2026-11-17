'use client';

import React from 'react';
import { CATEGORIES } from '@/lib/constants';
import { CategoryDef } from '@/types';
import { CategoryIcon } from './CategoryIcon';
import { PieChart, Sparkles } from 'lucide-react';

interface CategoryBreakdownProps {
  categorySpending: Record<string, number>;
  totalSpent: number;
  currencySymbol: string;
}

export function CategoryBreakdown({
  categorySpending,
  totalSpent,
  currencySymbol,
}: CategoryBreakdownProps) {
  const categoryMap = new Map<string, CategoryDef>(
    CATEGORIES.map((c) => [c.name, c])
  );

  // Sort categories by spending descending
  const sortedCategories = Object.entries(categorySpending)
    .filter(([_, amount]) => amount > 0)
    .sort((a, b) => b[1] - a[1]);

  const topCategory = sortedCategories.length > 0 ? sortedCategories[0] : null;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PieChart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Spending Breakdown</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Where your money went this month
            </p>
          </div>
        </div>

        {/* Top category callout */}
        {topCategory && (
          <div className="mb-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Highest Expense: <span className="font-semibold text-slate-900 dark:text-white">{topCategory[0]}</span>
              </span>
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {currencySymbol}
              {topCategory[1].toLocaleString()} ({Math.round((topCategory[1] / (totalSpent || 1)) * 100)}%)
            </span>
          </div>
        )}

        {/* List of active categories */}
        {sortedCategories.length === 0 ? (
          <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs">
            No expenses recorded for this month yet.
          </div>
        ) : (
          <div className="space-y-3">
            {sortedCategories.map(([catName, amount]) => {
              const percentage = totalSpent > 0 ? Math.round((amount / totalSpent) * 100) : 0;
              const catDef = categoryMap.get(catName);

              return (
                <div key={catName} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center ${
                          catDef?.bgColor || 'bg-slate-100'
                        } ${catDef?.textColor || 'text-slate-600'}`}
                      >
                        <CategoryIcon name={catDef?.iconName || 'Tag'} className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {catName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {currencySymbol}
                        {amount.toLocaleString()}
                      </span>
                      <span className="text-slate-400 dark:text-slate-500 w-9 text-right font-medium">
                        {percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: catDef?.color || '#10b981',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
