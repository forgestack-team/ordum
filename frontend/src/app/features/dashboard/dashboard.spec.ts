import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';

describe('Dashboard Component', () => {
  let fixture: ComponentFixture<Dashboard>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create the component', () => {
    fixture = TestBed.createComponent(Dashboard);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should set status to Online when API responds successfully', () => {
    fixture = TestBed.createComponent(Dashboard);
    fixture.detectChanges();

    const req = httpTesting.expectOne('/api/v1/ping');
    req.flush('pong');

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.status-online')?.textContent?.trim()).toBe('Online');
  });

  it('should set status to Offline when API responds with error', () => {
    fixture = TestBed.createComponent(Dashboard);
    fixture.detectChanges();

    const req = httpTesting.expectOne('/api/v1/ping');
    req.flush('', { status: 500, statusText: 'Erro' });

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.status-offline')?.textContent?.trim()).toBe('Offline');
  });
});
