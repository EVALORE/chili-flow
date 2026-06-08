import { Component, input } from '@angular/core';
import { ArtistModel } from '@views/artist/artist.model';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'app-artist-header',
  imports: [HlmCardImports],
  templateUrl: './artist-header.html',
})
export class ArtistHeader {
  artist = input<ArtistModel | null>(null);
  albumsAmount = input(0);
}
