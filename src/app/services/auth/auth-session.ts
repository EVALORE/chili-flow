import { Injectable } from '@angular/core';
import { AuthUser } from './auth';

export const AUTH_TOKEN_STORAGE_KEY = 'chili-flow.auth.access-token';
export const AUTH_USER_STORAGE_KEY = 'chili-flow.auth.user';

export interface AuthSessionValue {
  accessToken: string;
  user: AuthUser;
}

@Injectable({ providedIn: 'root' })
export class AuthSession {
  set(session: AuthSessionValue): void {
    this.storage?.setItem(AUTH_TOKEN_STORAGE_KEY, session.accessToken);
    this.storage?.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(session.user));
  }

  get(): AuthSessionValue | null {
    const accessToken = this.getToken();
    const hasStoredUser = this.storage?.getItem(AUTH_USER_STORAGE_KEY) !== null;
    const user = this.getUser();

    if (accessToken && user) {
      return { accessToken, user };
    }

    if (accessToken || hasStoredUser) {
      this.clear();
    }

    return null;
  }

  getToken(): string | null {
    return this.storage?.getItem(AUTH_TOKEN_STORAGE_KEY) ?? null;
  }

  clear(): void {
    this.storage?.removeItem(AUTH_TOKEN_STORAGE_KEY);
    this.storage?.removeItem(AUTH_USER_STORAGE_KEY);
  }

  private getUser(): AuthUser | null {
    const rawUser = this.storage?.getItem(AUTH_USER_STORAGE_KEY);

    if (!rawUser) {
      return null;
    }

    try {
      const user = JSON.parse(rawUser) as unknown;
      return this.isAuthUser(user) ? user : null;
    } catch {
      return null;
    }
  }

  private isAuthUser(value: unknown): value is AuthUser {
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
  }

  private get storage(): Storage | null {
    try {
      return globalThis.localStorage ?? null;
    } catch {
      return null;
    }
  }
}
