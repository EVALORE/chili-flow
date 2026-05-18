import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NotFound } from './not-found';

describe('NotFound', () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a clear fallback message and discover action', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const action = compiled.querySelector('a');

    expect(compiled.textContent).toContain('Page not found');
    expect(compiled.textContent).toContain('The page you are looking for does not exist.');
    expect(action?.textContent).toContain('Return to Discover');
    expect(action?.getAttribute('href')).toBe('/discover');
  });
});
