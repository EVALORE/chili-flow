import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JamendoService } from '@services/jamendo-api';
import { ArtistAlbumsResult, ArtistModel } from '@views/artist/artist.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArtistHeader } from '@views/artist/components/artist-header/artist-header';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-artist',
  imports: [ArtistHeader],
  templateUrl: './artist.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Artist implements OnInit {
  private route = inject(ActivatedRoute);
  private jamendoService = inject(JamendoService);
  private destroyRef = inject(DestroyRef);

  protected artist = signal<ArtistModel | null>(null);
  protected albums = signal<ArtistAlbumsResult | null>(null);
  protected loading = signal(true);
  protected artistError = signal<string | null>(null);
  protected albumsError = signal<string | null>(null);

  ngOnInit(): void {
    const artistId = this.route.snapshot.paramMap.get('id');

    if (!artistId) {
      this.loading.set(false);
      this.artistError.set('Artist id is invalid');
      return;
    }

    forkJoin({
      info: this.jamendoService.getFullArtistInfo(artistId),
      albums: this.jamendoService.getArtistAlbums(artistId),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ info, albums }) => {
        this.loading.set(false);

        // info is page-blocking
        if (info.status === 'failed') {
          this.artistError.set(info.message ?? 'Failed to load artist');
          return;
        }
        if (info.status === 'notFound') {
          this.artistError.set(info.message ?? 'Artist not found');
          return;
        }

        // info succeeded
        this.artist.set(info.data);

        // albums is section-level, never blocks the page
        switch (albums.status) {
          case 'success':
            this.albums.set(albums.data);
            break;
          case 'notFound':
            // artist has no albums — leave albums signal null, template shows empty state
            break;
          case 'failed':
            this.albumsError.set(albums.message ?? 'Failed to load albums');
            break;
        }
      });
  }
}
