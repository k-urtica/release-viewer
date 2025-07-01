<script setup lang="ts">
import type { RepositoryInfo } from '~/types/ungh';

defineEmits<{
  search: [repo: RepositoryInfo];
}>();

const POPULAR_REPOSITORIES: RepositoryInfo[] = [
  { owner: 'microsoft', name: 'vscode' },
  { owner: 'facebook', name: 'react' },
  { owner: 'nuxt', name: 'nuxt' },
  { owner: 'vercel', name: 'next.js' },
];
</script>

<template>
  <div class="py-16 text-center">
    <div class="space-y-4">
      <UIcon name="i-lucide-rocket" class="mx-auto size-16 text-primary" />
      <h2 class="text-2xl font-semibold text-highlighted">
        Get Started
      </h2>
      <p class="mx-auto max-w-md text-muted">
        Enter a GitHub repository in the field above to browse its release information.
      </p>
    </div>

    <div class="mt-6 space-y-4">
      <h3 class="text-lg font-medium text-highlighted">
        Popular Repositories
      </h3>
      <div class="flex flex-wrap justify-center gap-2">
        <UButton
          v-for="repo in POPULAR_REPOSITORIES"
          :key="`${repo.owner}/${repo.name}`"
          :label="`${repo.owner}/${repo.name}`"
          color="neutral"
          variant="soft"
          size="sm"
          @click="$emit('search', repo)"
        />
      </div>
    </div>
  </div>
</template>
