import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { AlbumWithTracks } from '@models/album';
import { JamendoService } from '@services/jamendo-api';
import { of } from 'rxjs';

import { Album } from './album';

const album: AlbumWithTracks = {
  id: 'album-1',
  name: 'Test Album',
  releasedate: '2025-01-01',
  artist_id: 'artist-1',
  artist_name: 'Test Artist',
  track_id: 'track-1',
  image: 'cover.png',
  zip: '',
  zip_allowed: false,
  tracks: [
    {
      count: '1',
      id: 'track-1',
      position: '1',
      name: 'First Track',
      duration: '120',
      license_ccurl: '',
      audio: '',
      audiodownload: '',
      audiodownload_allowed: false,
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
