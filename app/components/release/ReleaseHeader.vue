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

      <ReleaseStatusBadges :prerelease="release.prerelease" :draft="release.draft" />

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
