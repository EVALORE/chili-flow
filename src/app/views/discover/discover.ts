import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { AlbumCard, AlbumCardData } from '@components/album-card';
import { Tracks, TrackTableRow } from '@components/tracks';
import { ArtistModel } from '@views/artist/artist.model';
import { ArtistCard } from '@components/artist-card';
import { JamendoService } from '@services/jamendo-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-discover',
  imports: [AlbumCard, HlmCardImports, Tracks, ArtistCard],
  templateUrl: './discover.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Discover implements OnInit {
  private destroyRef = inject(DestroyRef);
  private jamendoService = inject(JamendoService);

  protected popularArtists = signal<ArtistModel[] | null>(null);
  protected loading = signal(true);
  protected error = signal<string | null>(null);

  ngOnInit(): void {
    this.jamendoService
      .getMostPopularArtists('popularity_month', '12')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (artistsResult) => {
          switch (artistsResult.status) {
            case 'success':
              this.loading.set(false);
              this.popularArtists.set(artistsResult.data ?? null);
              break;
            case 'failed':
              this.loading.set(false);
              this.error.set(artistsResult.message);
              break;
          }
        },
      });
  }

  protected readonly featuredAlbums: AlbumCardData[] = [
    {
      id: '103026',
      title: 'Late Night Market',
      artist: 'Mira Sol',
      coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=320&h=320&fit=crop',
    },
    {
      id: '103027',
      title: 'Frequency Bloom',
      artist: 'North Arcade',
      coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=320&h=320&fit=crop',
    },
    {
      id: '103028',
      title: 'Open Roads',
      artist: 'The Copper Hours',
      coverUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=320&h=320&fit=crop',
    },
    {
      id: '103029',
      title: 'Rooms in Motion with a Title Long Enough to Truncate',
      artist: 'Iris Mode and the Extended Night Ensemble',
    },
  ];

  protected readonly featuredTracks: TrackTableRow[] = [
    {
      id: 'discover-1',
      title: 'Neon Pepper',
      artists: ['Mira Sol'],
      album: 'Late Night Market',
      durationSeconds: 214,
      coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=160&h=160&fit=crop',
      explicit: false,
      position: 1,
    },
    {
      id: 'discover-2',
      title: 'Signal Heat',
      artists: ['North Arcade', 'Lena Vale'],
      album: 'Frequency Bloom',
      durationSeconds: 187,
      coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=160&h=160&fit=crop',
      explicit: true,
      position: 2,
    },
    {
      id: 'discover-3',
      title: 'Glass Horizon',
      artists: ['The Copper Hours'],
      album: 'Open Roads',
      durationSeconds: 241,
      coverUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=160&h=160&fit=crop',
      explicit: false,
      position: 3,
    },
    {
      id: 'discover-4',
      title: 'Soft Static',
      artists: ['Iris Mode'],
      album: 'Rooms in Motion',
      durationSeconds: 169,
      explicit: false,
      position: 4,
    },
  ];
}
