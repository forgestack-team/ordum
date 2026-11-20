import { Account } from './account.model';
import { Transaction } from './transaction.model';

export interface CategoryExpense {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface MonthlyCashFlow {
  month: string;
  income: number;
  expense: number;
}

export interface DashboardSummary {
  currentBalance: number;
  projectedBalance: number;
  monthIncomePending: number;
  monthExpensePending: number;
  monthSavings: number;
  accounts: Account[];
  recentTransactions: Transaction[];
  expensesByCategory: CategoryExpense[];
  cashFlowHistory: MonthlyCashFlow[];
}
