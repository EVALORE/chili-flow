import { Component } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { PlaylistDialog } from '../playlist-dialog/playlist-dialog';

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
export class PlaylistCreateDialog {}
