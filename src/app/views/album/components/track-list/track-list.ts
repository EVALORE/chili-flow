import { Component, input, signal } from '@angular/core';
import { Track } from '@models/album';
import { TrackListItem } from '../track-list-item/track-list-item';
import { HlmTableImports } from '@spartan-ng/helm/table';

@Component({
  selector: 'app-track-list',
  imports: [TrackListItem, HlmTableImports],
  templateUrl: './track-list.html',
  host: {
    class: 'w-full',
  },
})
export class TrackList {
  tracks = input<Track[]>([]);

  playingTrackId = signal<string | null>(null);

  onPlayToggled(trackId: string): void {
    this.playingTrackId.update((current) => (current === trackId ? null : trackId));
  }
}
