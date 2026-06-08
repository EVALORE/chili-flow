import {
  ArtistAlbumsModel,
  ArtistApiResponse,
  ArtistModel,
  ArtistTracksApiResponse,
  ArtistTracksModel,
} from '@views/artist/artist.model';
import { removeHtml } from '@utils/text-utility';
import { ArtistAlbumsApiResponse } from '@services/jamendo-api.types';

export function toArtistModel(a: ArtistApiResponse): ArtistModel {
  return {
    id: a.id,
    name: a.name,
    joinDate: a.joindate,
    image: a.image,
    tags: a.musicinfo?.tags,
    biography: removeHtml(a.musicinfo?.description?.en ?? ''),
  };
}

export function toArtistAlbumsModel(artistAlbums: ArtistAlbumsApiResponse[]): ArtistAlbumsModel[] {
  return artistAlbums.map((value) => ({
    id: value.id,
    name: value.name,
    artistName: value.artist_name,
    image: value.image,
    shortUrl: value.shorturl,
    shareUrl: value.shareurl,
  }));
}

export function toArtistTracksModel(a: ArtistTracksApiResponse): ArtistTracksModel {
  return {
    id: a.id,
    name: a.name,
    image: a.image,
    tracks: a.tracks.slice(0, 10).map((track) => ({
      id: track.id,
      albumId: track.album_id,
      albumName: track.album_name,
      name: track.name,
      duration: track.duration,
    })),
  };
}
