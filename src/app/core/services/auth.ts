import { Injectable, signal } from '@angular/core';

const MOCK_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZWNkYWViMy0xZDIzLTRjMTktODVkMy1lY2VjZWFiY2E2YWEiLCJlbWFpbCI6ImRldmVsb3BlckBleGFtcGxlLmNvbSIsImlhdCI6MTc4MTUzNTMwNiwiZXhwIjoxNzgyMTQwMTA2fQ.mAMnZOK7_MKDx4F9Lw8Kp7hHnyNVS55I45nw-8nsUzU';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly isAuthenticated = signal<boolean>(true);

  getToken(): string {
    return MOCK_ACCESS_TOKEN;
  }
}
