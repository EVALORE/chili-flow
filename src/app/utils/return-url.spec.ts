import { convertToParamMap } from '@angular/router';

import { getReturnUrlState, getSafeReturnUrl } from './return-url';

describe('getSafeReturnUrl', () => {
  it('should allow internal absolute app paths', () => {
    expect(getSafeReturnUrl('/library')).toBe('/library');
    expect(getSafeReturnUrl('/album/1?track=2')).toBe('/album/1?track=2');
  });

  it('should reject external, protocol-relative, relative, and empty paths', () => {
    expect(getSafeReturnUrl('https://example.com')).toBeNull();
    expect(getSafeReturnUrl('//example.com')).toBeNull();
    expect(getSafeReturnUrl('library')).toBeNull();
    expect(getSafeReturnUrl(null)).toBeNull();
  });

  it('should reject blocked path prefixes', () => {
    expect(getSafeReturnUrl('/auth/login', ['/auth'])).toBeNull();
    expect(getSafeReturnUrl('/library', ['/auth'])).toBe('/library');
  });
});

describe('getReturnUrlState', () => {
  it('should build redirect state from a safe returnUrl query param', () => {
    expect(
      getReturnUrlState(convertToParamMap({ returnUrl: '/library' }), {
        fallbackUrl: '/discover',
      }),
    ).toEqual({
      value: '/library',
      queryParams: { returnUrl: '/library' },
      redirectUrl: '/library',
    });
  });

  it('should use the fallback redirect and omit query params when returnUrl is unsafe', () => {
    expect(
      getReturnUrlState(convertToParamMap({ returnUrl: 'https://example.com' }), {
        fallbackUrl: '/discover',
      }),
    ).toEqual({
      value: null,
      queryParams: null,
      redirectUrl: '/discover',
    });
  });

  it('should support custom query param names', () => {
    expect(
      getReturnUrlState(convertToParamMap({ next: '/library' }), {
        fallbackUrl: '/discover',
        paramName: 'next',
      }),
    ).toEqual({
      value: '/library',
      queryParams: { next: '/library' },
      redirectUrl: '/library',
    });
  });
});
