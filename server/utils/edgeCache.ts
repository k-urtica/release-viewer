import type { H3Event } from 'h3';

export const cacheApi: Cache | undefined =
  typeof caches !== 'undefined' && 'default' in caches
    ? (caches.default as Cache)
    : undefined;

export function createCacheKey(event: H3Event): Request {
  const reqUrl = getRequestURL(event);
  return new Request(reqUrl.toString(), event);
}
