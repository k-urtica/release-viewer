import type { RestEndpointMethodTypes } from '@octokit/rest';
import { Octokit } from '@octokit/rest';

const MAX_RELEASES = 100;

const ERRORS = {
  MISSING_PARAMS: {
    statusCode: 400,
    statusMessage: 'Bad Request',
    message: 'Repository owner and name are required',
  },
  INVALID_FORMAT: {
    statusCode: 400,
    statusMessage: 'Bad Request',
    message: 'Invalid repository owner or name format',
  },
  REPOSITORY_NOT_FOUND: {
    statusCode: 404,
    statusMessage: 'Not Found',
    message: 'Repository not found. Please check the repository name.',
  },
  RATE_LIMIT_EXCEEDED: {
    statusCode: 429,
    statusMessage: 'Too Many Requests',
    message: 'GitHub API rate limit exceeded. Please try again later.',
  },
  GITHUB_SERVER_ERROR: {
    statusCode: 503,
    statusMessage: 'Service Unavailable',
    message: 'GitHub API is temporarily unavailable. Please try again later.',
  },
  INTERNAL_ERROR: {
    statusCode: 500,
    statusMessage: 'Internal Server Error',
    message: 'An unexpected error occurred. Please try again.',
  },
} as const;

const GITHUB_STATUS = {
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR_MIN: 500,
} as const;

type OctokitRelease = RestEndpointMethodTypes['repos']['listReleases']['response']['data'][0];

/**
 * Transform Octokit release data to GitHubRelease format
 */
function transformOctokitRelease(octokitRelease: OctokitRelease): GitHubRelease {
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
    markdown,
    html: convertMarkdownToHtml(markdown),
  };
}

export default defineEventHandler(async (event): Promise<ReleasesResponse> => {
  const { owner, name } = getRouterParams(event);

  if (!owner || !name) {
    throw createError(ERRORS.MISSING_PARAMS);
  }

  if (!/^[\w.-]+$/.test(owner) || !/^[\w.-]+$/.test(name)) {
    throw createError(ERRORS.INVALID_FORMAT);
  }

  const githubToken = useRuntimeConfig().githubToken;

  const octokit = new Octokit({
    auth: githubToken,
  });

  try {
    const response = await octokit.rest.repos.listReleases({
      owner,
      repo: name,
      per_page: MAX_RELEASES,
    });

    const releases = response.data.map(transformOctokitRelease);

    return {
      releases,
    };
  } catch (error: unknown) {
    console.error('GitHub API error:', error);

    if (isOctokitError(error)) {
      if (error.status === GITHUB_STATUS.NOT_FOUND) {
        throw createError(ERRORS.REPOSITORY_NOT_FOUND);
      }

      if (error.status === GITHUB_STATUS.FORBIDDEN) {
        throw createError(ERRORS.RATE_LIMIT_EXCEEDED);
      }

      if (error.status >= GITHUB_STATUS.SERVER_ERROR_MIN) {
        throw createError(ERRORS.GITHUB_SERVER_ERROR);
      }
    }

    throw createError(ERRORS.INTERNAL_ERROR);
  }
});
