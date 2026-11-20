export type TransactionType = 'INCOME' | 'EXPENSE' | 'TRANSFER';
export type TransactionStatus = 'CONFIRMED' | 'PENDING' | 'OVERDUE';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  date: string; // formato ISO ou YYYY-MM-DD
  category: string;
  accountName: string;
  isRecurring?: boolean;
}
