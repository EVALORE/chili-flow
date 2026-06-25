import { TestBed } from '@angular/core/testing';

import { AuthUser } from './auth';
import { AuthSession, AUTH_TOKEN_STORAGE_KEY, AUTH_USER_STORAGE_KEY } from './auth-session';

const user: AuthUser = {
  id: 'user-1',
  email: 'test@example.com',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

describe('AuthSession', () => {
  let authSession: AuthSession;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({});
    authSession = TestBed.inject(AuthSession);
  });

  afterEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
  });

  it('should persist and restore a full auth session', () => {
    authSession.set({ accessToken: 'access-token', user });

    expect(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)).toBe('access-token');
    expect(localStorage.getItem(AUTH_USER_STORAGE_KEY)).toBe(JSON.stringify(user));
    expect(authSession.get()).toEqual({ accessToken: 'access-token', user });
  });

  it('should return the access token from localStorage', () => {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, 'access-token');

    expect(authSession.getToken()).toBe('access-token');
  });

  it('should clear the auth session from localStorage', () => {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, 'access-token');
    localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));

    authSession.clear();

    expect(authSession.get()).toBeNull();
    expect(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem(AUTH_USER_STORAGE_KEY)).toBeNull();
  });

  it('should clear and return null when token exists without a user', () => {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, 'access-token');

    expect(authSession.get()).toBeNull();
    expect(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)).toBeNull();
  });

  it('should clear and return null when user exists without a token', () => {
    localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));

    expect(authSession.get()).toBeNull();
    expect(localStorage.getItem(AUTH_USER_STORAGE_KEY)).toBeNull();
  });

  it('should clear and return null when stored user JSON is malformed', () => {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, 'access-token');
    localStorage.setItem(AUTH_USER_STORAGE_KEY, '{');

    expect(authSession.get()).toBeNull();
    expect(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem(AUTH_USER_STORAGE_KEY)).toBeNull();
  });

  it('should clear and return null when stored user is invalid', () => {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, 'access-token');
    localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify({ id: 'user-1' }));

    expect(authSession.get()).toBeNull();
    expect(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem(AUTH_USER_STORAGE_KEY)).toBeNull();
  });
});
