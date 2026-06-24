import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthToken } from '@services/auth/auth-token';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthToken).get();
  const isApiRequest = request.url.startsWith(environment.apiUrl);
  const isAuthRequest = request.url.includes('/auth/');

  if (!token || !isApiRequest || isAuthRequest) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
};
