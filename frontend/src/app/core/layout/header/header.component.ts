import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ApiState } from '../../../features/dashboard/dashboard';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly apiState = input<ApiState>('checking');
  readonly currentMonth = 'Novembro de 2026';
}
