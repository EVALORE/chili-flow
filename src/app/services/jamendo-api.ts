import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AlbumWithTracks } from '@models/album';
import { catchError, map, Observable, of } from 'rxjs';
import {
  GetAlbumWithTracksResponse,
  GetArtistAlbumsApiResponse,
  GetArtistTracksApiResponse,
  GetFullArtistInfoApiResponse,
} from './jamendo-api.types';
import {
  ArtistAlbumsResult,
  ArtistApiResponse,
  ArtistModel,
  ArtistTracksModel,
} from '@views/artist/artist.model';
import {
  toArtistAlbumsModel,
  toArtistModel,
  toArtistTracksModel,
} from '@views/artist/artist.mapper';
import { Result } from '@models/result';

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

    return this.http.get<GetAlbumWithTracksResponse>(endpointUrl, { params }).pipe(
      map((data) => {
        const album = data.results[0];
        if (!album) {
          throw new Error('Album not found');
        }
        return album;
      }),
    );
  }
}
