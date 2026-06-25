import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tracks } from './tracks';

describe('Tracks', () => {
  let fixture: ComponentFixture<Tracks>;
  let component: Tracks;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tracks],
    }).compileComponents();

    fixture = TestBed.createComponent(Tracks);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
