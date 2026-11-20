import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  readonly navItems: NavItem[] = [
    { label: 'Visão geral', icon: 'grid_view', route: '/' },
    { label: 'Lançamentos', icon: 'receipt_long', route: '/transactions' },
    { label: 'Contas', icon: 'account_balance_wallet', route: '/accounts' },
    { label: 'Categorias', icon: 'category', route: '/categories' },
    { label: 'Transferências', icon: 'swap_horiz', route: '/transfers' },
    { label: 'Recorrências', icon: 'autorenew', route: '/recurrings' },
  ];

  readonly bottomItems: NavItem[] = [
    { label: 'Configurações', icon: 'settings', route: '/settings' },
  ];
}
