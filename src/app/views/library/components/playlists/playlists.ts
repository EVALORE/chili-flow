import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { PlaylistItem } from '../playlist-item/playlist-item';
import { PlaylistWithTracks } from '@models/playlist';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideClock, lucideMusic } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { PlaylistEditDialog } from '../playlist-edit-dialog/playlist-edit-dialog';

@Component({
  selector: 'app-playlists',
  imports: [PlaylistItem, PlaylistEditDialog, NgIcon, HlmIcon],
  providers: [
    provideIcons({
      lucideClock,
      lucideMusic,
    }),
  ],
  templateUrl: './playlists.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Playlists {
  loading = input(false);
  error = input<string | null>(null);
  playlists = input<PlaylistWithTracks[]>([]);
  editingPlaylist = signal<PlaylistWithTracks | null>(null);

  editPlaylist(playlist: PlaylistWithTracks) {
    this.editingPlaylist.set(playlist);
  }

  cancelEditPlaylist() {
    this.editingPlaylist.set(null);
  }
}
