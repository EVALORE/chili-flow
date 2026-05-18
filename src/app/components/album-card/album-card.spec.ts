import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AlbumCard, AlbumCardData } from './album-card';

const album: AlbumCardData = {
  id: 'album-1',
  title: 'Late Night Market',
  artist: 'Mira Sol',
  coverUrl: 'https://example.com/cover.jpg',
};

describe('AlbumCard', () => {
  let component: AlbumCard;
  let fixture: ComponentFixture<AlbumCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('album', album);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders album details, cover image, and album route link', () => {
    const card = fixture.nativeElement.querySelector('[data-testid="album-card-album-1"]') as HTMLAnchorElement;
    const image = fixture.nativeElement.querySelector('img') as HTMLImageElement;

    expect(card).toBeTruthy();
    expect(card.getAttribute('href')).toBe('/album/album-1');
    expect(card.getAttribute('aria-label')).toBe('Open album Late Night Market by Mira Sol');
    expect(text()).toContain('Late Night Market');
    expect(text()).toContain('Mira Sol');
    expect(image.getAttribute('src')).toBe(album.coverUrl);
    expect(image.getAttribute('alt')).toBe('Late Night Market album cover');
  });

  it('renders a fallback cover when the album cover is missing', () => {
    fixture.componentRef.setInput('album', {
      id: 'album-2',
      title: 'Open Roads',
      artist: 'The Copper Hours',
    } satisfies AlbumCardData);
    fixture.detectChanges();

    const fallback = fixture.nativeElement.querySelector('[data-testid="album-card-fallback"]') as HTMLElement;

    expect(fallback).toBeTruthy();
    expect(fallback.textContent?.trim()).toBe('O');
    expect(fallback.getAttribute('aria-hidden')).toBe('true');
    expect(fixture.nativeElement.querySelector('img')).toBeFalsy();
  });

  it('shows a skeleton card while loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const skeleton = fixture.nativeElement.querySelector('[data-testid="album-card-loading"]') as HTMLElement;

    expect(skeleton).toBeTruthy();
    expect(skeleton.getAttribute('aria-busy')).toBe('true');
    expect(text()).not.toContain('Late Night Market');
    expect(fixture.nativeElement.querySelector('a')).toBeFalsy();
  });

  it('keeps long album and artist text in truncation containers', () => {
    fixture.componentRef.setInput('album', {
      id: 'album-3',
      title: 'Rooms in Motion with a Title Long Enough to Truncate',
      artist: 'Iris Mode and the Extended Night Ensemble',
    } satisfies AlbumCardData);
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('[data-testid="album-card-title"]') as HTMLElement;
    const artist = fixture.nativeElement.querySelector('[data-testid="album-card-artist"]') as HTMLElement;

    expect(title.classList.contains('overflow-hidden')).toBe(true);
    expect(title.classList.contains('whitespace-nowrap')).toBe(true);
    expect(title.classList.contains('text-ellipsis')).toBe(true);
    expect(artist.classList.contains('overflow-hidden')).toBe(true);
    expect(artist.classList.contains('whitespace-nowrap')).toBe(true);
    expect(artist.classList.contains('text-ellipsis')).toBe(true);
    expect(title.textContent?.trim()).toBe('Rooms in Motion with a Title Long Enough to Truncate');
    expect(artist.textContent?.trim()).toBe('Iris Mode and the Extended Night Ensemble');
  });

  function text(): string {
    return (fixture.nativeElement as HTMLElement).textContent ?? '';
  }
});
