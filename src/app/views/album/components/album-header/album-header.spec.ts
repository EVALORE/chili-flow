import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumHeader } from './album-header';

describe('AlbumHeader', () => {
  let component: AlbumHeader;
  let fixture: ComponentFixture<AlbumHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
