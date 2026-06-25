import { Component, computed, DestroyRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlaylistWithTracks } from '@models/playlist';
import { JamendoService } from '@services/jamendo-api';
import { BrnDialogRef } from '@spartan-ng/brain/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';

@Component({
  selector: 'app-playlist-delete-dialog',
  imports: [HlmDialogImports, HlmButtonImports],
  templateUrl: './playlist-delete-dialog.html',
})
export class PlaylistDeleteDialog {
  private jamendoService = inject(JamendoService);
  private destroyRef = inject(DestroyRef);

  playlist = input<PlaylistWithTracks | null>(null);
  state = computed(() => (this.playlist() ? 'open' : 'closed'));
  closed = output<void>();
  deleted = output<void>();

  deletePlaylist(dialogRef: BrnDialogRef): void {
    const currentPlaylist = this.playlist();

    if (!currentPlaylist) {
      return;
    }

    this.jamendoService
      .deletePlaylist(currentPlaylist.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          dialogRef.close();
          this.deleted.emit();
        },
        error: (error) => {
          console.error('Failed to delete playlist', error);
        },
      });
  }
}
