'use client';

import React from 'react';
import {
  TrendingDown,
  TrendingUp,
  Wallet,
  PiggyBank,
  Receipt,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

interface OverviewCardsProps {
  totalSpent: number;
  totalBudget: number;
  transactionCount: number;
  currencySymbol: string;
}

export function OverviewCards({
  totalSpent,
  totalBudget,
  transactionCount,
  currencySymbol,
}: OverviewCardsProps) {
  const remaining = totalBudget - totalSpent;
  const isOverBudget = remaining < 0;
  const percentUsed = totalBudget > 0 ? Math.min(Math.round((totalSpent / totalBudget) * 100), 999) : 0;

  const formatAmount = (num: number) => {
    return `${currencySymbol}${Math.abs(num).toLocaleString('en-US', {
      maximumFractionDigits: 0,
    })}`;
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {/* Total Spent */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-5 shadow-xs transition-all hover:shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Total Spent
          </span>
          <div className="p-1.5 sm:p-2 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
            <TrendingDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div className="mt-2 sm:mt-3">
          <div className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
            {formatAmount(totalSpent)}
          </div>
          <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
            {transactionCount} record{transactionCount === 1 ? '' : 's'}
          </p>
        </div>
      </div>

      {/* Monthly Budget */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-5 shadow-xs transition-all hover:shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Budget
          </span>
          <div className="p-1.5 sm:p-2 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div className="mt-2 sm:mt-3">
          <div className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
            {formatAmount(totalBudget)}
          </div>
          <div className="mt-0.5 sm:mt-1 flex items-center gap-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
            <span>Used:</span>
            <span
              className={`font-semibold ${
                percentUsed > 100
                  ? 'text-red-600 dark:text-red-400'
                  : percentUsed > 80
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {percentUsed}%
            </span>
          </div>
        </div>
      </div>

      {/* Remaining / Net Status */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-5 shadow-xs transition-all hover:shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Remaining
          </span>
          <div
            className={`p-1.5 sm:p-2 rounded-lg ${
              isOverBudget
                ? 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400'
                : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
            }`}
          >
            {isOverBudget ? <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <PiggyBank className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </div>
        </div>
        <div className="mt-2 sm:mt-3">
          <div
            className={`text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight truncate ${
              isOverBudget
                ? 'text-red-600 dark:text-red-400'
                : 'text-emerald-600 dark:text-emerald-400'
            }`}
          >
            {isOverBudget ? '-' : '+'}
            {formatAmount(remaining)}
          </div>
          <div className="mt-0.5 sm:mt-1 flex items-center gap-1 text-[11px] sm:text-xs truncate">
            {isOverBudget ? (
              <span className="text-red-500 font-medium">Over limit</span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-0.5">
                <CheckCircle2 className="w-3 h-3" />
                Under limit
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Average Expense */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-5 shadow-xs transition-all hover:shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Avg / Item
          </span>
          <div className="p-1.5 sm:p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <Receipt className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div className="mt-2 sm:mt-3">
          <div className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
            {formatAmount(transactionCount > 0 ? totalSpent / transactionCount : 0)}
          </div>
          <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
            Per transaction
          </p>
        </div>
      </div>
    </div>
  );
}
