import { Component, DestroyRef, inject } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { PlaylistDialog, PlaylistDialogSubmitEvent } from '../playlist-dialog/playlist-dialog';
import { JamendoService } from '@services/jamendo-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-playlist-create-dialog',
  imports: [PlaylistDialog, HlmButtonImports, HlmDialogImports, NgIcon, HlmIcon],
  providers: [
    provideIcons({
      lucidePlus,
    }),
  ],
  templateUrl: './playlist-create-dialog.html',
})
export class PlaylistCreateDialog {
  private jamendoService = inject(JamendoService);
  private destroyRef = inject(DestroyRef);

  createPlaylist(event: PlaylistDialogSubmitEvent): void {
    this.jamendoService
      .createPlaylist(event.data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          event.dialogRef.close();
        },
        error: (error) => {
          console.error('Failed to create playlist', error);
        },
      });
  }
}
