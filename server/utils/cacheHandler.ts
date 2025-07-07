import type { H3Event } from 'h3';
import { cacheApi, createCacheKey } from './edgeCache';

/**
 * Options for the Edge Cache handler.
 */
export interface EdgeCacheOptions {
  /**
   * max-age for the cache in seconds.
   *
   * @default 300
   */
  maxAge?: number;
  /**
   * s-maxage for shared caches in seconds.
   *
   * @default 3600
   */
  sMaxAge?: number;
  /**
   * Additional headers to set on the cached response.
   */
  headers?: Record<string, string>;
}

/**
 * A higher-order function that handles caching for Cloudflare Workers.
 *
 * It checks the cache first, and if a cached response is found,
 * it returns that. If not, it calls the handler function, caches the response,
 * and returns the data.
 */
export async function withEdgeCache<T>(
  event: H3Event,
  handler: (event: H3Event) => Promise<T>,
  options: EdgeCacheOptions = {}
): Promise<T | Response> {
  if (!cacheApi) {
    return await handler(event);
  }

  const {
    maxAge = 300,
    sMaxAge = 3600,
    headers = { 'Content-Type': 'application/json' }
  } = options;
  const cacheKey = createCacheKey(event);

  const cached = await cacheApi.match(cacheKey);
  if (cached) {
    return cached;
  }

  const result = await handler(event);
  const response = new Response(JSON.stringify(result));
  response.headers.set('Cache-Control', `public, max-age=${maxAge}, s-maxage=${sMaxAge}`);
  for (const [key, value] of Object.entries(headers)) {
    response.headers.set(key, value);
  }

  event.waitUntil(cacheApi.put(cacheKey, response.clone()));

  return { ...result, cacheHit: false };
}
