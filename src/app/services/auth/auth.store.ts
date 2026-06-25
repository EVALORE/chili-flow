import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AuthToken } from './auth-token';
import { AuthResponse, AuthState, LoginRequest, RegisterRequest } from './auth.model';
import { AuthApi } from './auth-api';
import { exhaustMap, pipe, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

export const AuthStore = signalStore(
  { providedIn: 'root' },

  withState<AuthState>({
    user: null,
    error: null,
    status: 'idle',
  }),

  withProps(() => ({
    http: inject(AuthApi),
    token: inject(AuthToken),
  })),

  withComputed(({ user, status }) => ({
    isAuthenticated: computed(() => Boolean(user()) && status() === 'success'),
    isPending: computed(() => status() === 'loading'),
    hasError: computed(() => status() === 'error'),
    isSuccess: computed(() => status() === 'success'),
  })),

  withMethods((store) => {
    const authSuccess = (response: AuthResponse) => {
      store.token.set(response.accessToken);

      patchState(store, {
        user: response.user,
        status: 'success',
        error: null,
      });
    };

    const authFailure = (message: string) => {
      store.token.clear();

      patchState(store, {
        user: null,
        status: 'error',
        error: message,
      });
    };

    return {
      login: rxMethod<LoginRequest>(
        pipe(
          tap(() => patchState(store, { error: null, status: 'loading' })),
          exhaustMap((body) =>
            store.http.login(body).pipe(
              tapResponse({
                next: authSuccess,
                error: () => authFailure('Login failed'),
              }),
            ),
          ),
        ),
      ),

      register: rxMethod<RegisterRequest>(
        pipe(
          tap(() => patchState(store, { status: 'loading', error: null })),
          exhaustMap((body) =>
            store.http.register(body).pipe(
              tapResponse({
                next: authSuccess,
                error: () => authFailure('Registration failed'),
              }),
            ),
          ),
        ),
      ),
      logout: () => {
        store.token.clear();

        patchState(store, {
          user: null,
          status: 'idle',
          error: null,
        });
      },
    };
  }),
);
