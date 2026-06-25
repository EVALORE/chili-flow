import type { ParamMap } from '@angular/router';

const DEFAULT_RETURN_URL_PARAM = 'returnUrl';

export type ReturnUrlState = Readonly<{
  value: string | null;
  queryParams: Record<string, string> | null;
  redirectUrl: string;
}>;

export type ReturnUrlStateOptions = Readonly<{
  fallbackUrl: string;
  paramName?: string;
  blockedPathPrefixes?: readonly string[];
}>;

export const getSafeReturnUrl = (
  returnUrl: string | null,
  blockedPathPrefixes: readonly string[] = [],
): string | null => {
  if (!returnUrl || !returnUrl.startsWith('/') || returnUrl.startsWith('//')) {
    return null;
  }

  return blockedPathPrefixes.some((prefix) => returnUrl.startsWith(prefix)) ? null : returnUrl;
};

export const getReturnUrlState = (
  queryParamMap: Pick<ParamMap, 'get'>,
  {
    fallbackUrl,
    paramName = DEFAULT_RETURN_URL_PARAM,
    blockedPathPrefixes = [],
  }: ReturnUrlStateOptions,
): ReturnUrlState => {
  const value = getSafeReturnUrl(queryParamMap.get(paramName), blockedPathPrefixes);

  return {
    value,
    queryParams: value ? { [paramName]: value } : null,
    redirectUrl: value ?? fallbackUrl,
  };
};
