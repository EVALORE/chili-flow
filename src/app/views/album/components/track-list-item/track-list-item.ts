import { Component, computed, input, output } from '@angular/core';
import { Track } from '@models/album';
import { DurationPipe } from '../../../../pipes/duration-pipe';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { PlayButton } from '@components/play-button/play-button';

@Component({
  selector: 'tr[app-track-list-item]',
  imports: [DurationPipe, HlmTableImports, PlayButton],
  templateUrl: './track-list-item.html',
  host: {
    display: 'table-row',
    hlmTableRow: 'true',
    class: 'w-full hover:bg-muted/50 transition-colors  group',
  },
})
export class TrackListItem {
  track = input.required<Track>();
  index = input.required<number>();

  playingTrackId = input<string | null>(null);

  isCurrentTrackPlaying = computed(() => this.playingTrackId() === this.track().id);

  playToggled = output<string>();

  togglePlay(event: Event): void {
    event.stopPropagation();
    this.playToggled.emit(this.track().id);
  }
}
