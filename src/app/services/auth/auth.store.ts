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
    loading: false,
    error: null,
  }),

  withProps(() => ({
    http: inject(AuthApi),
    token: inject(AuthToken),
  })),

  withComputed(({ user, loading }) => ({
    isAuthenticated: computed(() => Boolean(user())),
    canSubmit: computed(() => !loading()),
  })),

  withMethods((store) => {
    const authSuccess = (response: AuthResponse) => {
      store.token.set(response.accessToken);

      patchState(store, {
        user: response.user,
        loading: false,
        error: null,
      });
    };

    const authFailure = (message: string) => {
      store.token.clear();

      patchState(store, {
        user: null,
        loading: false,
        error: message,
      });
    };

    return {
      login: rxMethod<LoginRequest>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
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
          tap(() => patchState(store, { loading: true, error: null })),
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
          loading: false,
          error: null,
        });
      },
    };
  }),
);
