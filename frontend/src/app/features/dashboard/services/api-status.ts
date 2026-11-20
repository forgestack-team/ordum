import { inject, Injectable } from '@angular/core';
import { timeout } from 'rxjs';
import { Api } from '../../../core/services/api';

@Injectable({
  providedIn: 'root',
})
export class ApiStatus {
  private readonly api = inject(Api);

  getHealth(timeoutMs = 5000) {
    return this.api.getText('/v1/ping').pipe(timeout(timeoutMs));
  }
}
