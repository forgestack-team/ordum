import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ApiStatus } from './services/api-status';

export type ApiState = 'checking' | 'online' | 'offline';

const LABELS: Record<ApiState, string> = {
  checking: 'Verificando',
  online: 'Online',
  offline: 'Offline',
};

@Component({
  imports: [],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private readonly apiStatusService = inject(ApiStatus);

  protected readonly apiState = signal<ApiState>('checking');
  protected readonly label = computed(() => LABELS[this.apiState()]);

  ngOnInit(): void {
    this.apiStatusService.getHealth().subscribe({
      next: () => {
        this.apiState.set('online');
      },
      error: () => {
        this.apiState.set('offline');
      },
    });
  }
}
