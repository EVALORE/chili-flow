import { TrackTableRow } from './tracks.types';
import { filterTracks, sortTracks } from './tracks.utils';

const tracks: TrackTableRow[] = [
  {
    id: 'alpha',
    title: 'Alpha',
    artists: ['Mira Sol'],
    album: 'Zulu',
    durationSeconds: 240,
    dateAdded: '2025-02-01',
  },
  {
    id: 'bravo',
    title: 'Bravo',
    artists: ['North Arcade'],
    album: 'Echo',
    durationSeconds: 120,
    dateAdded: '2025-01-01',
  },
  {
    id: 'charlie',
    title: 'Charlie',
    artists: ['Iris Mode'],
    album: 'Delta',
    durationSeconds: 180,
  },
];

describe('track table utilities', () => {
  it('should filter by title, artist, and album', () => {
    expect(filterTracks(tracks, 'alpha').map(trackId)).toEqual(['alpha']);
    expect(filterTracks(tracks, 'north').map(trackId)).toEqual(['bravo']);
    expect(filterTracks(tracks, 'delta').map(trackId)).toEqual(['charlie']);
  });

  it('should sort title, date, and duration values', () => {
    expect(sortTracks(tracks, { column: 'title', direction: 'asc' }).map(trackId)).toEqual([
      'alpha',
      'bravo',
      'charlie',
    ]);
    expect(sortTracks(tracks, { column: 'date', direction: 'asc' }).map(trackId)).toEqual([
      'bravo',
      'alpha',
      'charlie',
    ]);
    expect(sortTracks(tracks, { column: 'duration', direction: 'asc' }).map(trackId)).toEqual([
      'bravo',
      'charlie',
      'alpha',
    ]);
  });

  function trackId(track: TrackTableRow): string {
    return track.id;
  }
});
