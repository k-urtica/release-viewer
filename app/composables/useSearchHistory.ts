export function useSearchHistory() {
  const MAX_HISTORY_SIZE = 10;

  const searchHistories = useLocalStorage<RepositoryInfo[]>('release-viewer-history', []);

  function addToHistory(repository: RepositoryInfo): void {
    const filteredHistory = searchHistories.value.filter(
      (item) => !(item.owner === repository.owner && item.repo === repository.repo)
    );

    searchHistories.value = [repository, ...filteredHistory].slice(0, MAX_HISTORY_SIZE);
  }

  return {
    searchHistories: readonly(searchHistories),
    addToHistory
  };
}
