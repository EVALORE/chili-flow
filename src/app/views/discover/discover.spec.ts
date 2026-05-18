import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Discover } from './discover';

describe('Discover', () => {
  let component: Discover;
  let fixture: ComponentFixture<Discover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Discover],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Discover);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the discover page content', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Find your next favorite album');
    expect(compiled.textContent).toContain('More discovery features will live here');
  });

  it('should render the featured albums grid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const albumCards = compiled.querySelectorAll('app-album-card');

    expect(compiled.textContent).toContain('Featured albums');
    expect(compiled.textContent).toContain('Fresh covers');
    expect(compiled.textContent).toContain('Late Night Market');
    expect(albumCards.length).toBe(4);
  });
});
