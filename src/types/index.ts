export type PaymentMethod = 'UPI' | 'Credit Card' | 'Debit Card' | 'Cash' | 'Net Banking' | 'Other';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string; // YYYY-MM-DD
  paymentMethod: PaymentMethod;
  notes?: string;
  createdAt: number;
}

export interface CategoryBudget {
  category: string;
  limit: number;
}

export interface CategoryDef {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  textColor: string;
  iconName: string;
}

export type Currency = {
  code: string;
  symbol: string;
  name: string;
};
