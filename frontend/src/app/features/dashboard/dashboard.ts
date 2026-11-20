import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ApiStatus } from './services/api-status';
import { DashboardMockService } from './services/dashboard-mock.service';
import { DashboardSummary } from './models/dashboard-summary.model';

export type ApiState = 'checking' | 'online' | 'offline';

const LABELS: Record<ApiState, string> = {
  checking: 'Verificando',
  online: 'Online',
  offline: 'Offline',
};

@Component({
  imports: [CommonModule, CurrencyPipe, DatePipe, MatIconModule],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private readonly apiStatusService = inject(ApiStatus);
  private readonly mockService = inject(DashboardMockService);

  protected readonly apiState = signal<ApiState>('checking');
  protected readonly label = computed(() => LABELS[this.apiState()]);
  protected readonly summary = signal<DashboardSummary | null>(null);

  ngOnInit(): void {
    // Healthcheck
    this.apiStatusService.getHealth().subscribe({
      next: () => {
        this.apiState.set('online');
      },
      error: () => {
        this.apiState.set('offline');
      },
    });

    // Carrega dados mockados
    this.mockService.getDashboardSummary().subscribe((data) => {
      this.summary.set(data);
    });
  }
}
