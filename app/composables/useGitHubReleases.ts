import type { GitHubRelease, RepositoryInfo, UnghReleasesResponse } from '~/types/ungh';

/**
 * ungh APIを使用してGitHubリリース情報を取得するコンポーザブル
 */
export function useGitHubReleases(repository: Ref<RepositoryInfo | null>) {
  const UNGH_BASE_URL = 'https://ungh.cc';

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
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'unknown error occurred';
      releases.value = [];
    } finally {
      loading.value = false;
    }
  }

  watch(repository, loadReleases, { immediate: true });

  return {
    releases,
    loading,
    error,
  };
}
