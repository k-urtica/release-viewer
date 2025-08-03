<script setup lang="ts">
const route = useRoute('repo-owner-repo');

const owner = route.params.owner;
const repo = route.params.repo;

const currentRepository = ref<RepositoryInfo>({ owner, repo });
const selectedRelease = shallowRef<GitHubRelease | null>(null);
const openReleaseModal = ref(false);

const toast = useToast();
const isMobile = useAppBreakpoints().smaller('lg');
const { addToHistory } = useSearchHistory();
const { hasPinned, isPinned, togglePinnedRepository } = usePinnedRepositories();

const pinned = computed(() => isPinned(currentRepository.value));

const currentRepoUrl = computed(() => `https://github.com/${currentRepository.value.owner}/${currentRepository.value.repo}`);

const currentRepoName = computed(() => getRepoName(currentRepository.value));

function handleSubmit(inputValue: string) {
  const repository = parseRepository(inputValue);
  if (!repository) {
    toast.add({
      title: 'Invalid repository format',
      description: 'Please enter a valid repository in the format owner/repo',
      color: 'error'
    });
    return;
  }

  handleSearch(repository);
}

async function handleSearch(repo: RepositoryInfo) {
  addToHistory(repo);
  await navigateTo(`/repo/${repo.owner}/${repo.repo}`);
}

function handleSelectRelease(release: GitHubRelease) {
  selectedRelease.value = release;
  if (isMobile.value) {
    openReleaseModal.value = true;
  }
}

function handleCloseDetail() {
  clearSelection();
}

function handleOpenGitHub(release: GitHubRelease) {
  openGitHubRelease(currentRepository.value, release);
}

function clearSelection() {
  selectedRelease.value = null;
  openReleaseModal.value = false;
}

function handleTogglePin() {
  togglePinnedRepository(currentRepository.value);
  const repoName = getRepoName(currentRepository.value);

  toast.add({
    title: pinned.value ? 'Repository pinned' : 'Repository unpinned',
    description: pinned.value
      ? `${repoName} added to pinned`
      : `${repoName} removed from pinned`,
    color: pinned.value ? 'success' : 'neutral'
  });
}

useSeoMeta({
  title: () => `${currentRepoName.value} Releases`,
  description: () => `Browse release notes for ${currentRepoName.value} GitHub repository with a clean, easy-to-use interface.`,
});
</script>

<template>
  <UContainer class="pt-14 pb-20">
    <HeroTitle />

    <div class="mx-auto mt-8 max-w-2xl">
      <RepositoryInput
        @submit="handleSubmit"
      />
    </div>

    <div class="mx-auto mt-10 text-center">
      <div class="mx-auto flex max-w-2xl flex-col items-center gap-2 rounded-xl bg-muted/80 px-6 py-5 ring-1 ring-muted/40">
        <div class="flex items-center gap-5">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-github" class="shrink-0 text-xl text-highlighted" />
            <span class="text-lg leading-tight font-bold text-highlighted lg:text-2xl">
              {{ currentRepoName }}
            </span>
          </div>
          <PinToggleButton :model-value="pinned" @update:model-value="handleTogglePin" />
        </div>

        <ULink
          :to="currentRepoUrl"
          target="_blank"
          aria-label="Open repository on GitHub"
          class="inline-flex items-center gap-1 text-sm hover:underline"
        >
          <UIcon name="i-lucide-external-link" class="shrink-0 text-base" />
          {{ currentRepoUrl }}
        </ULink>
      </div>
    </div>

    <ClientOnly>
      <div class="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-9">
        <div class="lg:col-span-4">
          <h3 class="mb-2 flex items-center gap-2 text-xl font-semibold text-highlighted">
            Releases
          </h3>
          <InfiniteReleaseList
            :repository="currentRepository"
            @select-release="handleSelectRelease"
          />
        </div>

        <div
          class="sticky top-[calc(var(--app-top-offset)+1rem)] max-h-[calc(100vh-var(--app-top-offset)-2rem)] max-lg:hidden lg:col-span-5"
          :style="{ '--app-top-offset': hasPinned ? undefined : 'var(--header-height)' }"
        >
          <div class="h-full">
            <div v-if="selectedRelease" class="flex h-full flex-col bg-default">
              <h3 class="mb-2 text-xl font-semibold text-highlighted">
                Release Details
              </h3>
              <ReleaseDetail
                :release="selectedRelease"
                class="overflow-y-auto"
                @close="handleCloseDetail"
                @open-git-hub="handleOpenGitHub"
              />
            </div>

            <div v-else class="flex flex-col items-center justify-center gap-3 py-16 text-center text-muted">
              <UIcon name="i-lucide-mouse-pointer-click" class="size-12" />
              <p class="text-lg font-medium">Select a release</p>
              <p class="text-sm">Click on a release from the list to view its details.</p>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>

    <ReleaseModal
      v-if="selectedRelease"
      v-model="openReleaseModal"
      :release="selectedRelease"
      @open-git-hub="handleOpenGitHub"
    />
  </UContainer>
</template>
