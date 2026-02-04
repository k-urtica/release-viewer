<script setup lang="ts">
const toast = useToast();
const { addToHistory } = useSearchHistory();

const POPULAR_REPOSITORIES: RepositoryInfo[] = [
  { owner: 'microsoft', repo: 'vscode' },
  { owner: 'facebook', repo: 'react' },
  { owner: 'nuxt', repo: 'nuxt' },
  { owner: 'vercel', repo: 'next.js' },
  { owner: 'vitejs', repo: 'vite' }
];

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

useSeoMeta({
  title: 'Release Viewer',
  titleTemplate: '%s - Explore & Search GitHub Releases',
});
</script>

<template>
  <UDashboardPanel
    id="index-0"
    :ui="{ root: 'overflow-y-auto min-h-(--app-content-height) bg-surface' }"
  >
    <UDashboardNavbar :ui="{ root: 'border-none' }">
      <template #leading>
        <UDashboardSidebarCollapse />
      </template>
    </UDashboardNavbar>

    <UContainer class="flex h-full max-w-2xl items-center justify-center pb-20">
      <div class="space-y-8">
        <div class="space-y-2 text-center">
          <h2 class="text-2xl font-bold">Release Viewer</h2>
          <p>
            Explore and search GitHub releases with a clean, easy-to-use interface.
          </p>
        </div>

        <RepositoryPicker @submit="handleSubmit" />

        <div>
          <h3 class="mb-2 text-center font-medium">
            Popular Repositories
          </h3>
          <div class="flex flex-wrap justify-center gap-2">
            <UButton
              v-for="(repo, idx) in POPULAR_REPOSITORIES"
              :key="idx"
              :label="getRepoName(repo)"
              color="neutral"
              variant="soft"
              size="sm"
              :aria-label="`Open ${getRepoName(repo)}`"
              @click="handleSearch(repo)"
            />
          </div>
        </div>
      </div>
    </UContainer>
  </UDashboardPanel>
</template>
