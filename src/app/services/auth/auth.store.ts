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
import { AuthToken } from './auth-token';
import { AuthResponse, AuthState, AuthUser, LoginRequest, RegisterRequest } from './auth.model';
import { AuthApi } from './auth-api';
import { exhaustMap, pipe, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

export const AUTH_USER_STORAGE_KEY = 'chili-flow.auth.user';

const getStorage = (): Storage | null => {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
};

const isAuthUser = (value: unknown): value is AuthUser => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const user = value as Partial<Record<keyof AuthUser, unknown>>;

  return (
    typeof user.id === 'string' &&
    typeof user.email === 'string' &&
    typeof user.createdAt === 'string' &&
    typeof user.updatedAt === 'string'
  );
};

const readStoredUser = (): AuthUser | null => {
  const rawUser = getStorage()?.getItem(AUTH_USER_STORAGE_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    const user = JSON.parse(rawUser) as unknown;
    return isAuthUser(user) ? user : null;
  } catch {
    return null;
  }
};

const saveStoredUser = (user: AuthUser): void => {
  getStorage()?.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
};

const clearStoredUser = (): void => {
  getStorage()?.removeItem(AUTH_USER_STORAGE_KEY);
};

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
    isAuthenticated: computed(() => Boolean(user())),
    isPending: computed(() => status() === 'loading'),
    hasError: computed(() => status() === 'error'),
    isSuccess: computed(() => status() === 'success'),
  })),

  withMethods((store) => {
    const authSuccess = (response: AuthResponse) => {
      store.token.set(response.accessToken);
      saveStoredUser(response.user);

      patchState(store, {
        user: response.user,
        status: 'success',
        error: null,
      });
    };

    const authFailure = (message: string) => {
      store.token.clear();
      clearStoredUser();

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
        clearStoredUser();

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
      const token = store.token.get();
      const user = readStoredUser();

      if (token && user) {
        patchState(store, {
          user,
          status: 'success',
          error: null,
        });

        return;
      }

      if (token || user) {
        store.token.clear();
        clearStoredUser();
      }
    },
  }),
);
