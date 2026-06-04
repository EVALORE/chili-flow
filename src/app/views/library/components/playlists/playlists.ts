import { Component, input } from '@angular/core';
import { PlaylistItem } from '../playlist-item/playlist-item';
import { PlaylistWithTracks } from '@models/playlist';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideClock } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-playlists',
  imports: [PlaylistItem, NgIcon, HlmIcon],
  providers: [
    provideIcons({
      lucideClock,
    }),
  ],
  templateUrl: './playlists.html',
})
export class Playlists {
  loading = input(false);
  error = input<string | null>(null);
  playlists = input<PlaylistWithTracks[]>([]);
}
