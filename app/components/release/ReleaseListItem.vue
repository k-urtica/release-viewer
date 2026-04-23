<script setup lang="ts">
import type { GitHubRelease, RepositoryInfo } from '~/../shared/types/github';

const props = defineProps<{
  release: GitHubRelease;
  repository: RepositoryInfo;
  active?: boolean;
}>();

defineEmits<{
  select: [release: GitHubRelease];
  openRelease: [repository: RepositoryInfo, release: GitHubRelease];
}>();

const el = useTemplateRef('el');

function scrollIntoView() {
  requestAnimationFrame(() => {
    el.value?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  });
}

watch(() => props.active, (isActive) => {
  if (isActive) {
    scrollIntoView();
  }
}, { flush: 'post', immediate: true });
</script>

<template>
  <a
    ref="el"
    href="#"
    :aria-label="`View details for release ${release.name || release.tag}`"
    class="block rounded-lg p-4 ring-1 ring-muted transition-colors outline-none hover:shadow-sm hover:ring-primary/70 focus-visible:ring-primary/70"
    :class="{ 'bg-primary/4 ring-2 ring-primary/70': active }"
    @click.prevent="$emit('select', release)"
  >
    <div class="space-y-3 border-b pb-3">
      <div class="flex flex-wrap items-center gap-2">
        <h2 class="text-lg font-semibold text-highlighted">
          {{ getReleaseTitle(release) }}
        </h2>

        <ReleaseStatusBadges :prerelease="release.prerelease" :draft="release.draft" />

        <div class="ms-auto">
          <UButton
            trailing-icon="i-lucide-arrow-up-right"
            color="neutral"
            variant="ghost"
            size="sm"
            label="GitHub"
            class="ms-auto"
            aria-label="Open release on GitHub"
            @click.stop="$emit('openRelease', repository, release)"
          />
        </div>
      </div>
      <ReleaseMetaInfo :release="release" />
    </div>

    <div v-if="release.html" class="mt-4 rounded-lg">
      <div
        inert
        class="line-clamp-3 text-sm text-muted"
        v-html="release.html"
      />
    </div>
  </a>
</template>
