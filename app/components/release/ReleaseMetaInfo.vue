<script setup lang="ts">
const props = defineProps<{
  release: GitHubRelease;
}>();

const timeAgo = computed(() =>
  props.release.publishedAt
    ? useTimeAgo(props.release.publishedAt).value
    : ''
);
</script>

<template>
  <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
    <UBadge
      icon="i-lucide-tag"
      variant="subtle"
      color="neutral"
      size="sm"
      :label="release.tag"
    />

    <div class="flex items-center gap-1 text-sm text-toned">
      <UIcon name="i-lucide-calendar" />
      <span>{{ release.publishedAt && formatDate(release.publishedAt) }}</span>
      <UBadge
        size="sm"
        color="neutral"
        variant="soft"
        :label="timeAgo"
      />
    </div>

    <div class="flex items-center gap-1 text-sm text-toned">
      <UAvatar
        :src="release.authorAvatarUrl"
        icon="i-lucide-user"
        size="2xs"
      />
      <span>{{ release.author }}</span>
    </div>
  </div>
</template>
