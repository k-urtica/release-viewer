<script setup lang="ts">
import type { GitHubRelease } from '#shared/types/github';

defineProps<{
  release: GitHubRelease;
}>();

defineEmits<{
  openRelease: [release: GitHubRelease];
}>();
</script>

<template>
  <div class="space-y-3">
    <div class="flex flex-wrap items-center gap-2">
      <h2 class="text-lg font-bold text-highlighted">
        {{ getReleaseTitle(release) }}
      </h2>
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

      <div class="ms-auto">
        <UButton
          trailing-icon="i-lucide-external-link"
          color="neutral"
          variant="ghost"
          size="sm"
          label="GitHub"
          class="ms-auto"
          aria-label="Open release on GitHub"
          @click.stop="$emit('openRelease', release)"
        />
      </div>
    </div>
    <ReleaseMetaInfo :release="release" />
  </div>
</template>
