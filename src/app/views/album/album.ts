import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class Album implements OnInit {
  private route = inject(ActivatedRoute);
  private jamendoService = inject(JamendoService);

  album = signal<AlbumWithTracks | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

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

  ngOnInit() {
    const albumId = this.route.snapshot.paramMap.get('id');

    if (!albumId) {
      this.loading.set(false);
      this.error.set('Album not found.');
      return;
    }

    this.jamendoService.getAlbumWithTracks(albumId).subscribe({
      next: (album) => {
        this.album.set(album);
        this.loading.set(false);

        if (!album) {
          this.error.set('Album not found.');
        }
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Unable to load album tracks.');
      },
    });
  }
}
