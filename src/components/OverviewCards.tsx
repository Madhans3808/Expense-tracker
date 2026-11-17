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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Spent */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Total Spent
          </span>
          <div className="p-2.5 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
            <TrendingDown className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {formatAmount(totalSpent)}
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Across {transactionCount} recorded expense{transactionCount === 1 ? '' : 's'}
          </p>
        </div>
      </div>

      {/* Monthly Budget */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Monthly Budget
          </span>
          <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Wallet className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {formatAmount(totalBudget)}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span>Budget usage:</span>
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
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {isOverBudget ? 'Over Budget' : 'Remaining Budget'}
          </span>
          <div
            className={`p-2.5 rounded-xl ${
              isOverBudget
                ? 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400'
                : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
            }`}
          >
            {isOverBudget ? <AlertTriangle className="w-5 h-5" /> : <PiggyBank className="w-5 h-5" />}
          </div>
        </div>
        <div className="mt-3">
          <div
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isOverBudget
                ? 'text-red-600 dark:text-red-400'
                : 'text-emerald-600 dark:text-emerald-400'
            }`}
          >
            {isOverBudget ? '-' : '+'}
            {formatAmount(remaining)}
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs">
            {isOverBudget ? (
              <span className="text-red-500 font-medium">Over limit by {formatAmount(Math.abs(remaining))}</span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Under budget limit
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Average Expense */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Average / Item
          </span>
          <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <Receipt className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {formatAmount(transactionCount > 0 ? totalSpent / transactionCount : 0)}
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Avg spending per record
          </p>
        </div>
      </div>
    </div>
  );
}
