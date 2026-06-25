import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { JamendoService } from '@services/jamendo-api';
import { Tracks, TrackTableRow } from '@components/tracks';
import { AlbumHeader } from './components/album-header/album-header';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-album',
  imports: [AlbumHeader, Tracks],
  templateUrl: './album.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Album {
  private jamendoService = inject(JamendoService);

  id = input.required<string>();

  albumResource = rxResource({
    params: () => ({ id: this.id() }),
    stream: ({ params }) => this.jamendoService.getAlbumWithTracks(params.id),
  });

  trackRows = computed<TrackTableRow[]>(() => {
    const album = this.albumResource.value();

    if (!album) {
      return [];
    }

    return album.tracks.map((track, index) => ({
      id: track.sourceId,
      title: track.title,
      durationSeconds: Number(track.duration) || 0,
      artists: [album.artist],
      album: album.title,
      coverUrl: album.coverUrl,
      position: Number(track.position) || index + 1,
    }));
  });
}
