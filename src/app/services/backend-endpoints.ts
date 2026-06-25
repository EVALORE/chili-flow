import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BackendEndpoints {
  private readonly apiUrl = environment.apiUrl;

  register() {
    return `${this.apiUrl}/auth/register`;
  }

  login() {
    return `${this.apiUrl}/auth/login`;
  }

  playlists() {
    return `${this.apiUrl}/playlists`;
  }

  playlist(playlistId: string) {
    return `${this.playlists()}/${playlistId}`;
  }

  tracks(playlistId: string) {
    return `${this.playlist(playlistId)}/tracks`;
  }

  track(playlistId: string, trackId: string) {
    return `${this.tracks(playlistId)}/${trackId}`;
  }

  recentlyPlayed() {
    return `${this.apiUrl}/recently-played`;
  }
}

