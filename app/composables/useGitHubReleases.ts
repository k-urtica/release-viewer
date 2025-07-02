import type { GitHubRelease, RepositoryInfo, UnghReleasesResponse } from '~/types/ungh';

const UNGH_BASE_URL = 'https://ungh.cc';

const ERROR_MESSAGES = {
  NOT_FOUND: 'Repository not found. Please check the repository name.',
  RATE_LIMIT: 'API rate limit exceeded. Please try again later.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN: 'An unexpected error occurred. Please try again.',
} as const;

/**
 * ungh APIを使用してGitHubリリース情報を取得するコンポーザブル
 */
export function useGitHubReleases(repository: Ref<RepositoryInfo | null>) {
  const releases = shallowRef<GitHubRelease[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  /**
   * 指定されたリポジトリのリリース一覧を取得
   */
  async function fetchReleases(repositoryInfo: RepositoryInfo): Promise<GitHubRelease[]> {
    const url = `${UNGH_BASE_URL}/repos/${repositoryInfo.owner}/${repositoryInfo.name}/releases`;
    const { releases } = await $fetch<UnghReleasesResponse>(url);

    return releases;
  }

  /**
   * リリース一覧を更新
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
