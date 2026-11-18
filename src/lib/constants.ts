import { CategoryBudget, CategoryDef, Currency, Expense } from '@/types';

export const CURRENCIES: Currency[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee (₹)' },
  { code: 'USD', symbol: '$', name: 'US Dollar ($)' },
  { code: 'EUR', symbol: '€', name: 'Euro (€)' },
  { code: 'GBP', symbol: '£', name: 'British Pound (£)' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar (C$)' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar (A$)' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen (¥)' },
];

export const CATEGORIES: CategoryDef[] = [
  {
    id: 'food',
    name: 'Food & Dining',
    color: '#f97316',
    bgColor: 'bg-orange-50 dark:bg-orange-950/40',
    textColor: 'text-orange-600 dark:text-orange-400',
    iconName: 'Utensils',
  },
  {
    id: 'groceries',
    name: 'Groceries',
    color: '#10b981',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    iconName: 'ShoppingCart',
  },
  {
    id: 'housing',
    name: 'Rent & Housing',
    color: '#6366f1',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/40',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    iconName: 'Home',
  },
  {
    id: 'transport',
    name: 'Transportation',
    color: '#0284c7',
    bgColor: 'bg-sky-50 dark:bg-sky-950/40',
    textColor: 'text-sky-600 dark:text-sky-400',
    iconName: 'Car',
  },
  {
    id: 'utilities',
    name: 'Bills & Utilities',
    color: '#eab308',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/40',
    textColor: 'text-yellow-600 dark:text-yellow-400',
    iconName: 'Zap',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    color: '#ec4899',
    bgColor: 'bg-pink-50 dark:bg-pink-950/40',
    textColor: 'text-pink-600 dark:text-pink-400',
    iconName: 'Film',
  },
  {
    id: 'health',
    name: 'Health & Medical',
    color: '#ef4444',
    bgColor: 'bg-red-50 dark:bg-red-950/40',
    textColor: 'text-red-600 dark:text-red-400',
    iconName: 'HeartPulse',
  },
  {
    id: 'shopping',
    name: 'Shopping',
    color: '#8b5cf6',
    bgColor: 'bg-purple-50 dark:bg-purple-950/40',
    textColor: 'text-purple-600 dark:text-purple-400',
    iconName: 'ShoppingBag',
  },
  {
    id: 'education',
    name: 'Education',
    color: '#14b8a6',
    bgColor: 'bg-teal-50 dark:bg-teal-950/40',
    textColor: 'text-teal-600 dark:text-teal-400',
    iconName: 'GraduationCap',
  },
  {
    id: 'other',
    name: 'Miscellaneous',
    color: '#64748b',
    bgColor: 'bg-slate-100 dark:bg-slate-800',
    textColor: 'text-slate-600 dark:text-slate-400',
    iconName: 'MoreHorizontal',
  },
];

export const DEFAULT_BUDGETS: CategoryBudget[] = [
  { category: 'Food & Dining', limit: 8000 },
  { category: 'Groceries', limit: 12000 },
  { category: 'Rent & Housing', limit: 25000 },
  { category: 'Transportation', limit: 5000 },
  { category: 'Bills & Utilities', limit: 4500 },
  { category: 'Entertainment', limit: 4000 },
  { category: 'Health & Medical', limit: 3000 },
  { category: 'Shopping', limit: 6000 },
  { category: 'Education', limit: 3000 },
  { category: 'Miscellaneous', limit: 2000 },
];

export const INITIAL_EXPENSES: Expense[] = [];
