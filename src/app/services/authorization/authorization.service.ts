import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
  private readonly _apiService = inject(ApiService);
  private readonly _httpClient = inject(HttpClient);

  register() {
    this._httpClient.post(this._apiService.register(), {});
  }
}
