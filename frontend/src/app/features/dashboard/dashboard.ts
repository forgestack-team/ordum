import { Component, inject, OnInit, signal } from '@angular/core';
import { Dashboard as DashboardService } from './services/dashboard';

@Component({
  imports: [],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  protected readonly apiStatus = signal('Verificando');

  ngOnInit(): void {
    this.dashboardService.getHealth().subscribe({
      next: () => {
        this.apiStatus.set('Online');
      },
      error: () => {
        this.apiStatus.set('Offline');
      },
    });
  }
}
