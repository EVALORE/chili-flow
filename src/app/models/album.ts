export interface Album {
  source: string;
  sourceId: string;
  title: string;
  artist: string;
  artistId: string;
  releaseDate: string;
  coverUrl: string;
  zipUrl: string;
  shareUrl: string | null;
  zipAllowed: boolean;
  trackCount: number;
}

export interface AlbumWithTracks extends Album {
  tracks: Track[];
}

export interface Track {
  source: string;
  sourceId: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  position: number;
  duration: number;
  coverUrl: string;
  audioUrl: string;
  downloadUrl: string;
  shareUrl: string | null;
  licenseUrl: string;
  audiodownloadAllowed: boolean;
}
