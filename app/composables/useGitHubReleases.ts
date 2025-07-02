import type { GitHubRelease, ReleasesResponse, RepositoryInfo } from '~~/shared/types/github';

const ERROR_MESSAGES = {
  NOT_FOUND: 'Repository not found. Please check the repository name.',
  RATE_LIMIT: 'API rate limit exceeded. Please try again later.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN: 'An unexpected error occurred. Please try again.',
} as const;

/**
 * Composable for fetching GitHub release information
 */
export function useGitHubReleases(repository: Ref<RepositoryInfo | null>) {
  const releases = shallowRef<GitHubRelease[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  /**
   * Fetch release list for the specified repository
   */
  async function fetchReleases(repositoryInfo: RepositoryInfo): Promise<GitHubRelease[]> {
    const { releases } = await $fetch<ReleasesResponse>(`/api/releases/${repositoryInfo.owner}/${repositoryInfo.name}`);
    return releases;
  }

  /**
   * Update release list
   */
  async function loadReleases() {
    if (!repository.value) {
      releases.value = [];
      error.value = null;
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const data = await fetchReleases(repository.value);
      releases.value = data;
    } catch (err: any) {
      console.error('Failed to fetch releases:', err);
      error.value = getErrorMessage(err);
      releases.value = [];
    } finally {
      loading.value = false;
    }
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

  watch(repository, loadReleases, { immediate: true });

  return {
    releases,
    loading,
    error,
  };
}
