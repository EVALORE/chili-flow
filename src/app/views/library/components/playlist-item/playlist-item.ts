import { Component, input, output } from '@angular/core';
import { PlaylistWithTracks } from '@models/playlist';
import { DurationPipe } from '@pipes/duration-pipe';
import { TotalDurationPipe } from '@pipes/total-duration.pipe';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMusic, lucidePencil, lucideTrash2 } from '@ng-icons/lucide';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';

@Component({
  selector: 'tr[app-playlist-item]',
  imports: [DurationPipe, TotalDurationPipe, NgIcon, HlmIcon, HlmDialogImports],
  providers: [
    provideIcons({
      lucideMusic,
      lucidePencil,
      lucideTrash2,
    }),
  ],
  templateUrl: './playlist-item.html',
})
export class PlaylistItem {
  playlist = input.required<PlaylistWithTracks>();
  edit = output<PlaylistWithTracks>();

  editPlaylist($event: MouseEvent) {
    $event.stopPropagation();
    this.edit.emit(this.playlist());
  }
}
