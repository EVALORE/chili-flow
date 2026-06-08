export interface ArtistModel {
  id: string;
  name: string;
  joinDate: string;
  image: string;
  tags?: string[];
  biography?: string;
}

export interface ArtistApiResponse {
  id: string;
  name: string;
  website: string;
  joindate: string;
  image: string;
  shorturl: string;
  shareurl: string;
  musicinfo?: {
    tags: string[];
    description: {
      en: string;
    };
  };
}

export interface ArtistAlbumsModel {
  id: string;
  name: string;
  artistName: string;
  image: string;
  shortUrl: string;
  shareUrl: string;
}

export interface ArtistAlbumsResult {
  totalCount: number;
  albums: ArtistAlbumsModel[];
}

export interface ArtistTracksModel {
  id: string;
  name: string;
  image: string;
  tracks: {
    id: string;
    albumId: string;
    albumName: string;
    name: string;
    duration: string;
  }[];
}

export interface ArtistTracksApiResponse {
  id: string;
  name: string;
  website: string;
  joindate: string;
  image: string;
  tracks: {
    album_id: string;
    album_name: string;
    id: string;
    name: string;
    duration: string;
    releasedate: string;
    license_ccurl: string;
    album_image: string;
    image: string;
    audio: string;
    audiodownload: string;
    audiodownload_allowed: boolean;
  }[];
}
