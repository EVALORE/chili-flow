import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tracks, TrackTableRow } from './tracks';

const tracks: TrackTableRow[] = [
  {
    id: 'alpha',
    title: 'Alpha',
    artists: ['Mira Sol'],
    album: 'Zulu',
    durationSeconds: 240,
    dateAdded: '2025-02-01',
    explicit: true,
    position: 1,
  },
  {
    id: 'bravo',
    title: 'Bravo',
    artists: ['North Arcade'],
    album: 'Echo',
    durationSeconds: 120,
    dateAdded: '2025-01-01',
    position: 2,
  },
  {
    id: 'charlie',
    title: 'Charlie',
    artists: ['Iris Mode'],
    album: 'Delta',
    durationSeconds: 180,
    position: 3,
  },
];

describe('Tracks', () => {
  let fixture: ComponentFixture<Tracks>;
  let component: Tracks;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tracks],
    }).compileComponents();

    fixture = TestBed.createComponent(Tracks);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tracks', tracks);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders preset-specific headers', () => {
    fixture.componentRef.setInput('preset', 'album');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Title');
    expect(compiled.textContent).not.toContain('Album');
    expect(compiled.textContent).not.toContain('Date added');
    expect(compiled.querySelector('ng-icon[name="lucideClock"]')).toBeTruthy();
  });

  it('filters by title, artist, and album', () => {
    const input = fixture.nativeElement.querySelector('#tracks-filter') as HTMLInputElement;

    input.value = 'north';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(trackTitles()).toEqual(['Bravo']);

    input.value = 'delta';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(trackTitles()).toEqual(['Charlie']);

    input.value = 'alpha';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(trackTitles()).toEqual(['Alpha']);
  });

  it('sorts title, date, and duration values', () => {
    clickSortButton('Sort by title ascending');
    expect(trackTitles()).toEqual(['Alpha', 'Bravo', 'Charlie']);

    clickSortButton('Sort by date added ascending');
    expect(trackTitles()).toEqual(['Bravo', 'Alpha', 'Charlie']);

    clickSortButton('Sort by duration ascending');
    expect(trackTitles()).toEqual(['Bravo', 'Charlie', 'Alpha']);
  });

  it('shows loading, empty, and error states', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(text()).toContain('Loading tracks...');

    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('tracks', []);
    fixture.componentRef.setInput('emptyMessage', 'Nothing here.');
    fixture.detectChanges();
    expect(text()).toContain('Nothing here.');

    fixture.componentRef.setInput('error', 'Unable to load tracks.');
    fixture.detectChanges();
    expect(text()).toContain('Unable to load tracks.');
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeTruthy();
  });

  it('emits play events and highlights the current track', () => {
    const playSpy = vi.fn();
    const subscription = component.playToggled.subscribe(playSpy);
    fixture.componentRef.setInput('currentTrackId', 'alpha');
    fixture.detectChanges();

    const currentRow = fixture.nativeElement.querySelector(
      '[data-testid="track-row-alpha"]',
    ) as HTMLElement;
    const playButton = currentRow.querySelector(
      'button[aria-label="Pause Alpha"]',
    ) as HTMLButtonElement;

    playButton.click();
    fixture.detectChanges();

    expect(currentRow.classList.contains('bg-brand-secondary/10')).toBe(true);
    expect(currentRow.getAttribute('aria-current')).toBe('true');
    expect(playSpy).toHaveBeenCalledWith('alpha');
    subscription.unsubscribe();
  });

  function clickSortButton(label: string): void {
    const button = fixture.nativeElement.querySelector(
      `button[aria-label="${label}"]`,
    ) as HTMLButtonElement;
    button.click();
    fixture.detectChanges();
  }

  function trackTitles(): string[] {
    return Array.from(fixture.nativeElement.querySelectorAll('[data-testid="track-title"]')).map(
      (element) => (element as HTMLElement).textContent?.trim() ?? '',
    );
  }

  function text(): string {
    return (fixture.nativeElement as HTMLElement).textContent ?? '';
  }
});
