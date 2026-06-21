import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { AlbumWithTracks } from '@models/album';
import { JamendoService } from '@services/jamendo-api';
import { of } from 'rxjs';

import { Album } from './album';

const album: AlbumWithTracks = {
  artist: 'Test Artist',
  artistId: 'artist-1',
  coverUrl: 'cover.png',
  releaseDate: '2025-01-01',
  shareUrl: null,
  source: '',
  sourceId: 'album-1',
  title: 'Test Album',
  trackCount: 0,
  zipAllowed: false,
  zipUrl: '',
  tracks: [
    {
      album: '',
      albumId: '',
      artist: '',
      artistId: '',
      audiodownloadAllowed: false,
      audioUrl: '',
      coverUrl: '',
      downloadUrl: '',
      duration: 120,
      licenseUrl: '',
      position: 1,
      shareUrl: null,
      source: '',
      sourceId: 'track-1',
      title: 'First Track',
    },
  ],
};

describe('Album', () => {
  let component: Album;
  let fixture: ComponentFixture<Album>;
  let jamendoService: { getAlbumWithTracks: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    jamendoService = {
      getAlbumWithTracks: vi.fn().mockReturnValue(of(album)),
    };

    await TestBed.configureTestingModule({
      imports: [Album],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: 'album-1' }),
            },
          },
        },
        {
          provide: JamendoService,
          useValue: jamendoService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Album);
    fixture.componentRef.setInput('id', 'album-1');
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should map album tracks into the shared tracks table', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(jamendoService.getAlbumWithTracks).toHaveBeenCalledWith('album-1');
    expect(compiled.textContent).toContain('First Track');
    expect(compiled.textContent).toContain('Test Artist');
    expect(compiled.textContent).not.toContain('Date added');
  });
});
