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
    class="block rounded-lg border bg-elevated/40 p-4 transition-colors outline-none hover:border-primary hover:shadow-sm focus-visible:border-primary"
    @click.prevent="$emit('select', release)"
  >
    <ReleaseHeader :release="release" class="border-b pb-2">
      <template #actions>
        <UButton
          v-if="repository"
          trailing-icon="i-lucide-external-link"
          color="neutral"
          variant="ghost"
          size="sm"
          label="GitHub"
          class="ms-auto"
          @click.stop="$emit('openGitHub', repository, release)"
        />
      </template>
    </ReleaseHeader>
    <div v-if="release.html" class="mt-4 rounded-lg">
      <div
        inert
        class="line-clamp-4 text-sm text-muted"
        v-html="release.html"
      />
    </div>
  </a>
</template>
