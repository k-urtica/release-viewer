<script setup lang="ts">
const inputValue = ref('');
const toast = useToast();
const { searchHistory, addToHistory } = useSearchHistory();

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
  title: 'Release Viewer - Browse GitHub Repository Releases',
  description: 'Browse GitHub repository release notes with a clean, easy-to-use interface. Enter a repository name or URL to view release information.'
});
</script>

<template>
  <div class="flex min-h-[calc(100dvh-var(--header-height))] items-center justify-center pb-(--footer-height)">
    <UContainer class="max-w-4xl pb-10">
      <HeroTitle />

      <div class="mx-auto mt-8 max-w-2xl">
        <RepositoryInput
          v-model="inputValue"
          @submit="handleSubmit"
        />

        <div class="mt-4">
          <h3 class="text-center text-lg font-medium">
            Popular Repositories
          </h3>
          <div class="mt-1 flex flex-wrap justify-center gap-2">
            <UButton
              v-for="repo in POPULAR_REPOSITORIES"
              :key="`${repo.owner}/${repo.repo}`"
              :label="`${repo.owner}/${repo.repo}`"
              color="neutral"
              variant="soft"
              size="sm"
              :aria-label="`Open ${repo.owner}/${repo.repo}`"
              @click="handleSearch(repo)"
            />
          </div>
        </div>

        <ClientOnly>
          <SearchHistory
            :search-history="searchHistory"
            class="mt-8"
            @click="handleSearch"
          />
        </ClientOnly>
      </div>
    </UContainer>

    <footer class="fixed inset-x-0 bottom-0 h-(--footer-height) border-t border-muted/40 bg-default/60 backdrop-blur-xs">
      <UContainer class="flex h-full items-center justify-center text-center">
        <p class="text-sm text-muted">
          Crafted with <span aria-label="love" role="img">💚</span> by
          <NuxtLink to="https://github.com/k-urtica" target="_blank" class="underline">K</NuxtLink>
        </p>
      </UContainer>
    </footer>
  </div>
</template>
