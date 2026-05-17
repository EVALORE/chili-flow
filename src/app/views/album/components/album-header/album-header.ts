import { Component, input } from '@angular/core';
import { AlbumWithTracks } from '@models/album';

@Component({
  selector: 'app-album-header',
  imports: [],
  templateUrl: './album-header.html',
})
export class AlbumHeader {
  album = input<AlbumWithTracks | null>(null);
  duration = input<number>(0);
}
