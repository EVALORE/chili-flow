import { Component, computed, DestroyRef, inject, input, output } from '@angular/core';
import { PlaylistDialog, PlaylistDialogSubmitEvent } from '../playlist-dialog/playlist-dialog';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { PlaylistWithTracks } from '@models/playlist';
import { JamendoService } from '@services/jamendo-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-playlist-edit-dialog',
  imports: [PlaylistDialog, HlmDialogImports],
  templateUrl: './playlist-edit-dialog.html',
})
export class PlaylistEditDialog {
  private jamendoService = inject(JamendoService);
  private destroyRef = inject(DestroyRef);

  playlist = input<PlaylistWithTracks | null>(null);
  state = computed(() => (this.playlist() ? 'open' : 'closed'));
  closed = output<void>();

  updatePlaylist(event: PlaylistDialogSubmitEvent): void {
    const currentPlaylist = this.playlist();

    if (!currentPlaylist) {
      return;
    }

    this.jamendoService
      .updatePlaylist(currentPlaylist.id, event.data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          event.dialogRef.close();
        },
        error: (error) => {
          console.error('Failed to update playlist', error);
        },
      });
  }
}
