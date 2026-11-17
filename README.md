# ExpensePulse — Modern Personal Finance & Budget Tracker

A responsive personal expense tracker and budget management web application built with **Next.js (App Router)**, **React 19**, **Tailwind CSS**, and **Lucide Icons**. All data is stored in your browser's **LocalStorage** with zero backend or database setup needed, functioning 100% offline.

---

## 🚀 Key Features

### 1. 📊 Core Expense Tracking
- **Add, Edit, and Delete Expenses**: Track expenses with title, amount, category, date, payment method, and optional notes.
- **Categorization**: 10 pre-configured categories with custom icons and color badges (Food & Dining, Groceries, Rent & Housing, Transportation, Bills & Utilities, Entertainment, Health & Medical, Shopping, Education, and Miscellaneous).
- **Payment Methods**: Tag expenses by UPI, Credit Card, Debit Card, Cash, or Net Banking.
- **Search & Filtering**: Real-time instant search across titles and notes, filter by category and payment method.
- **Sorting**: Sort by newest, oldest, highest amount, or lowest amount.

### 2. 🎯 Budget Management & Alerts
- **Category Spending Limits**: Set monthly budget caps for every single category.
- **Real-time Progress Bars**: Visual progress bars showing exactly how much of each budget has been consumed.
- **Visual Alert Badges**:
  - 🟢 **Safe**: < 75% budget used
  - 🟡 **Caution**: 75% – 100% budget used
  - 🔴 **Over Budget**: Exceeded limit with exact overspend calculation
- **Total Budget Health**: Total monthly budget summary showing overall remaining savings or overspend.

### 3. 📈 Analytics & Summaries
- **KPI Cards**:
  - Total Monthly Expenses
  - Total Monthly Budget Cap
  - Remaining Budget / Net Savings
  - Average Expense per item
- **Spending Breakdown**: Visual percentage breakdown of where your money went, with a highlight for the highest expense category.

### 4. 💾 Local Storage & Data Portability
- **100% Offline & Private**: Stored directly in your browser's `localStorage`.
- **Export to CSV**: Download all transactions as a `.csv` spreadsheet file for backup or Excel analysis.
- **Import from CSV**: Restore or append transactions from any standard CSV.
- **Currency Switcher**: Seamlessly switch between ₹ (INR), $ (USD), € (EUR), £ (GBP), C$ (CAD), A$ (AUD), and ¥ (JPY).
- **Reset / Clear**: One-click demo data reset or wipe clean.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server & Client Components)
- **Library**: React 19
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: Browser LocalStorage API
- **Language**: TypeScript

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 3. Production Build
```bash
npm run build
npm run start
```
