import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  register() {
    return '/auth/register';
  }

  login() {
    return '/auth/login';
  }

  playlists() {
    return '/playlists';
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
    return '/recently-played';
  }
}
