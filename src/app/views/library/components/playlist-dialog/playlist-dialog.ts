import { Component, effect, input, signal } from '@angular/core';
import { form, FormField, required, schema } from '@angular/forms/signals';
import { provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { BrnDialogRef } from '@spartan-ng/brain/dialog';
import { PlaylistWithTracks } from '@models/playlist';

interface CreatePlaylistModel {
  name: string;
  description: string;
}

const CreatePlaylistSchema = schema<CreatePlaylistModel>((rootPath) => {
  required(rootPath.name, { message: 'Name is required' });
});

@Component({
  selector: 'app-playlist-dialog',
  imports: [FormField, HlmButtonImports, HlmDialogImports, HlmInputImports, HlmLabelImports],
  providers: [
    provideIcons({
      lucidePlus,
    }),
  ],
  templateUrl: './playlist-dialog.html',
})
export class PlaylistDialog {
  mode = input<'create' | 'edit'>('create');
  playlist = input<PlaylistWithTracks | null>(null);

  protected CreatePlaylistModel = signal<CreatePlaylistModel>({
    name: '',
    description: '',
  });
  protected CreatePlaylistForm = form(this.CreatePlaylistModel, CreatePlaylistSchema);

  constructor() {
    effect(() => {
      const playlist = this.playlist();
      if (playlist) {
        this.CreatePlaylistModel.set({
          name: playlist.name,
          description: '',
        });
      }
    });
  }

  handleDialogClose() {
    this.CreatePlaylistModel.set({
      name: '',
      description: '',
    });
  }

  submitForm(ctx: BrnDialogRef) {
    ctx.close();
    this.CreatePlaylistModel.set({
      name: '',
      description: '',
    });
  }
}
