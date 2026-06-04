import { Component, input } from '@angular/core';
import { PlaylistWithTracks } from '@models/playlist';
import { DurationPipe } from '@pipes/duration-pipe';
import { TotalDurationPipe } from '@pipes/total-duration.pipe';
import { HlmIcon } from '../../../../../../libs/ui/icon/src/lib/hlm-icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMusic } from '@ng-icons/lucide';

@Component({
  selector: 'tr[app-playlist-item]',
  imports: [DurationPipe, TotalDurationPipe, NgIcon, HlmIcon],
  providers: [
    provideIcons({
      lucideMusic,
    }),
  ],
  templateUrl: './playlist-item.html',
})
export class PlaylistItem {
  playlist = input.required<PlaylistWithTracks>();
}
