import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AlbumWithTracks } from '@models/album';
import { map, Observable } from 'rxjs';
import { GetAlbumWithTracksResponse } from './jamendo-api.types';

@Injectable({
  providedIn: 'root',
})
export class JamendoService {
  private baseUrl = 'https://api.jamendo.com/v3.0';
  private clientId = 'a171a574';
  private http = inject(HttpClient);

  getAlbumWithTracks(albumId: string): Observable<AlbumWithTracks | null> {
    const endpointUrl = `${this.baseUrl}/albums/tracks/`;
    const params = new HttpParams()
      .set('client_id', this.clientId)
      .set('format', 'json')
      .set('id', albumId);

    return this.http
      .get<GetAlbumWithTracksResponse>(endpointUrl, { params })
      .pipe(map((data) => data.results[0] ?? null));
  }
}
