import { inject, Injectable } from '@angular/core';
import { Api } from '../../../core/services/api';

@Injectable({
  providedIn: 'root',
})
export class Dashboard {
  private readonly api = inject(Api);

  getHealth() {
    return this.api.getText('/v1/ping');
  }
}
