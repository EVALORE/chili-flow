export const getSafeAuthReturnUrl = (returnUrl: string | null): string | null => {
  if (!returnUrl || !returnUrl.startsWith('/') || returnUrl.startsWith('//')) {
    return null;
  }

  return returnUrl.startsWith('/auth') ? null : returnUrl;
};
