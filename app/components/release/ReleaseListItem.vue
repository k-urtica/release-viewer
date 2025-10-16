<script setup lang="ts">
import type { GitHubRelease, RepositoryInfo } from '~/../shared/types/github';

defineProps<{
  release: GitHubRelease;
  repository: RepositoryInfo;
  active?: boolean;
}>();

defineEmits<{
  select: [release: GitHubRelease];
  openRelease: [repository: RepositoryInfo, release: GitHubRelease];
}>();
</script>

<template>
  <a
    href="#"
    :aria-label="`View details for release ${release.name || release.tag}`"
    class="block rounded-lg border border-muted p-4 transition-colors outline-none hover:border-primary hover:shadow-sm focus-visible:border-primary"
    :class="{ 'border-primary': active }"
    @click.prevent="$emit('select', release)"
  >
    <ReleaseHeader
      :release="release"
      class="border-b pb-2"
      @open-release="$emit('openRelease', repository, release)"
    />

    <div v-if="release.html" class="mt-4 rounded-lg">
      <div
        inert
        class="line-clamp-3 text-sm text-muted"
        v-html="release.html"
      />
    </div>
  </a>
</template>
