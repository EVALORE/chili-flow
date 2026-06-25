import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from './app.routes';
import { NotFound } from './views/not-found/not-found';

describe('routes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
  });

  it('should render Discover for /discover', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/discover');

    expect(harness.routeNativeElement?.textContent).toContain('Find your next favorite album');
  });

  it('should render NotFound for unknown routes', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/missing-page', NotFound);

    expect(harness.routeNativeElement?.textContent).toContain('Page not found');
    expect(harness.routeNativeElement?.querySelector('a')?.getAttribute('href')).toBe('/discover');
  });
});
