<script setup lang="ts">
const route = useRoute('repo-owner-repo');

const owner = route.params.owner;
const repo = route.params.repo;

const currentRepository = ref<RepositoryInfo>({ owner, repo });
const inputValue = ref(`${owner}/${repo}`);
const selectedRelease = shallowRef<GitHubRelease | null>(null);
const openReleaseModal = ref(false);

const toast = useToast();
const isMobile = useAppBreakpoints().smaller('lg');
const { addToHistory } = useSearchHistory();

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

useSeoMeta({
  title: `${owner}/${repo} Releases - Release Viewer`,
  description: `Browse release notes for ${owner}/${repo} GitHub repository with a clean, easy-to-use interface.`,
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
        @submit="handleSubmit"
      />
    </div>

    <ClientOnly>
      <div class="mt-8 grid grid-cols-1 gap-8 border-t pt-8 lg:grid-cols-9">
        <div class="space-y-4 lg:col-span-4">
          <div class="flex items-center justify-between gap-2">
            <h2 class="flex items-center gap-2 text-xl font-semibold text-highlighted">
              <UIcon name="i-lucide-github" />
              {{ `${currentRepository.owner}/${currentRepository.repo}` }}
            </h2>
          </div>

          <InfiniteReleaseList
            :repository="currentRepository"
            @select-release="handleSelectRelease"
          />
        </div>

        <div class="sticky top-[calc(var(--header-height)+1rem)] max-h-[calc(100vh-var(--header-height)-2rem)] max-lg:hidden lg:col-span-5">
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
