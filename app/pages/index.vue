<script setup lang="ts">
import type { GitHubRelease, RepositoryInfo } from '~/types/ungh';

const repository = useRouteQuery<string>('repository', '');
const inputValue = ref(repository.value);
const selectedRelease = shallowRef<GitHubRelease>();
const openReleaseModal = ref(false);
const searchHistory = useLocalStorage<RepositoryInfo[]>('release-viewer-history', []);

const breakpoints = useAppBreakpoints();
const isMobile = breakpoints.smaller('lg');

const selectedRepository = computed<RepositoryInfo | null>(() => {
  const query = repository.value;
  if (query.includes('/')) {
    const [owner, name] = query.split('/');
    if (owner && name) {
      return { owner, name };
    }
  }
  return null;
});

const { releases, loading, error } = useGitHubReleases(selectedRepository);

watch(repository, (newValue) => {
  inputValue.value = newValue;
}, {
  immediate: true
});

function handleSearch(repo: RepositoryInfo) {
  selectedRelease.value = undefined;
  openReleaseModal.value = false;
  repository.value = `${repo.owner}/${repo.name}`;

  const repoString = `${repo.owner}/${repo.name}`;
  const filteredHistory = searchHistory.value.filter(
    (item) => `${item.owner}/${item.name}` !== repoString
  );

  searchHistory.value = [repo, ...filteredHistory].slice(0, 10);
}

function handleSelectRelease(release: GitHubRelease) {
  selectedRelease.value = release;
  if (isMobile.value) {
    openReleaseModal.value = true;
  }
}

function handleCloseDetail() {
  selectedRelease.value = undefined;
  openReleaseModal.value = false;
}

function handleOpenGitHub(release: GitHubRelease) {
  if (selectedRepository.value) {
    openGitHubRelease(selectedRepository.value, release);
  }
}

useSeoMeta({
  title: 'Release Viewer - GitHub Release Notes Tool',
  description: 'A web tool to browse GitHub repository release notes with a clean, easy-to-use interface',
});
</script>

<template>
  <UContainer class="pt-10 pb-20">
    <div class="space-y-4 text-center">
      <h1 class="text-2xl font-black text-highlighted lg:text-4xl">
        Release Viewer
      </h1>
      <p class="mx-auto max-w-2xl text-sm text-muted lg:text-lg">
        Browse GitHub repository release notes with a clean, easy-to-use interface.
        Enter a repository name or URL to view release information.
      </p>
    </div>

    <div class="mx-auto mt-8 max-w-2xl">
      <RepositoryInput
        v-model="inputValue"
        :loading="loading"
        @search="handleSearch"
      />

      <ClientOnly>
        <SearchHistory
          v-if="searchHistory.length"
          :search-history="searchHistory"
          class="mt-4"
          @click="handleSearch"
        />
      </ClientOnly>
    </div>

    <div v-if="selectedRepository" class="mt-8 grid grid-cols-1 gap-8 border-t pt-8 lg:grid-cols-9">
      <div class="space-y-4 lg:col-span-4">
        <div class="flex items-center justify-between gap-2">
          <h2 class="text-xl font-semibold text-highlighted">
            {{ `${selectedRepository.owner}/${selectedRepository.name}` }}
          </h2>
          <UBadge v-if="releases.length" color="primary" variant="soft">
            {{ `${releases.length} releases` }}
          </UBadge>
        </div>

        <ReleaseList
          :releases="releases"
          :loading="loading"
          :error="error"
          :repository="selectedRepository"
          @select-release="handleSelectRelease"
        />
      </div>

      <div v-if="!isMobile" class="sticky top-[calc(var(--header-height)+1rem)] max-h-[calc(100vh-var(--header-height)-2rem)] lg:col-span-5">
        <div class="h-full">
          <div v-if="selectedRelease" class="flex h-full flex-col bg-default">
            <h2 class="mb-4 text-xl font-semibold text-highlighted">
              Release Details
            </h2>
            <ReleaseDetail
              :release="selectedRelease"
              class="overflow-y-auto"
              @close="handleCloseDetail"
              @open-git-hub="handleOpenGitHub"
            />
          </div>

          <div v-else-if="!loading && releases.length" class="flex flex-col items-center justify-center gap-3 py-10 text-center text-muted">
            <UIcon name="i-lucide-mouse-pointer-click" class="size-12" />
            <p class="text-lg font-medium">Select a release</p>
            <p class="text-sm">Click on a release from the list to view its details.</p>
          </div>
        </div>
      </div>
    </div>

    <GetStarted
      v-else
      @search="handleSearch"
    />

    <ReleaseModal
      v-if="selectedRelease"
      v-model="openReleaseModal"
      :release="selectedRelease"
      @open-git-hub="handleOpenGitHub"
    />
  </UContainer>
</template>
