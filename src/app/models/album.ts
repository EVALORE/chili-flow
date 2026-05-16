export interface Album {
  id: string;
  name: string;
  releasedate: string;
  artist_id: string;
  artist_name: string;
  track_id: string;
  image: string;
  zip: string;
  zip_allowed: boolean;
}

export interface AlbumWithTracks extends Album {
  tracks: Track[];
}

export interface Track {
  count: string;
  id: string;
  position: string;
  name: string;
  duration: string;
  license_ccurl: string;
  audio: string;
  audiodownload: string;
  audiodownload_allowed: boolean;
}
