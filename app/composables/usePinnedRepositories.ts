interface PinnedRepository extends RepositoryInfo {
  pinnedAt: number;
}

const MAX_PINNED_REPOSITORIES = 10;

/**
 * Composable for managing pinned GitHub repositories in local storage.
 *
 * Provides a reactive API to add, remove, toggle, and clear pinned repositories,
 * as well as check pin status. The maximum number of pinned repositories is limited.
 */
export function usePinnedRepositories() {
  const pinnedRepositories = useLocalStorage<PinnedRepository[]>(
    'pinned-repositories',
    [],
    { mergeDefaults: true }
  );

  const hasPinned = computed(() => pinnedRepositories.value.length > 0);

  const isPinned = (repo: RepositoryInfo): boolean => {
    return pinnedRepositories.value.some(
      (pinned) => pinned.owner === repo.owner && pinned.repo === repo.repo
    );
  };

  const addPinnedRepository = (repo: RepositoryInfo) => {
    if (isPinned(repo)) return;
    const newPinned: PinnedRepository = { ...repo, pinnedAt: Date.now() };
    pinnedRepositories.value = [
      newPinned,
      ...pinnedRepositories.value.slice(0, MAX_PINNED_REPOSITORIES - 1)
    ];
  };

  const removePinnedRepository = (repo: RepositoryInfo) => {
    pinnedRepositories.value = pinnedRepositories.value.filter(
      (pinned) => !(pinned.owner === repo.owner && pinned.repo === repo.repo)
    );
  };

  const togglePinnedRepository = (repo: RepositoryInfo) => {
    if (isPinned(repo)) {
      removePinnedRepository(repo);
    } else {
      addPinnedRepository(repo);
    }
  };

  const clearPinnedRepositories = () => {
    pinnedRepositories.value = [];
  };

  return {
    hasPinned,
    pinnedRepositories: readonly(pinnedRepositories),
    isPinned,
    addPinnedRepository,
    removePinnedRepository,
    togglePinnedRepository,
    clearPinnedRepositories
  };
}
