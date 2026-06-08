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

  getFullArtistInfo(artistId: string): Observable<Result<ArtistModel>> {
    const endpointUrl = `${this.baseUrl}/artists/musicinfo`;
    const params = new HttpParams()
      .set('client_id', this.clientId)
      .set('format', 'json')
      .set('id', artistId);

    return this.http.get<GetFullArtistInfoApiResponse>(endpointUrl, { params }).pipe(
      map((data): Result<ArtistModel> => {
        const result = data.results[0];
        return result
          ? { status: 'success', data: toArtistModel(result) }
          : { status: 'notFound', message: `There is no artist with ${artistId} id` };
      }),
      catchError(
        (error: HttpErrorResponse): Observable<Result<ArtistModel>> =>
          of({ status: 'failed', message: error.message ?? 'Unknown error' }),
      ),
    );
  }

  getMostPopularArtists(
    order: 'popularity_total' | 'popularity_month' | 'popularity_week' = 'popularity_total',
    limit?: string,
  ): Observable<Result<ArtistModel[]>> {
    const endpointUrl = `${this.baseUrl}/artists/`;
    const params = new HttpParams()
      .set('client_id', this.clientId)
      .set('format', 'json')
      .set('limit', limit ?? '10')
      .set('order', order);

    return this.http.get<GetFullArtistInfoApiResponse>(endpointUrl, { params }).pipe(
      map((data): Result<ArtistModel[]> => {
        if (data.headers.status !== 'success') {
          return { status: 'failed', message: data.headers.error_message || 'API error' };
        }
        return {
          status: 'success',
          data: data.results.map((artist: ArtistApiResponse) => toArtistModel(artist)),
        };
      }),
      catchError(
        (error: HttpErrorResponse): Observable<Result<ArtistModel[]>> =>
          of({ status: 'failed', message: error.message ?? 'Unknown error' }),
      ),
    );
  }

  getArtistAlbums(artistId: string, limit?: string): Observable<Result<ArtistAlbumsResult>> {
    const endpointUrl = `${this.baseUrl}/albums`;
    const params = new HttpParams()
      .set('client_id', this.clientId)
      .set('format', 'json')
      .set('limit', limit ?? 10)
      .set('fullcount', true)
      .set('artist_id', artistId);

    return this.http.get<GetArtistAlbumsApiResponse>(endpointUrl, { params }).pipe(
      map((response): Result<ArtistAlbumsResult> => {
        if (response.headers.status !== 'success') {
          return { status: 'failed', message: response.headers.error_message || 'API error' };
        }
        return {
          status: 'success',
          data: {
            totalCount: Number(response.headers.results_fullcount ?? '0'),
            albums: toArtistAlbumsModel(response.results),
          },
        };
      }),
      catchError(
        (error: HttpErrorResponse): Observable<Result<ArtistAlbumsResult>> =>
          of({ status: 'failed', message: error.message ?? 'Unknown error' }),
      ),
    );
  }

  getArtistTracks(artistId: string): Observable<Result<ArtistTracksModel>> {
    const endpointUrl = `${this.baseUrl}/artists/tracks`;
    const params = new HttpParams()
      .set('client_id', this.clientId)
      .set('format', 'json')
      .set('id', artistId);

    return this.http.get<GetArtistTracksApiResponse>(endpointUrl, { params }).pipe(
      map((data): Result<ArtistTracksModel> => {
        if (data.headers.status !== 'success') {
          return { status: 'failed', message: data.headers.error_message || 'API error' };
        }
        const result = data.results[0];
        if (!result) {
          return { status: 'notFound', message: `There is no artist with ${artistId} id` };
        }
        if (result.tracks.length === 0) {
          return { status: 'notFound', message: `Artist ${artistId} has no tracks` };
        }
        return { status: 'success', data: toArtistTracksModel(result) };
      }),
      catchError(
        (error: HttpErrorResponse): Observable<Result<ArtistTracksModel>> =>
          of({ status: 'failed', message: error.message ?? 'Unknown error' }),
      ),
    );
  }
}
