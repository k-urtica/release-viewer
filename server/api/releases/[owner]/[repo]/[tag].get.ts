import { API_ERRORS } from '~~/server/constants/api-errors';
import { GITHUB_STATUS } from '~~/server/constants/gh-status';
import { withEdgeCache } from '~~/server/utils/cacheHandler';
import { fetchGitHubReleaseByTag } from '~~/server/utils/gh-releases';

export default defineEventHandler(async (event) => {
  return withEdgeCache<GitHubRelease>(event, async () => {
    const { owner, repo, tag } = getRouterParams(event);

    if (!owner || !repo || !tag) {
      throw createError(API_ERRORS.MISSING_PARAMS);
    }

    if (!/^[\w.-]+$/.test(owner) || !/^[\w.-]+$/.test(repo)) {
      throw createError(API_ERRORS.INVALID_FORMAT);
    }

    try {
      return await fetchGitHubReleaseByTag(owner, repo, tag);
    } catch (error: unknown) {
      console.error('GitHub API error:', error);

      if (isOctokitError(error)) {
        if (error.status === GITHUB_STATUS.NOT_FOUND) {
          throw createError(API_ERRORS.RELEASE_NOT_FOUND);
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
  }, {
    maxAge: 3600,
    sMaxAge: 21600,
  });
});
