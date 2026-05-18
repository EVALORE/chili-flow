import { Pipe, PipeTransform } from '@angular/core';
import { Track } from '@models/album';

@Pipe({
  name: 'totalDuration',
})
export class TotalDurationPipe implements PipeTransform {
  transform(tracks: Track[] | undefined | null): number {
    if (!tracks || !Array.isArray(tracks)) {
      return 0;
    }
    return tracks.reduce((sum, track) => sum + Number(track.duration), 0);
  }
}
