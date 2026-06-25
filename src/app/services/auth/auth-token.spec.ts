import { TestBed } from '@angular/core/testing';

import { AuthToken, AUTH_TOKEN_STORAGE_KEY } from './auth-token';

describe('AuthToken', () => {
  let authToken: AuthToken;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({});
    authToken = TestBed.inject(AuthToken);
  });

  afterEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
  });

  it('should persist and read the access token from localStorage', () => {
    authToken.set('access-token');

    expect(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)).toBe('access-token');
    expect(authToken.get()).toBe('access-token');
  });

  it('should clear the access token from localStorage', () => {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, 'access-token');

    authToken.clear();

    expect(authToken.get()).toBeNull();
    expect(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)).toBeNull();
  });
});
