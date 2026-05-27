import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistHeader } from './artist-header';

describe('ArtistHeader', () => {
  let component: ArtistHeader;
  let fixture: ComponentFixture<ArtistHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
