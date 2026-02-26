import type { RestEndpointMethodTypes } from '@octokit/rest';

const DEFAULT_PER_PAGE = 30;
const MIN_PER_PAGE = 1;
const MAX_PER_PAGE = 100;

type OctokitRelease = RestEndpointMethodTypes['repos']['listReleases']['response']['data'][0];

/**
 * Parse GitHub API Link header for pagination info
 */
export function parseLinkHeader(linkHeader: string | undefined): { hasNext: boolean; hasPrev: boolean } {
  if (!linkHeader) {
    return { hasNext: false, hasPrev: false };
  }

  const hasNext = linkHeader.includes('rel="next"');
  const hasPrev = linkHeader.includes('rel="prev"');

  return { hasNext, hasPrev };
}

/**
 * Validate and normalize pagination parameters
 */
export function validatePaginationParams(query: Record<string, unknown>): { page: number; perPage: number } {
  const page = Math.max(1, Number(query.page) || 1);
  const perPage = Math.min(MAX_PER_PAGE, Math.max(MIN_PER_PAGE, Number(query.per_page) || DEFAULT_PER_PAGE));

  return { page, perPage };
}

/**
 * Transform Octokit release data to GitHubRelease format
 */
export function transformOctokitRelease(octokitRelease: OctokitRelease): GitHubRelease {
  const markdown = octokitRelease.body ?? '';

  return {
    id: octokitRelease.id,
    tag: octokitRelease.tag_name,
    author: octokitRelease.author?.login ?? 'Unknown',
    authorAvatarUrl: octokitRelease.author?.avatar_url ?? '',
    name: octokitRelease.name ?? octokitRelease.tag_name,
    draft: octokitRelease.draft,
    prerelease: octokitRelease.prerelease,
    createdAt: octokitRelease.created_at,
    publishedAt: octokitRelease.published_at,
    html: convertMarkdownToHtml(markdown),
  };
}

/**
 * Fetch a single GitHub release by tag name
 */
export async function fetchGitHubReleaseByTag(
  owner: string,
  repo: string,
  tag: string
): Promise<GitHubRelease> {
  const response = await useOctokit().rest.repos.getReleaseByTag({
    owner,
    repo,
    tag,
  });

  return transformOctokitRelease(response.data);
}

/**
 * Fetch GitHub releases with pagination
 */
export async function fetchGitHubReleases(
  owner: string,
  repo: string,
  page: number,
  perPage: number
): Promise<{ releases: GitHubRelease[]; pagination: PaginationInfo }> {
  const response = await useOctokit().rest.repos.listReleases({
    owner,
    repo,
    page,
    per_page: perPage,
  });

  const { hasNext, hasPrev } = parseLinkHeader(response.headers.link);
  const releases = response.data.map(transformOctokitRelease);

  return {
    releases,
    pagination: {
      currentPage: page,
      perPage,
      hasNextPage: hasNext,
      hasPreviousPage: hasPrev,
    },
  };
}
