<script setup lang="ts">
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
      <span>{{ release.publishedAt && formatDate(release.publishedAt) }}</span>
    </div>
    <div class="flex items-center gap-1">
      <UAvatar
        v-if="release.authorAvatarUrl"
        :src="release.authorAvatarUrl"
        icon="i-lucide-user"
        size="2xs"
      />
      <span>{{ release.author }}</span>
    </div>
  </div>
</template>
