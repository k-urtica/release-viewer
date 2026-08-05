# Project Guidelines

## Project Overview

Release Viewer is a web tool for browsing GitHub repository release notes. It supports search by `owner/repo`, GitHub URL, or npm package name, and offers a dashboard-style layout with pinned repositories, recent history, and search history.

## Main Technology Stack

- **Nuxt 4**: App directory structure (`app/` based)
- **NuxtUI v4**: Tailwind CSS-based UI component library
- **@octokit/rest**: GitHub API client (server-side only)
- **Cloudflare Workers**: Hosting platform (nitro preset: `cloudflare-module`)
- **VueUse**: Vue utility library (including useInfiniteScroll)
- **TypeScript**
- **pnpm**: Package manager

## Directory Structure

```bash
app/
  assets/
  components/
  composables/
  pages/
  utils/
  app.config.ts
  app.vue
  error.vue
server/
  api/
  utils/
shared/
  types/
public/
nuxt.config.ts
```

> Components are resolved globally: reference them by PascalCase filename regardless of folder nesting (e.g., `components/release/ReleaseList.vue` → `<ReleaseList />`)

## Build

- `pnpm dev` — Start the development server
- `pnpm build` — Build for production
- `pnpm lint` — Run ESLint
- `pnpm lint:fix` — Run ESLint with autofix

## Architecture

- **Server-side GitHub API proxy**: All GitHub API calls go through `server/api/**` endpoints, which use `useOctokit()` (`server/utils/octokit.ts`) with the `NUXT_GH_TOKEN` runtime config. Never call the GitHub API directly from the client.
- **Edge caching**: API responses are cached via `withEdgeCache()` (`server/utils/cacheHandler.ts`) to reduce GitHub API calls and stay within rate limits.
- **Route rules**: `/repo/**` uses SWR; `/` is prerendered (`nuxt.config.ts`).
