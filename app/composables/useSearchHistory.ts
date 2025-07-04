export function useSearchHistory() {
  const MAX_HISTORY_SIZE = 10;

  const searchHistory = useLocalStorage<RepositoryInfo[]>('release-viewer-history', []);

  function addToHistory(repository: RepositoryInfo): void {
    const filteredHistory = searchHistory.value.filter(
      (item) => !(item.owner === repository.owner && item.repo === repository.repo)
    );

    searchHistory.value = [repository, ...filteredHistory].slice(0, MAX_HISTORY_SIZE);
  }

  return {
    searchHistory: readonly(searchHistory),
    addToHistory
  };
}
