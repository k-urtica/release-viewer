import type { GitHubRelease, PaginationInfo, ReleasesResponse, RepositoryInfo } from '~~/shared/types/github';

const ERROR_MESSAGES = {
  NOT_FOUND: 'Repository not found. Please check the repository name.',
  RATE_LIMIT: 'API rate limit exceeded. Please try again later.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN: 'An unexpected error occurred. Please try again.',
} as const;

/**
 * Composable for fetching GitHub release information with pagination support
 */
export function useGitHubReleases() {
  const releases = shallowRef<GitHubRelease[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref<PaginationInfo>({
    currentPage: 1,
    perPage: 30,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  async function fetchAndUpdate(repository: RepositoryInfo, page: number, append = false) {
    if (append && (!pagination.value.hasNextPage || loading.value)) return;

    loading.value = true;
    error.value = null;

    try {
      const data = await $fetch<ReleasesResponse>(`/api/releases/${repository.owner}/${repository.name}`, {
        query: {
          page,
          per_page: pagination.value.perPage,
        },
      });

      releases.value = append ? [...releases.value, ...data.releases] : data.releases;
      pagination.value = data.pagination;
    } catch (err: any) {
      console.error('Failed to fetch releases:', err);
      error.value = getErrorMessage(err);
      if (!append) releases.value = [];
    } finally {
      loading.value = false;
    }
  }

  async function load(repository: RepositoryInfo, page = 1) {
    return fetchAndUpdate(repository, page, false);
  }

  async function loadMore(repository: RepositoryInfo) {
    return fetchAndUpdate(repository, pagination.value.currentPage + 1, true);
  }

  async function reset(repository: RepositoryInfo) {
    releases.value = [];
    pagination.value = {
      currentPage: 1,
      perPage: 30,
      hasNextPage: false,
      hasPreviousPage: false,
    };
    await load(repository, 1);
  }

  function getErrorMessage(err: any): string {
    const status = err?.status;

    if (status === 404) return ERROR_MESSAGES.NOT_FOUND;
    if (status === 403) return ERROR_MESSAGES.RATE_LIMIT;
    if (status >= 500) return ERROR_MESSAGES.SERVER_ERROR;
    if (err?.code === 'NETWORK_ERR' || err?.name === 'NetworkError') {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }

    return err instanceof Error ? err.message : ERROR_MESSAGES.UNKNOWN;
  }

  return {
    releases: readonly(releases),
    loading: readonly(loading),
    error: readonly(error),
    pagination: readonly(pagination),
    load,
    loadMore,
    reset,
  };
}
