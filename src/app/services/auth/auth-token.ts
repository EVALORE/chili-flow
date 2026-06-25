import { Injectable } from '@angular/core';

export const AUTH_TOKEN_STORAGE_KEY = 'chili-flow.auth.access-token';

@Injectable({ providedIn: 'root' })
export class AuthToken {
  set(token: string): void {
    this.storage?.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  }

  get(): string | null {
    return this.storage?.getItem(AUTH_TOKEN_STORAGE_KEY) ?? null;
  }

  clear(): void {
    this.storage?.removeItem(AUTH_TOKEN_STORAGE_KEY);
  }

  private get storage(): Storage | null {
    try {
      return globalThis.localStorage ?? null;
    } catch {
      return null;
    }
  }
}
