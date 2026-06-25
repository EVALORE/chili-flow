import { Track } from './album';

export interface Playlist {
  id: string;
  name: string;
  description: string;
  totalDuration: number;
  trackCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PlaylistWithTracks extends Playlist {
  tracks: Track[];
}
