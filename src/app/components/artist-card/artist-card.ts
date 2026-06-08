import { Component, input } from '@angular/core';
import { ArtistModel } from '@views/artist/artist.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-artist-card',
  imports: [RouterLink],
  templateUrl: './artist-card.html',
})
export class ArtistCard {
  artist = input<ArtistModel | null>(null);
  loading = input(false);
}
