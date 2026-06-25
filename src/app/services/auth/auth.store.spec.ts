import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { AuthApi } from './auth-api';
import { AUTH_USER_STORAGE_KEY, AuthStore } from './auth.store';
import { AUTH_TOKEN_STORAGE_KEY } from './auth-token';
import { AuthResponse, AuthUser } from './auth.model';

const user: AuthUser = {
  id: 'user-1',
  email: 'test@example.com',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

const response: AuthResponse = {
  user,
  accessToken: 'access-token',
};

describe('AuthStore', () => {
  let authApi: {
    login: ReturnType<typeof vi.fn>;
    register: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    localStorage.clear();

    authApi = {
      login: vi.fn(),
      register: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthApi,
          useValue: authApi,
        },
      ],
    });
  });

  afterEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
  });

  it('should persist token and user when login succeeds', () => {
    authApi.login.mockReturnValue(of(response));
    const authStore = TestBed.inject(AuthStore);

    authStore.login({ email: 'test@example.com', password: 'password123' });

    expect(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)).toBe('access-token');
    expect(localStorage.getItem(AUTH_USER_STORAGE_KEY)).toBe(JSON.stringify(user));
    expect(authStore.user()).toEqual(user);
    expect(authStore.isAuthenticated()).toBe(true);
    expect(authStore.isSuccess()).toBe(true);
  });

  it('should restore a persisted authenticated user on init', () => {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, 'access-token');
    localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));

    const authStore = TestBed.inject(AuthStore);

    expect(authStore.user()).toEqual(user);
    expect(authStore.isAuthenticated()).toBe(true);
    expect(authStore.isSuccess()).toBe(true);
  });

  it('should clear persisted auth state on logout', () => {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, 'access-token');
    localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
    const authStore = TestBed.inject(AuthStore);

    authStore.logout();

    expect(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem(AUTH_USER_STORAGE_KEY)).toBeNull();
    expect(authStore.user()).toBeNull();
    expect(authStore.status()).toBe('idle');
  });

  it('should clear persisted auth state when login fails', () => {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, 'access-token');
    localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
    authApi.login.mockReturnValue(throwError(() => new Error('Invalid credentials')));
    const authStore = TestBed.inject(AuthStore);

    authStore.login({ email: 'test@example.com', password: 'password123' });

    expect(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem(AUTH_USER_STORAGE_KEY)).toBeNull();
    expect(authStore.user()).toBeNull();
    expect(authStore.error()).toBe('Login failed');
    expect(authStore.status()).toBe('error');
  });
});
