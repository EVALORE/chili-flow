import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AuthSession } from './auth-session';
import { AuthResponse, AuthState, LoginRequest, RegisterRequest } from './auth';
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
    api: inject(AuthApi),
    session: inject(AuthSession),
  })),

  withComputed(({ user, status }) => ({
    isAuthenticated: computed(() => Boolean(user())),
    isPending: computed(() => status() === 'loading'),
    isSuccess: computed(() => status() === 'success'),
  })),

  withMethods((store) => {
    const authSuccess = (response: AuthResponse) => {
      store.session.set(response);

      patchState(store, {
        user: response.user,
        status: 'success',
        error: null,
      });
    };

    const authFailure = (message: string) => {
      store.session.clear();

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
            store.api.login(body).pipe(
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
            store.api.register(body).pipe(
              tapResponse({
                next: authSuccess,
                error: () => authFailure('Registration failed'),
              }),
            ),
          ),
        ),
      ),
      logout: () => {
        store.session.clear();

        patchState(store, {
          user: null,
          status: 'idle',
          error: null,
        });
      },
    };
  }),

  withHooks({
    onInit(store) {
      const session = store.session.get();

      if (session) {
        patchState(store, {
          user: session.user,
          status: 'success',
          error: null,
        });
      }
    },
  }),
);
