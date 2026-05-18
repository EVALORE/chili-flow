import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackListItem } from './track-list-item';

describe('TrackListItem', () => {
  let component: TrackListItem;
  let fixture: ComponentFixture<TrackListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackListItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
