import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Track } from '@models/album';

import { TrackListItem } from './track-list-item';

const track: Track = {
  count: '1',
  id: 'track-1',
  position: '1',
  name: 'Test track',
  duration: '120',
  license_ccurl: '',
  audio: '',
  audiodownload: '',
  audiodownload_allowed: false,
};

describe('TrackListItem', () => {
  let component: TrackListItem;
  let fixture: ComponentFixture<TrackListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackListItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('track', track);
    fixture.componentRef.setInput('index', 0);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
