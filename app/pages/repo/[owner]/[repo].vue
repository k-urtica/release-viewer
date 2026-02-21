<script setup lang="ts">
const route = useRoute('repo-owner-repo');

const owner = route.params.owner;
const repo = route.params.repo;

const currentRepository = ref<RepositoryInfo>({ owner, repo });
const selectedRelease = shallowRef<GitHubRelease | null>(null);

const toast = useToast();
const isMobile = useAppBreakpoints().smaller('lg');
const { isPinned, togglePinnedRepository } = usePinnedRepositories();

const pinned = computed(() => isPinned(currentRepository.value));

const currentRepoUrl = computed(() => `https://github.com/${currentRepository.value.owner}/${currentRepository.value.repo}`);

const currentRepoName = computed(() => getRepoName(currentRepository.value));

const isDetailPanelOpen = computed({
  get() {
    return !!selectedRelease.value;
  },
  set(value: boolean) {
    if (!value) {
      selectedRelease.value = null;
    }
  }
});

function handleSelectRelease(release: GitHubRelease) {
  selectedRelease.value = release;
}

function handleOpenGitHub(release: GitHubRelease) {
  openGitHubRelease(currentRepository.value, release);
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
  <div class="flex flex-1 overflow-clip bg-surface">
    <UDashboardPanel
      id="release-list"
      :default-size="35"
      :min-size="32"
      :max-size="38"
      resizable
      :ui="{
        root: 'min-h-(--app-content-height)',
        body: 'p-0 sm:p-0',
      }"
    >
      <template #header>
        <UDashboardNavbar
          :title="currentRepoName"
        >
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>

          <template #trailing>
            <PinToggleButton
              :model-value="pinned"
              @update:model-value="handleTogglePin"
            />
          </template>

          <template #right>
            <UButton
              trailing-icon="i-lucide-external-link"
              color="neutral"
              variant="ghost"
              size="sm"
              label="Repository"
              aria-label="Open repository on GitHub"
              :to="currentRepoUrl"
              target="_blank"
            />
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <ClientOnly>
          <ReleaseList
            :repository="currentRepository"
            @select-release="handleSelectRelease"
          />
        </ClientOnly>
      </template>
    </UDashboardPanel>

    <ReleaseDetail
      v-if="selectedRelease"
      :release="selectedRelease"
      @close="selectedRelease = null"
    />
    <div v-else class="hidden flex-1 items-center justify-center lg:flex">
      <div class="flex flex-col items-center justify-center gap-2 text-center text-dimmed">
        <UIcon name="i-lucide-mouse-pointer-click" class="size-20" />
        <p class="font-medium">Select a release to view details</p>
        <p class="text-sm text-muted">
          or use
          <UKbd value="arrowup" variant="subtle" size="sm" />
          <UKbd value="arrowdown" variant="subtle" size="sm" />
          to browse
        </p>
      </div>
    </div>

    <ClientOnly>
      <USlideover v-if="isMobile" v-model:open="isDetailPanelOpen">
        <template #content>
          <ReleaseDetail
            v-if="selectedRelease"
            :release="selectedRelease"
            @close="selectedRelease = null"
            @open-git-hub="handleOpenGitHub"
          />
        </template>
      </USlideover>
    </ClientOnly>
  </div>
</template>
