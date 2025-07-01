<script setup lang="ts">
import type { GitHubRelease } from '~/types/ungh';

defineProps<{
  release: GitHubRelease;
}>();
</script>

<template>
  <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
    <div class="flex items-center gap-1">
      <UIcon name="i-lucide-tag" class="h-4 w-4" />
      <span>{{ release.tag }}</span>
    </div>
    <div class="flex items-center gap-1">
      <UIcon name="i-lucide-calendar" class="h-4 w-4" />
      <span>{{ formatDate(release.publishedAt) }}</span>
    </div>
    <div class="flex items-center gap-1">
      <UIcon name="i-lucide-user" class="h-4 w-4" />
      <span>{{ release.author }}</span>
    </div>
  </div>
</template>
