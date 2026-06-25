import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@services/auth/auth-store';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthStore);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/discover']);
};
