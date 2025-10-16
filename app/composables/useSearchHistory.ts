export function useSearchHistory() {
  const MAX_HISTORY_SIZE = 30;

  const searchHistories = useLocalStorage<RepositoryInfo[]>('release-viewer-history', []);

  const addToHistory = (repository: RepositoryInfo) => {
    const filteredHistory = searchHistories.value.filter(
      (item) => !(item.owner === repository.owner && item.repo === repository.repo)
    );

    searchHistories.value = [repository, ...filteredHistory].slice(0, MAX_HISTORY_SIZE);
  };

  const removeFromHistory = (repository: RepositoryInfo) => {
    searchHistories.value = searchHistories.value.filter(
      (item) => !(item.owner === repository.owner && item.repo === repository.repo)
    );
  };

  return {
    searchHistories: readonly(searchHistories),
    addToHistory,
    removeFromHistory
  };
}
