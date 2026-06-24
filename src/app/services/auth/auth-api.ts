import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BackendEndpoints } from '@services/backend-endpoints';
import { AuthResponse, LoginRequest, RegisterRequest } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private readonly _http = inject(HttpClient);
  private readonly _api = inject(BackendEndpoints);

  register(body: RegisterRequest) {
    return this._http.post<AuthResponse>(this._api.register(), body);
  }

  login(body: LoginRequest) {
    return this._http.post<AuthResponse>(this._api.login(), body);
  }
}
