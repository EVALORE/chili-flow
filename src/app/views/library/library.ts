import { Component, computed, inject } from '@angular/core';
import { Playlists } from './components/playlists/playlists';
import { PlaylistCreateDialog } from './components/playlist-create-dialog/playlist-create-dialog';
import { rxResource } from '@angular/core/rxjs-interop';
import { JamendoService } from '@services/jamendo-api';
import { PlaylistWithTracks } from '@models/playlist';

@Component({
  selector: 'app-library',
  imports: [Playlists, PlaylistCreateDialog],
  templateUrl: './library.html',
})
export class Library {
  private jamendoService = inject(JamendoService);

  playlistsResource = rxResource({
    stream: () => this.jamendoService.getPlaylists(),
  });

  playlists = computed<PlaylistWithTracks[]>(() => this.playlistsResource.value() || []);

  reloadPlaylists() {
    this.playlistsResource.reload();
  }
}
