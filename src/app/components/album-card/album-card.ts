import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface AlbumCardData {
  id: string;
  title: string;
  artist: string;
  coverUrl?: string;
}

@Component({
  selector: 'app-album-card',
  imports: [RouterLink],
  templateUrl: './album-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block min-w-0 [container-type:inline-size]',
  },
})
export class AlbumCard {
  album = input<AlbumCardData | null>(null);
  loading = input(false);

  protected readonly albumInitial = computed(() => {
    const title = this.album()?.title.trim();

    return title ? title.charAt(0).toUpperCase() : 'A';
  });
}
