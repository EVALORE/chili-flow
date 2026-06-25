import { Component, computed, input, output } from '@angular/core';
import { PlaylistDialog } from '../playlist-dialog/playlist-dialog';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { PlaylistWithTracks } from '@models/playlist';

@Component({
  selector: 'app-playlist-edit-dialog',
  imports: [PlaylistDialog, HlmDialogImports],
  templateUrl: './playlist-edit-dialog.html',
})
export class PlaylistEditDialog {
  playlist = input<PlaylistWithTracks | null>(null);
  state = computed(() => (this.playlist() ? 'open' : 'closed'));
  closed = output<void>();
}
