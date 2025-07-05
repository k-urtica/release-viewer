<script setup lang="ts">
defineProps<{
  release: GitHubRelease;
}>();
</script>

<template>
  <div class="space-y-3">
    <div class="flex flex-wrap items-center gap-3">
      <h3 class="text-lg font-bold text-highlighted lg:text-xl">
        {{ release.name || release.tag }}
      </h3>
      <div class="flex items-center gap-1.5">
        <UBadge
          v-if="release.prerelease"
          color="warning"
          variant="soft"
          label="Pre-release"
        />
        <UBadge
          v-if="release.draft"
          color="neutral"
          variant="soft"
          label="Draft"
        />
      </div>
      <slot name="actions" />
    </div>
    <ReleaseMetaInfo :release="release" />
  </div>
</template>
