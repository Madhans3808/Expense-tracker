'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Expense, CategoryBudget } from '@/types';
import { CURRENCIES, DEFAULT_BUDGETS } from '@/lib/constants';
import { storage } from '@/lib/storage';
import { Navbar } from '@/components/Navbar';
import { OverviewCards } from '@/components/OverviewCards';
import { BudgetManager } from '@/components/BudgetManager';
import { CategoryBreakdown } from '@/components/CategoryBreakdown';
import { ExpenseList } from '@/components/ExpenseList';
import { ExpenseModal } from '@/components/ExpenseModal';
import { EditBudgetModal } from '@/components/EditBudgetModal';
import { ExportImportModal } from '@/components/ExportImportModal';
import { MobileNav } from '@/components/MobileNav';
import { Plus } from 'lucide-react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<CategoryBudget[]>(DEFAULT_BUDGETS);
  const [currencyCode, setCurrencyCode] = useState<string>('INR');

  const [currentMonth, setCurrentMonth] = useState<string>('');

  // Modals state
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  // Load from local storage after mount
  useEffect(() => {
    const now = new Date();
    const currentMonthDefault = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    setCurrentMonth(currentMonthDefault);
    setMounted(true);
    setExpenses(storage.getExpenses());
    setBudgets(storage.getBudgets());
    setCurrencyCode(storage.getCurrency());
  }, []);

  // Currency symbol
  const currencySymbol = useMemo(() => {
    const found = CURRENCIES.find((c) => c.code === currencyCode);
    return found ? found.symbol : '₹';
  }, [currencyCode]);

  // Expenses in current selected month
  const monthlyExpenses = useMemo(() => {
    return expenses.filter((e) => e.date.startsWith(currentMonth));
  }, [expenses, currentMonth]);

  // Total spent in month
  const monthlySpent = useMemo(() => {
    return monthlyExpenses.reduce((sum, item) => sum + item.amount, 0);
  }, [monthlyExpenses]);

  // Total budget cap
  const totalBudget = useMemo(() => {
    return budgets.reduce((sum, b) => sum + b.limit, 0);
  }, [budgets]);

  // Category spending for selected month
  const categorySpending = useMemo(() => {
    const map: Record<string, number> = {};
    monthlyExpenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return map;
  }, [monthlyExpenses]);

  // Handlers
  const handleSaveExpense = (
    data: Omit<Expense, 'id' | 'createdAt'>,
    existingId?: string
  ) => {
    if (existingId) {
      const updated = expenses.map((item) =>
        item.id === existingId
          ? {
              ...item,
              ...data,
            }
          : item
      );
      setExpenses(updated);
      storage.saveExpenses(updated);
    } else {
      const newExp: Expense = {
        ...data,
        id: `exp-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        createdAt: Date.now(),
      };
      const updated = [newExp, ...expenses];
      setExpenses(updated);
      storage.saveExpenses(updated);
    }
  };

  const handleDeleteExpense = (id: string) => {
    const updated = expenses.filter((e) => e.id !== id);
    setExpenses(updated);
    storage.saveExpenses(updated);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setIsExpenseModalOpen(true);
  };

  const handleOpenAddExpense = () => {
    setEditingExpense(null);
    setIsExpenseModalOpen(true);
  };

  const handleSaveBudgets = (updatedBudgets: CategoryBudget[]) => {
    setBudgets(updatedBudgets);
    storage.saveBudgets(updatedBudgets);
  };

  const handleCurrencyChange = (code: string) => {
    setCurrencyCode(code);
    storage.saveCurrency(code);
  };

  const handleImportExpenses = (imported: Expense[]) => {
    const updated = [...imported, ...expenses];
    setExpenses(updated);
    storage.saveExpenses(updated);
  };

  const handleResetDefaults = () => {
    storage.resetToDefaults();
    setExpenses(storage.getExpenses());
    setBudgets(storage.getBudgets());
    setCurrencyCode(storage.getCurrency());
  };

  const handleClearAll = () => {
    storage.clearAllData();
    setExpenses([]);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Navigation */}
      <Navbar
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
        currencyCode={currencyCode}
        onCurrencyChange={handleCurrencyChange}
        onOpenAddExpense={handleOpenAddExpense}
        onOpenBudgetsModal={() => setIsBudgetModalOpen(true)}
        onOpenBackupModal={() => setIsBackupModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-24 sm:pb-8">
        {/* Top Summary Cards */}
        <OverviewCards
          totalSpent={monthlySpent}
          totalBudget={totalBudget}
          transactionCount={monthlyExpenses.length}
          currencySymbol={currencySymbol}
        />

        {/* Middle Section: Budget Tracker & Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2">
            <BudgetManager
              budgets={budgets}
              categorySpending={categorySpending}
              currencySymbol={currencySymbol}
              onOpenEditBudgets={() => setIsBudgetModalOpen(true)}
            />
          </div>
          <div className="lg:col-span-1">
            <CategoryBreakdown
              categorySpending={categorySpending}
              totalSpent={monthlySpent}
              currencySymbol={currencySymbol}
            />
          </div>
        </div>

        {/* Transactions Table & Filters */}
        <ExpenseList
          expenses={monthlyExpenses}
          currencySymbol={currencySymbol}
          onEditExpense={handleEditExpense}
          onDeleteExpense={handleDeleteExpense}
        />
      </main>

      {/* Modern Mobile Bottom Navigation Bar */}
      <MobileNav
        onOpenAddExpense={handleOpenAddExpense}
        onOpenBudgetsModal={() => setIsBudgetModalOpen(true)}
        onOpenBackupModal={() => setIsBackupModalOpen(true)}
      />

      {/* Add / Edit Expense Modal */}
      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => {
          setIsExpenseModalOpen(false);
          setEditingExpense(null);
        }}
        onSave={handleSaveExpense}
        editingExpense={editingExpense}
        currencySymbol={currencySymbol}
      />

      {/* Budget Limit Config Modal */}
      <EditBudgetModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
        budgets={budgets}
        onSaveBudgets={handleSaveBudgets}
        currencySymbol={currencySymbol}
      />

      {/* Data Export / Import Modal */}
      <ExportImportModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        expenses={expenses}
        onImportExpenses={handleImportExpenses}
        onResetDefaults={handleResetDefaults}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
