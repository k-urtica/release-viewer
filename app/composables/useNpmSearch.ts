import { parseRepository } from '~/utils/github';

const MIN_QUERY_LENGTH = 2;
const MAX_QUERY_LENGTH = 64;
const MAX_RESULTS = 10;
const DEBOUNCE_MS = 400;

/**
 * Search options for npm registry API
 * @see https://github.com/npm/registry/blob/main/docs/REGISTRY-API.md#get-v1search
 */
const SEARCH_OPTIONS = {
  size: MAX_RESULTS * 3,
  /** Quality weighting factor */
  quality: 0.7,
  /** Popularity weighting factor */
  popularity: 0.2,
  /** Maintenance weighting factor */
  maintenance: 0.1
} as const;

export interface NpmPackage {
  name: string;
  description?: string;
  repositoryUrl: string;
  owner: string;
  repo: string;
  npmUrl: string;

}

interface NpmSearchResponse {
  objects: {
    package: {
      name: string;
      description?: string;
      links?: {
        repository?: string | { type: string; url: string };
      };
    };
  }[];
}

function extractRepositoryInfo(repository?: string | { type: string; url: string }): RepositoryInfo | null {
  if (!repository) return null;

  const repositoryUrl = typeof repository === 'string' ? repository : repository.url;
  if (!repositoryUrl) return null;

  return parseRepository(repositoryUrl);
}

export function useNpmSearch() {
  const suggestions = shallowRef<NpmPackage[]>([]);
  const loading = ref(false);
  const error = ref<string>();

  const debouncedSearch = useDebounceFn(async (query: string) => {
    if (query.length < MIN_QUERY_LENGTH || query.length > MAX_QUERY_LENGTH) {
      suggestions.value = [];
      return;
    }

    loading.value = true;
    error.value = undefined;

    try {
      const response = await $fetch<NpmSearchResponse>('https://registry.npmjs.org/-/v1/search', {
        query: {
          text: query.trim(),
          ...SEARCH_OPTIONS
        }
      });

      suggestions.value = response.objects
        .flatMap(({ package: pkg }) => {
          const repositoryInfo = extractRepositoryInfo(pkg.links?.repository);

          if (!repositoryInfo) return [];

          return {
            name: pkg.name,
            description: pkg.description,
            repositoryUrl: `https://github.com/${repositoryInfo.owner}/${repositoryInfo.repo}`,
            owner: repositoryInfo.owner,
            repo: repositoryInfo.repo,
            npmUrl: `https://www.npmjs.com/package/${pkg.name}`
          };
        })
        .slice(0, MAX_RESULTS);
    } catch (err) {
      console.error('NPM search error:', err);
      error.value = 'Search failed';
      suggestions.value = [];
    } finally {
      loading.value = false;
    }
  }, DEBOUNCE_MS);

  function search(query: string) {
    debouncedSearch(query);
  }

  return {
    suggestions: readonly(suggestions),
    loading: readonly(loading),
    error: readonly(error),
    search
  };
}
