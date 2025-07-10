<script setup lang="ts">
import type { GitHubRelease, RepositoryInfo } from '~/../shared/types/github';

defineProps<{
  release: GitHubRelease;
  repository?: RepositoryInfo | null;
}>();

defineEmits<{
  select: [release: GitHubRelease];
  openGitHub: [repository: RepositoryInfo, release: GitHubRelease];
}>();
</script>

<template>
  <a
    href="#"
    :aria-label="`View details for release ${release.name || release.tag}`"
    class="block rounded-lg border bg-default px-4 py-5 transition-colors hover:border-primary hover:shadow-md"
    @click.prevent="$emit('select', release)"
  >
    <ReleaseHeader :release="release" class="border-b pb-2">
      <template #actions>
        <UButton
          v-if="repository"
          icon="i-lucide-external-link"
          color="neutral"
          variant="outline"
          size="sm"
          label="GitHub"
          class="ms-auto"
          @click.stop="$emit('openGitHub', repository, release)"
        />
      </template>
    </ReleaseHeader>
    <div v-if="release.html" class="mt-4 rounded-lg bg-muted/80 p-4">
      <div
        inert
        class="line-clamp-5 text-sm text-toned"
        v-html="release.html"
      />
    </div>
  </a>
</template>
