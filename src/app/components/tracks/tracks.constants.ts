import { TrackTableColumn, TrackTablePreset } from './tracks.types';

export const PRESET_COLUMNS: Record<TrackTablePreset, TrackTableColumn[]> = {
  album: ['number', 'title', 'duration'],
  artistSearch: ['number', 'title', 'album', 'duration'],
  playlist: ['number', 'title', 'album', 'date', 'duration'],
  recentlyPlayed: ['number', 'title', 'album', 'date', 'duration'],
  uploaded: ['number', 'title', 'date', 'duration', 'actions'],
};
