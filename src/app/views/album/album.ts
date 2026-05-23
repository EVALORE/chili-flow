import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { AlbumWithTracks } from '@models/album';
import { JamendoService } from '@services/jamendo-api';
import { Tracks, TrackTableRow } from '@components/tracks';
import { AlbumHeader } from './components/album-header/album-header';

@Component({
  selector: 'app-album',
  imports: [AlbumHeader, Tracks],
  templateUrl: './album.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Album {
  private jamendoService = inject(JamendoService);

  id = input.required<string>();

  album = signal<AlbumWithTracks | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const albumId = this.id();

      this.loading.set(true);
      this.error.set(null);

      this.jamendoService.getAlbumWithTracks(albumId).subscribe({
        next: (album) => {
          this.album.set(album);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.error.set('Unable to load album.');
        },
      });
    });
  }

  trackRows = computed<TrackTableRow[]>(() => {
    const album = this.album();

    if (!album) {
      return [];
    }

    return album.tracks.map((track, index) => ({
      id: track.id,
      title: track.name,
      durationSeconds: Number(track.duration) || 0,
      artists: [album.artist_name],
      album: album.name,
      coverUrl: album.image,
      position: Number(track.position || track.count) || index + 1,
    }));
  });
}
