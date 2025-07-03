import type { FetchError } from 'ofetch';
import type { GitHubRelease, PaginationInfo, ReleasesResponse, RepositoryInfo } from '~~/shared/types/github';

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
    } catch (err) {
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

function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'data' in error) {
    const fetchError = error as FetchError<ServerErrorData>;
    if (typeof fetchError.data?.message === 'string') {
      return fetchError.data.message;
    }
  }

  return 'An unexpected error occurred. Please try again.';
}
