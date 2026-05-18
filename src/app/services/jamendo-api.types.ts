import { AlbumWithTracks } from '@models/album';

export interface Headers {
  status: string;
  code: number;
  error_message: string;
  warnings: string;
  results_count: number;
}

export interface GetAlbumWithTracksResponse {
  headers: Headers;
  results: AlbumWithTracks[];
}
