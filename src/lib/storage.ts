import { CategoryBudget, Expense } from '@/types';
import { DEFAULT_BUDGETS, INITIAL_EXPENSES } from './constants';

const EXPENSES_KEY = 'et_expenses_v2';
const BUDGETS_KEY = 'et_budgets_v1';
const CURRENCY_KEY = 'et_currency_v1';

export const storage = {
  getExpenses: (): Expense[] => {
    if (typeof window === 'undefined') return [];
    try {
      // Clear any legacy demo data from v1
      localStorage.removeItem('et_expenses_v1');

      const data = localStorage.getItem(EXPENSES_KEY);
      if (!data) {
        localStorage.setItem(EXPENSES_KEY, JSON.stringify([]));
        return [];
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse expenses from localStorage', e);
      return [];
    }
  },

  saveExpenses: (expenses: Expense[]): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
    } catch (e) {
      console.error('Failed to save expenses to localStorage', e);
    }
  },

  getBudgets: (): CategoryBudget[] => {
    if (typeof window === 'undefined') return DEFAULT_BUDGETS;
    try {
      const data = localStorage.getItem(BUDGETS_KEY);
      if (!data) {
        localStorage.setItem(BUDGETS_KEY, JSON.stringify(DEFAULT_BUDGETS));
        return DEFAULT_BUDGETS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse budgets from localStorage', e);
      return DEFAULT_BUDGETS;
    }
  },

  saveBudgets: (budgets: CategoryBudget[]): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
    } catch (e) {
      console.error('Failed to save budgets to localStorage', e);
    }
  },

  getCurrency: (): string => {
    if (typeof window === 'undefined') return 'INR';
    try {
      return localStorage.getItem(CURRENCY_KEY) || 'INR';
    } catch {
      return 'INR';
    }
  },

  saveCurrency: (currencyCode: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(CURRENCY_KEY, currencyCode);
    } catch (e) {
      console.error('Failed to save currency to localStorage', e);
    }
  },

  resetToDefaults: () => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(INITIAL_EXPENSES));
    localStorage.setItem(BUDGETS_KEY, JSON.stringify(DEFAULT_BUDGETS));
    localStorage.setItem(CURRENCY_KEY, 'INR');
  },

  clearAllData: () => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(EXPENSES_KEY, JSON.stringify([]));
  },
};
