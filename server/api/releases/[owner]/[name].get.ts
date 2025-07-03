import { API_ERRORS } from '~~/server/constants/api-errors';
import { GITHUB_STATUS } from '~~/server/constants/gh-status';
import { fetchGitHubReleases, validatePaginationParams } from '~~/server/utils/gh-releases';

export default defineEventHandler(async (event): Promise<ReleasesResponse> => {
  const { owner, name } = getRouterParams(event);
  const query = getQuery(event);

  if (!owner || !name) {
    throw createError(API_ERRORS.MISSING_PARAMS);
  }

  if (!/^[\w.-]+$/.test(owner) || !/^[\w.-]+$/.test(name)) {
    throw createError(API_ERRORS.INVALID_FORMAT);
  }

  try {
    const { page, perPage } = validatePaginationParams(query);

    return await fetchGitHubReleases(owner, name, page, perPage);
  } catch (error: unknown) {
    console.error('GitHub API error:', error);

    if (isOctokitError(error)) {
      if (error.status === GITHUB_STATUS.NOT_FOUND) {
        throw createError(API_ERRORS.REPOSITORY_NOT_FOUND);
      }

      if (error.status === GITHUB_STATUS.FORBIDDEN) {
        throw createError(API_ERRORS.RATE_LIMIT_EXCEEDED);
      }

      if (error.status >= GITHUB_STATUS.SERVER_ERROR_MIN) {
        throw createError(API_ERRORS.GITHUB_SERVER_ERROR);
      }
    }

    throw createError(API_ERRORS.INTERNAL_ERROR);
  }
});
