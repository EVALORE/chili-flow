import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { AuthApi } from './auth-api';
import { AuthSession } from './auth-session';
import { AuthStore } from './auth-store';
import { AuthResponse, AuthUser } from './auth';

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
  let authSession: {
    set: ReturnType<typeof vi.fn>;
    get: ReturnType<typeof vi.fn>;
    clear: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    authApi = {
      login: vi.fn(),
      register: vi.fn(),
    };
    authSession = {
      set: vi.fn(),
      get: vi.fn(() => null),
      clear: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthApi,
          useValue: authApi,
        },
        {
          provide: AuthSession,
          useValue: authSession,
        },
      ],
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should persist session and patch authenticated state when login succeeds', () => {
    authApi.login.mockReturnValue(of(response));
    const authStore = TestBed.inject(AuthStore);

    authStore.login({ email: 'test@example.com', password: 'password123' });

    expect(authSession.set).toHaveBeenCalledWith(response);
    expect(authStore.user()).toEqual(user);
    expect(authStore.isAuthenticated()).toBe(true);
    expect(authStore.isSuccess()).toBe(true);
  });

  it('should persist session and patch authenticated state when register succeeds', () => {
    authApi.register.mockReturnValue(of(response));
    const authStore = TestBed.inject(AuthStore);

    authStore.register({ email: 'test@example.com', password: 'password123' });

    expect(authSession.set).toHaveBeenCalledWith(response);
    expect(authStore.user()).toEqual(user);
    expect(authStore.isAuthenticated()).toBe(true);
    expect(authStore.isSuccess()).toBe(true);
  });

  it('should restore a persisted authenticated user on init', () => {
    authSession.get.mockReturnValue(response);

    const authStore = TestBed.inject(AuthStore);

    expect(authStore.user()).toEqual(user);
    expect(authStore.isAuthenticated()).toBe(true);
    expect(authStore.isSuccess()).toBe(true);
  });

  it('should clear persisted auth state on logout', () => {
    const authStore = TestBed.inject(AuthStore);

    authStore.logout();

    expect(authSession.clear).toHaveBeenCalled();
    expect(authStore.user()).toBeNull();
    expect(authStore.status()).toBe('idle');
  });

  it('should clear persisted auth state when login fails', () => {
    authApi.login.mockReturnValue(throwError(() => new Error('Invalid credentials')));
    const authStore = TestBed.inject(AuthStore);

    authStore.login({ email: 'test@example.com', password: 'password123' });

    expect(authSession.clear).toHaveBeenCalled();
    expect(authStore.user()).toBeNull();
    expect(authStore.error()).toBe('Login failed');
    expect(authStore.status()).toBe('error');
  });
});
