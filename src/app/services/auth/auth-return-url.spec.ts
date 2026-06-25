import { getSafeAuthReturnUrl } from './auth-return-url';

describe('getSafeAuthReturnUrl', () => {
  it('should allow internal absolute app paths', () => {
    expect(getSafeAuthReturnUrl('/library')).toBe('/library');
    expect(getSafeAuthReturnUrl('/album/1?track=2')).toBe('/album/1?track=2');
  });

  it('should reject external, protocol-relative, relative, and auth paths', () => {
    expect(getSafeAuthReturnUrl('https://example.com')).toBeNull();
    expect(getSafeAuthReturnUrl('//example.com')).toBeNull();
    expect(getSafeAuthReturnUrl('library')).toBeNull();
    expect(getSafeAuthReturnUrl('/auth/login')).toBeNull();
    expect(getSafeAuthReturnUrl(null)).toBeNull();
  });
});
