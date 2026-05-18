import { TrackTableRow, TrackTableSort } from './tracks.types';

export function artistsText(track: TrackTableRow): string {
  return track.artists?.filter(Boolean).join(', ') ?? '';
}

export function searchText(track: TrackTableRow): string {
  return [track.title, artistsText(track), track.album].filter(Boolean).join(' ').toLowerCase();
}

export function filterTracks(tracks: TrackTableRow[], query: string): TrackTableRow[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return tracks;
  }

  return tracks.filter((track) => searchText(track).includes(normalizedQuery));
}

export function sortTracks(tracks: TrackTableRow[], sort: TrackTableSort | null): TrackTableRow[] {
  if (!sort) {
    return tracks;
  }

  return [...tracks].sort((a, b) => compareRows(a, b, sort));
}

function compareRows(a: TrackTableRow, b: TrackTableRow, sort: TrackTableSort): number {
  const direction = sort.direction === 'asc' ? 1 : -1;

  if (sort.column === 'duration') {
    return (a.durationSeconds - b.durationSeconds) * direction;
  }

  if (sort.column === 'date') {
    return compareDates(a.dateAdded, b.dateAdded, direction);
  }

  const aValue = sort.column === 'album' ? (a.album ?? '') : a.title;
  const bValue = sort.column === 'album' ? (b.album ?? '') : b.title;

  return aValue.localeCompare(bValue, undefined, { sensitivity: 'base' }) * direction;
}

function compareDates(
  a: string | Date | undefined,
  b: string | Date | undefined,
  direction: number,
): number {
  const aTime = dateTime(a);
  const bTime = dateTime(b);

  if (aTime === null && bTime === null) {
    return 0;
  }

  if (aTime === null) {
    return 1;
  }

  if (bTime === null) {
    return -1;
  }

  return (aTime - bTime) * direction;
}

function dateTime(value: string | Date | undefined): number | null {
  if (!value) {
    return null;
  }

  const time = value instanceof Date ? value.getTime() : Date.parse(value);
  return Number.isNaN(time) ? null : time;
}
