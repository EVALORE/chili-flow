import { Track } from './album';

export interface Playlist {
  id: string;
  name: string;
  creationdate: string;
  user_id: string;
  user_name: string;
}

export interface PlaylistWithTracks extends Playlist {
  tracks: Track[];
}
