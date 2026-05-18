import { Component, input } from '@angular/core';
import { AlbumWithTracks } from '@models/album';
import { DurationPipe } from '@pipes/duration-pipe';
import { TotalDurationPipe } from '@pipes/total-duration.pipe';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'app-album-header',
  imports: [DurationPipe, HlmCardImports, TotalDurationPipe],
  templateUrl: './album-header.html',
})
export class AlbumHeader {
  album = input<AlbumWithTracks | null>(null);
}
