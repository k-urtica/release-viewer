<script setup lang="ts">
const inputValue = ref('');
const toast = useToast();
const { searchHistory, addToHistory } = useSearchHistory();

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

      <ClientOnly>
        <SearchHistory
          :search-history="searchHistory"
          class="mt-4"
          @click="handleSearch"
        />
      </ClientOnly>
    </div>

    <GetStarted @search="handleSearch" />
  </UContainer>
</template>
