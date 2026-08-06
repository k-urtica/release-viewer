<script setup lang="ts">
const props = defineProps<{
  release: GitHubRelease;
}>();

const publishedAt = computed(() => props.release.publishedAt ? new Date(props.release.publishedAt) : null);
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

    <div v-if="publishedAt" class="flex items-center gap-1">
      <UIcon name="i-lucide-calendar" />
      <NuxtTime
        :datetime="publishedAt"
        year="numeric"
        month="short"
        day="numeric"
        locale="en-US"
        class="text-sm text-toned"
      />
      <UBadge
        size="sm"
        color="neutral"
        variant="soft"
      >
        <NuxtTime
          :datetime="publishedAt"
          relative
          locale="en-US"
        />
      </UBadge>
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
