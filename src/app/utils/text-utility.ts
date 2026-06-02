export function removeHtml(html: string): string {
  return new DOMParser().parseFromString(html, 'text/html').body.textContent ?? '';
}