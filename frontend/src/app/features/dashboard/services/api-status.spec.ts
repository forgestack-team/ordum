import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TimeoutError } from 'rxjs';
import { ApiStatus } from './api-status';

describe('ApiStatus', () => {
  let service: ApiStatus;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ApiStatus);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return healthcheck text response', () => {
    let result: string | undefined;

    service.getHealth().subscribe((data) => {
      result = data;
    });

    const req = httpTesting.expectOne('/api/v1/ping');
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('text');

    req.flush('pong');

    expect(result).toBe('pong');
  });

  it('should timeout when response is delayed', async () => {
    let receivedError: unknown;

    service.getHealth(50).subscribe({
      error: (err) => {
        receivedError = err;
      },
    });

    httpTesting.expectOne('/api/v1/ping');

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(receivedError).toBeInstanceOf(TimeoutError);
  });
});
