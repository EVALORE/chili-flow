import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumWithTracks } from '@models/album';
import { JamendoService } from '@services/jamendo-api';
import { AlbumHeader } from './components/album-header/album-header';
import { TrackList } from './components/track-list/track-list';

@Component({
  selector: 'app-album',
  imports: [AlbumHeader, TrackList],
  templateUrl: './album.html',
})
export class Album implements OnInit {
  private route = inject(ActivatedRoute);
  private jamendoService = inject(JamendoService);

  album = signal<AlbumWithTracks | null>(null);

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
