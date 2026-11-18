'use client';

import React, { useState, useMemo } from 'react';
import { Expense, CategoryDef } from '@/types';
import { CATEGORIES } from '@/lib/constants';
import { CategoryIcon } from './CategoryIcon';
import {
  Search,
  Filter,
  ArrowUpDown,
  Edit2,
  Trash2,
  Calendar,
  CreditCard,
  Inbox,
  X,
} from 'lucide-react';

interface ExpenseListProps {
  expenses: Expense[];
  currencySymbol: string;
  onEditExpense: (expense: Expense) => void;
  onDeleteExpense: (id: string) => void;
}

export function ExpenseList({
  expenses,
  currencySymbol,
  onEditExpense,
  onDeleteExpense,
}: ExpenseListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'>('date-desc');

  const categoryMap = new Map<string, CategoryDef>(
    CATEGORIES.map((c) => [c.name, c])
  );

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((exp) => {
        const matchesSearch =
          exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (exp.notes && exp.notes.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCat =
          selectedCategory === 'ALL' || exp.category === selectedCategory;

        const matchesPay =
          selectedPaymentMethod === 'ALL' || exp.paymentMethod === selectedPaymentMethod;

        return matchesSearch && matchesCat && matchesPay;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (sortBy === 'date-asc') {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        if (sortBy === 'amount-desc') {
          return b.amount - a.amount;
        }
        if (sortBy === 'amount-asc') {
          return a.amount - b.amount;
        }
        return 0;
      });
  }, [expenses, searchQuery, selectedCategory, selectedPaymentMethod, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'ALL' ||
    selectedPaymentMethod !== 'ALL';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedPaymentMethod('ALL');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs">
      {/* Header and Controls */}
      <div className="flex flex-col gap-3.5 mb-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Transaction History</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {filteredExpenses.length} of {expenses.length}
              </span>
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
              Search, filter, edit, or delete transactions
            </p>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Filter Toolbar: Responsive grid on mobile */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title or note..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filters Row: 2-col on small mobile, flex on desktop */}
          <div className="grid grid-cols-3 sm:flex items-center gap-1.5 sm:gap-2">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs font-medium px-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Payment Method Filter */}
            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="text-xs font-medium px-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="ALL">All Payments</option>
              <option value="UPI">UPI</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Cash">Cash</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Other">Other</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-medium px-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">High to Low</option>
              <option value="amount-asc">Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      {filteredExpenses.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
            <Inbox className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No transactions found
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            {hasActiveFilters
              ? 'Try adjusting your search query or filters.'
              : 'Add your first expense to begin tracking.'}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-3 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredExpenses.map((exp) => {
            const catDef = categoryMap.get(exp.category);

            return (
              <div
                key={exp.id}
                className="py-3 px-1 sm:px-2 flex items-center justify-between gap-2.5 sm:gap-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 rounded-xl transition-colors group"
              >
                {/* Left side: Category icon, Title, Date, Category tag */}
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl shrink-0 flex items-center justify-center ${
                      catDef?.bgColor || 'bg-slate-100'
                    } ${catDef?.textColor || 'text-slate-600'}`}
                  >
                    <CategoryIcon name={catDef?.iconName || 'Tag'} className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate max-w-[160px] sm:max-w-none">
                        {exp.title}
                      </h4>
                      <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 truncate">
                        {exp.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                      <span className="flex items-center gap-0.5">
                        <Calendar className="w-3 h-3" />
                        {exp.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <CreditCard className="w-3 h-3" />
                        {exp.paymentMethod}
                      </span>
                      {exp.notes && (
                        <>
                          <span className="hidden md:inline">•</span>
                          <span className="hidden md:inline truncate max-w-xs text-slate-500 dark:text-slate-400 italic">
                            "{exp.notes}"
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side: Amount and Action buttons */}
                <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-xs sm:text-base font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      -{currencySymbol}
                      {exp.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    <button
                      onClick={() => onEditExpense(exp)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 active:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                      title="Edit Expense"
                    >
                      <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${exp.title}" (${currencySymbol}${exp.amount})?`)) {
                          onDeleteExpense(exp.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 active:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Delete Expense"
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
