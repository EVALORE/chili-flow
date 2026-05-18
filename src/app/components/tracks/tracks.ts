import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChevronDown,
  lucideChevronUp,
  lucideChevronsUpDown,
  lucideClock,
} from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { TrackFilter } from './track-filter/track-filter';
import { TrackRow } from './track-row/track-row';
import { PRESET_COLUMNS } from './tracks.constants';
import {
  TrackTableAction,
  TrackTableColumn,
  TrackTableRow,
  TrackTablePreset,
  TrackTableSort,
  TrackTableSortColumn,
} from './tracks.types';
import { filterTracks, sortTracks } from './tracks.utils';

export type {
  TrackTableAction,
  TrackTableColumn,
  TrackTablePreset,
  TrackTableRow,
  TrackTableSort,
  TrackTableSortColumn,
  TrackTableSortDirection,
} from './tracks.types';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.html',
  imports: [HlmIcon, HlmTableImports, NgIcon, TrackFilter, TrackRow],
  providers: [
    provideIcons({
      lucideChevronDown,
      lucideChevronUp,
      lucideChevronsUpDown,
      lucideClock,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block w-full',
  },
})
export class Tracks {
  tracks = input<TrackTableRow[]>([]);
  preset = input<TrackTablePreset>('playlist');
  loading = input(false);
  error = input<string | null>(null);
  emptyMessage = input('No tracks found.');
  currentTrackId = input<string | null>(null);

  playToggled = output<string>();
  actionSelected = output<TrackTableAction>();

  protected readonly filterQuery = signal('');
  protected readonly activeSort = signal<TrackTableSort | null>(null);

  protected readonly visibleColumns = computed(() => PRESET_COLUMNS[this.preset()]);

  protected readonly rows = computed(() => {
    const filteredRows = filterTracks(this.tracks(), this.filterQuery());
    return sortTracks(filteredRows, this.activeSort());
  });

  protected setFilter(query: string): void {
    this.filterQuery.set(query);
  }

  protected clearFilter(): void {
    this.filterQuery.set('');
  }

  protected toggleSort(column: TrackTableSortColumn): void {
    this.activeSort.update((sort) => {
      if (!sort || sort.column !== column) {
        return { column, direction: 'asc' };
      }

      if (sort.direction === 'asc') {
        return { column, direction: 'desc' };
      }

      return null;
    });
  }

  protected isColumnVisible(column: TrackTableColumn): boolean {
    return this.visibleColumns().includes(column);
  }

  protected sortIcon(column: TrackTableSortColumn): string {
    const sort = this.activeSort();

    if (sort?.column !== column) {
      return 'lucideChevronsUpDown';
    }

    return sort.direction === 'asc' ? 'lucideChevronUp' : 'lucideChevronDown';
  }

  protected sortAria(column: TrackTableSortColumn): 'ascending' | 'descending' | 'none' {
    const sort = this.activeSort();

    if (sort?.column !== column) {
      return 'none';
    }

    return sort.direction === 'asc' ? 'ascending' : 'descending';
  }

  protected sortLabel(column: TrackTableSortColumn, label: string): string {
    const sort = this.activeSort();

    if (sort?.column !== column) {
      return `Sort by ${label} ascending`;
    }

    return sort.direction === 'asc' ? `Sort by ${label} descending` : `Clear ${label} sorting`;
  }

  protected togglePlay(trackId: string): void {
    this.playToggled.emit(trackId);
  }

  protected selectAction(action: TrackTableAction): void {
    this.actionSelected.emit(action);
  }
}
