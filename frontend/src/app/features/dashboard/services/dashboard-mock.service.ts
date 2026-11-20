import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DashboardSummary } from '../models/dashboard-summary.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardMockService {
  private readonly mockData: DashboardSummary = {
    currentBalance: 4250.0,
    projectedBalance: 2890.0,
    monthIncomePending: 800.0,
    monthExpensePending: 2160.0,
    monthSavings: 1360.0,
    accounts: [
      {
        id: 'acc-1',
        name: 'Nubank',
        institution: 'Nu Pagamentos',
        type: 'CHECKING',
        balance: 2500.0,
        color: '#820ad1',
      },
      {
        id: 'acc-2',
        name: 'Banco Inter',
        institution: 'Inter',
        type: 'SAVINGS',
        balance: 1500.0,
        color: '#ff7a00',
      },
      {
        id: 'acc-3',
        name: 'Carteira Física',
        institution: 'Dinheiro em Mãos',
        type: 'CASH',
        balance: 250.0,
        color: '#137a52',
      },
    ],
    recentTransactions: [
      {
        id: 'tx-1',
        description: 'Aluguel do Apartamento',
        amount: 1200.0,
        type: 'EXPENSE',
        status: 'PENDING',
        date: '2026-11-25',
        category: 'Moradia',
        accountName: 'Nubank',
        isRecurring: true,
      },
      {
        id: 'tx-2',
        description: 'Internet Fibra',
        amount: 160.0,
        type: 'EXPENSE',
        status: 'PENDING',
        date: '2026-11-22',
        category: 'Serviços',
        accountName: 'Nubank',
        isRecurring: true,
      },
      {
        id: 'tx-3',
        description: 'Projeto Freelance Web',
        amount: 800.0,
        type: 'INCOME',
        status: 'PENDING',
        date: '2026-11-28',
        category: 'Renda Extra',
        accountName: 'Banco Inter',
        isRecurring: false,
      },
      {
        id: 'tx-4',
        description: 'Supermercado Mensal',
        amount: 540.0,
        type: 'EXPENSE',
        status: 'CONFIRMED',
        date: '2026-11-18',
        category: 'Alimentação',
        accountName: 'Nubank',
        isRecurring: false,
      },
      {
        id: 'tx-5',
        description: 'Salário Empresa',
        amount: 4500.0,
        type: 'INCOME',
        status: 'CONFIRMED',
        date: '2026-11-05',
        category: 'Salário',
        accountName: 'Banco Inter',
        isRecurring: true,
      },
    ],
    expensesByCategory: [
      {
        category: 'Moradia',
        amount: 1200.0,
        percentage: 45,
        color: '#6750d8',
      },
      {
        category: 'Alimentação',
        amount: 680.0,
        percentage: 25,
        color: '#b42f48',
      },
      {
        category: 'Serviços',
        amount: 320.0,
        percentage: 15,
        color: '#ff7a00',
      },
      {
        category: 'Transporte',
        amount: 250.0,
        percentage: 10,
        color: '#137a52',
      },
      {
        category: 'Outros',
        amount: 150.0,
        percentage: 5,
        color: '#625f78',
      },
    ],
    cashFlowHistory: [
      { month: 'Jun', income: 4200, expense: 2800 },
      { month: 'Jul', income: 4300, expense: 3100 },
      { month: 'Ago', income: 4500, expense: 2900 },
      { month: 'Set', income: 4800, expense: 3400 },
      { month: 'Out', income: 4500, expense: 3200 },
      { month: 'Nov', income: 5300, expense: 2700 },
    ],
  };

  getDashboardSummary(): Observable<DashboardSummary> {
    // Simula uma resposta assíncrona da API com 200ms de latência
    return of(this.mockData).pipe(delay(200));
  }
}
