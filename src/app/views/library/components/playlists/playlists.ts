import { Component, input, output, signal } from '@angular/core';
import { PlaylistItem } from '../playlist-item/playlist-item';
import { PlaylistWithTracks } from '@models/playlist';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideClock, lucideMusic } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { PlaylistEditDialog } from '../playlist-edit-dialog/playlist-edit-dialog';
import { PlaylistDeleteDialog } from '../playlist-delete-dialog/playlist-delete-dialog';

@Component({
  selector: 'app-playlists',
  imports: [PlaylistItem, PlaylistEditDialog, PlaylistDeleteDialog, NgIcon, HlmIcon],
  providers: [
    provideIcons({
      lucideClock,
      lucideMusic,
    }),
  ],
  templateUrl: './playlists.html',
})
export class Playlists {
  loading = input(false);
  error = input<string | null>(null);
  playlists = input<PlaylistWithTracks[]>([]);
  edited = output<void>();
  editingPlaylist = signal<PlaylistWithTracks | null>(null);
  deletingPlaylist = signal<PlaylistWithTracks | null>(null);

  editPlaylist(playlist: PlaylistWithTracks) {
    this.editingPlaylist.set(playlist);
  }

  cancelEditPlaylist() {
    this.editingPlaylist.set(null);
  }

  onPlaylistEdited() {
    this.edited.emit();
  }

  deletePlaylist(playlist: PlaylistWithTracks) {
    this.deletingPlaylist.set(playlist);
  }

  cancelDeletePlaylist() {
    this.deletingPlaylist.set(null);
  }

  onPlaylistDeleted() {
    this.edited.emit();
  }
}
