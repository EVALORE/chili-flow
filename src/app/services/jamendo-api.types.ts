import { AlbumWithTracks } from '@models/album';

import { ArtistApiResponse, ArtistTracksApiResponse } from '@views/artist/artist.model';

export interface JamendoHeadersApiResponse {
  status: string;
  code: number;
  error_message: string;
  warnings: string;
  results_count: number;
  results_fullcount?: string;
  next?: string;
}

export interface GetAlbumWithTracksResponse {
  headers: JamendoHeadersApiResponse;
  results: AlbumWithTracks[];
}

export interface GetFullArtistInfoApiResponse {
  headers: JamendoHeadersApiResponse;
  results: ArtistApiResponse[];
}

export interface GetArtistAlbumsApiResponse {
  headers: JamendoHeadersApiResponse;
  results: ArtistAlbumsApiResponse[];
}

export interface ArtistAlbumsApiResponse {
  id: string;
  name: string;
  releasedate: string;
  artist_id: string;
  artist_name: string;
  image: string;
  zip: string;
  shorturl: string;
  shareurl: string;
  zip_allowed: boolean;
}

export interface GetArtistTracksApiResponse {
  headers: JamendoHeadersApiResponse;
  results: ArtistTracksApiResponse[];
}


export interface GetFullArtistInfoApiResponse {
  headers: JamendoHeadersApiResponse;
  results: ArtistApiResponse[];
}

export interface GetArtistAlbumsApiResponse {
  headers: JamendoHeadersApiResponse;
  results: ArtistAlbumsApiResponse[];
}

export interface ArtistAlbumsApiResponse {
  id: string;
  name: string;
  releasedate: string;
  artist_id: string;
  artist_name: string;
  image: string;
  zip: string;
  shorturl: string;
  shareurl: string;
  zip_allowed: boolean;
}

export interface GetArtistTracksApiResponse {
  headers: JamendoHeadersApiResponse;
  results: ArtistTracksApiResponse[];
}


export interface GetFullArtistInfoApiResponse {
  headers: JamendoHeadersApiResponse;
  results: ArtistApiResponse[];
}


export interface GetArtistAlbumsApiResponse {
  headers: JamendoHeadersApiResponse;
  results: ArtistAlbumsApiResponse[];
}

export interface ArtistAlbumsApiResponse {
  id: string;
  name: string;
  releasedate: string;
  artist_id: string;
  artist_name: string;
  image: string;
  zip: string;
  shorturl: string;
  shareurl: string;
  zip_allowed: boolean;
}

export interface GetArtistTracksApiResponse {
  headers: JamendoHeadersApiResponse;
  results: ArtistTracksApiResponse[];
}
