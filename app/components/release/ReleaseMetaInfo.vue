<script setup lang="ts">
const props = defineProps<{
  release: GitHubRelease;
}>();

const timeAgo = computed(() =>
  props.release.publishedAt
    ? useTimeAgo(props.release.publishedAt)
    : ''
);
</script>

<template>
  <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
    <div class="flex items-center gap-1">
      <UIcon name="i-lucide-tag" class="size-4" />
      <span>{{ release.tag }}</span>
    </div>

    <div class="flex items-center gap-1">
      <UIcon name="i-lucide-calendar" class="size-4" />
      <span>{{ release.publishedAt && formatDate(release.publishedAt) }}</span>
      <UBadge size="sm" color="neutral" variant="soft">{{ timeAgo }}</UBadge>
    </div>

    <div class="flex items-center gap-1">
      <UAvatar
        :src="release.authorAvatarUrl"
        icon="i-lucide-user"
        size="2xs"
      />
      <span>{{ release.author }}</span>
    </div>
  </div>
</template>
