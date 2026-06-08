import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { JamendoService } from '@services/jamendo-api';
import { of } from 'rxjs';

import { Artist } from './artist';

describe('Artist', () => {
  let component: Artist;
  let fixture: ComponentFixture<Artist>;
  let jamendoService: {
    getFullArtistInfo: ReturnType<typeof vi.fn>;
    getArtistAlbums: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    jamendoService = {
      getFullArtistInfo: vi.fn().mockReturnValue(
        of({
          status: 'success',
          data: {
            id: 'artist-1',
            name: 'Test Artist',
            joinDate: '2025-01-01',
            image: '',
          },
        }),
      ),
      getArtistAlbums: vi.fn().mockReturnValue(
        of({
          status: 'success',
          data: {
            totalCount: 0,
            albums: [],
          },
        }),
      ),
    };

    await TestBed.configureTestingModule({
      imports: [Artist],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: 'artist-1' }),
            },
          },
        },
        {
          provide: JamendoService,
          useValue: jamendoService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Artist);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
