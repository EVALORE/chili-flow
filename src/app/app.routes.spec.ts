import { Route } from '@angular/router';
import { routes } from './app.routes';
import { AppLayout, AuthLayout } from './layouts';

describe('routes', () => {
  it('should configure main app routes under AppLayout', () => {
    const appRoute = getRoute('');

    expect(appRoute.component).toBe(AppLayout);
    expect(appRoute.children?.map((route) => route.path)).toEqual([
      '',
      'discover',
      'album/:id',
      'library',
      'artist/:id',
    ]);
  });

  it('should configure auth routes under AuthLayout', () => {
    const authRoute = getRoute('auth');

    expect(authRoute.component).toBe(AuthLayout);
    expect(authRoute.children?.map((route) => route.path)).toEqual(['', 'login', 'register', '**']);
  });

  it('should keep a wildcard route for unknown paths', () => {
    expect(getRoute('**').loadComponent).toBeDefined();
  });

  function getRoute(path: string): Route {
    const route = routes.find((candidate) => candidate.path === path);

    if (!route) {
      throw new Error(`Route "${path}" is not configured.`);
    }

    return route;
  }
});
