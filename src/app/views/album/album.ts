import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumWithTracks } from '@models/album';
import { JamendoService } from '@services/jamendo-api';
import { AlbumHeader } from './components/album-header/album-header';

@Component({
  selector: 'app-album',
  imports: [AlbumHeader],
  templateUrl: './album.html',
})
export class Album implements OnInit {
  private route = inject(ActivatedRoute);
  private jamendoService = inject(JamendoService);

  album = signal<AlbumWithTracks | null>(null);

  totalDuration = computed(() => {
    const tracks = this.album()?.tracks ?? [];
    const totalSeconds = tracks.reduce((sum, track) => sum + Number(track.duration), 0);
    return totalSeconds;
  });

  ngOnInit() {
    const albumId = this.route.snapshot.paramMap.get('id');
    if (albumId) {
      this.jamendoService.getAlbumWithTracks(albumId).subscribe({
        next: (album) => {
          console.log('Album: ', album);
          if (album) {
            this.album.set(album);
          }
        },
        error: (err) => {
          console.error('API error: ', err);
        },
      });
    }
  }
}
