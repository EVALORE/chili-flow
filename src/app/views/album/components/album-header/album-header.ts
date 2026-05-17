import { Component, input } from '@angular/core';
import { AlbumWithTracks } from '@models/album';
import { DurationPipe } from '@pipes/duration-pipe';

@Component({
  selector: 'app-album-header',
  imports: [DurationPipe],
  templateUrl: './album-header.html',
})
export class AlbumHeader {
  album = input<AlbumWithTracks | null>(null);
  duration = input<number>(0);
}
