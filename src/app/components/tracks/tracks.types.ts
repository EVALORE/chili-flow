export interface TrackTableRow {
  id: string;
  title: string;
  durationSeconds: number;
  artists?: string[];
  album?: string;
  coverUrl?: string;
  dateAdded?: string | Date;
  explicit?: boolean;
  position?: number;
}

export type TrackTableColumn = 'number' | 'title' | 'album' | 'date' | 'duration' | 'actions';

export type TrackTablePreset =
  | 'album'
  | 'artistSearch'
  | 'playlist'
  | 'recentlyPlayed'
  | 'uploaded';

export type TrackTableSortColumn = Extract<
  TrackTableColumn,
  'title' | 'album' | 'date' | 'duration'
>;

export type TrackTableSortDirection = 'asc' | 'desc';

export interface TrackTableSort {
  column: TrackTableSortColumn;
  direction: TrackTableSortDirection;
}

export interface TrackTableAction {
  action: string;
  trackId: string;
}
