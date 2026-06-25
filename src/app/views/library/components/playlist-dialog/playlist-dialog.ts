import { Component, input, linkedSignal, output } from '@angular/core';
import { form, FormField, required, schema } from '@angular/forms/signals';
import { provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { BrnDialogRef } from '@spartan-ng/brain/dialog';
import { PlaylistWithTracks } from '@models/playlist';

export interface PlaylistFormData {
  name: string;
  description: string;
}

export interface PlaylistDialogSubmitEvent {
  data: PlaylistFormData;
  dialogRef: BrnDialogRef;
}

const PlaylistSchema = schema<PlaylistFormData>((rootPath) => {
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
  submitted = output<PlaylistDialogSubmitEvent>();

  protected formState = linkedSignal<PlaylistFormData>(() => {
    const currentPlaylist = this.playlist();
    if (this.mode() === 'edit' && currentPlaylist) {
      return {
        name: currentPlaylist.name,
        description: currentPlaylist.description || '',
      };
    }
    return {
      name: '',
      description: '',
    };
  });

  protected PlaylistForm = form(this.formState, PlaylistSchema);

  submitForm(dialogRef: BrnDialogRef, event: Event): void {
    event.preventDefault();

    if (this.PlaylistForm().invalid()) {
      return;
    }

    this.submitted.emit({
      data: { ...this.formState() },
      dialogRef,
    });

    this.formState.set({ name: '', description: '' });
  }
}
