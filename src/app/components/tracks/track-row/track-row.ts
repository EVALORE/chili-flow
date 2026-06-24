import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMoreHorizontal } from '@ng-icons/lucide';
import { PlayButton } from '@components/play-button/play-button';
import { DurationPipe } from '@pipes/duration-pipe';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { TrackTableAction, TrackTableColumn, TrackTableRow } from '../tracks.types';
import { artistsText } from '../tracks.utils';

@Component({
  selector: 'tr[app-track-row]',
  templateUrl: './track-row.html',
  imports: [DatePipe, DurationPipe, HlmButtonImports, HlmIcon, HlmTableImports, NgIcon, PlayButton],
  providers: [provideIcons({ lucideMoreHorizontal })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    hlmTableRow: 'true',
    class: 'group text-muted-foreground',
    '[class.bg-primary/10]': 'isCurrentTrack()',
    '[class.text-primary]': 'isCurrentTrack()',
    '[attr.aria-current]': "isCurrentTrack() ? 'true' : null",
    '[attr.data-testid]': "'track-row-' + track().id",
  },
})
export class TrackRow {
  track = input.required<TrackTableRow>();
  index = input.required<number>();
  visibleColumns = input.required<TrackTableColumn[]>();
  currentTrackId = input<string | null>(null);

  playToggled = output<string>();
  actionSelected = output<TrackTableAction>();

  protected readonly isCurrentTrack = computed(() => this.currentTrackId() === this.track().id);

  protected isColumnVisible(column: TrackTableColumn): boolean {
    return this.visibleColumns().includes(column);
  }

  protected displayNumber(): number {
    return this.track().position ?? this.index() + 1;
  }

  protected artistsText(): string {
    return artistsText(this.track());
  }

  protected togglePlay(): void {
    this.playToggled.emit(this.track().id);
  }

  protected selectAction(): void {
    this.actionSelected.emit({ action: 'more', trackId: this.track().id });
  }
}
