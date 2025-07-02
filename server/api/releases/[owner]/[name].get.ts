import { Octokit } from '@octokit/rest';
import { fetchGitHubReleases, validatePaginationParams } from '~~/server/utils/github-releases';

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

export default defineEventHandler(async (event): Promise<ReleasesResponse> => {
  const { owner, name } = getRouterParams(event);
  const query = getQuery(event);

  if (!owner || !name) {
    throw createError(ERRORS.MISSING_PARAMS);
  }

  if (!/^[\w.-]+$/.test(owner) || !/^[\w.-]+$/.test(name)) {
    throw createError(ERRORS.INVALID_FORMAT);
  }

  const { page, perPage } = validatePaginationParams(query);
  const githubToken = useRuntimeConfig().githubToken;

  const octokit = new Octokit({
    auth: githubToken,
  });

  try {
    const result = await fetchGitHubReleases(octokit, owner, name, page, perPage);
    return result;
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
