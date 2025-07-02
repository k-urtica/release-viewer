<script setup lang="ts">
const props = defineProps<{
  repository: RepositoryInfo | null;
}>();

const emit = defineEmits<{
  selectRelease: [release: GitHubRelease];
}>();

const { releases, loading, error, pagination, reset, loadMore } = useGitHubReleases();

// Watch repository changes and load releases
watch(() => props.repository, (newRepo) => {
  if (newRepo) {
    reset(newRepo);
  }
}, { immediate: true });

useInfiniteScroll(
  window,
  async () => {
    if (props.repository && pagination.value.hasNextPage && !loading.value) {
      await loadMore(props.repository);
    }
  },
  { distance: 100 }
);

function selectRelease(release: GitHubRelease) {
  emit('selectRelease', release);
}

function openGitHubRelease(repository: RepositoryInfo, release: GitHubRelease) {
  const url = `https://github.com/${repository.owner}/${repository.name}/releases/tag/${release.tag}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
</script>

<template>
  <div class="space-y-4">
    <div v-if="loading && releases.length === 0" class="space-y-4">
      <USkeleton v-for="i in 5" :key="i" class="h-32 w-full" />
    </div>

    <UAlert
      v-else-if="error"
      color="error"
      variant="soft"
      :title="error"
      icon="i-lucide-circle-alert"
    />

    <div v-else-if="releases.length > 0" class="space-y-4">
      <a
        v-for="release in releases"
        :key="release.id"
        href="#"
        class="block rounded-lg border px-4 py-5 transition-colors hover:border-primary hover:shadow-md"
        @click.prevent="selectRelease(release)"
      >
        <div class="space-y-3 border-b pb-2">
          <div class="flex flex-wrap items-center gap-2">
            <h3 class="shrink-0 text-xl font-semibold text-highlighted">
              {{ release.name || release.tag }}
            </h3>
            <UBadge
              v-if="release.prerelease"
              color="warning"
              variant="soft"
              size="sm"
              label="Pre-release"
            />
            <UBadge
              v-if="release.draft"
              color="neutral"
              variant="soft"
              size="sm"
              label="Draft"
            />

            <UButton
              v-if="repository"
              icon="i-lucide-external-link"
              color="neutral"
              variant="outline"
              size="sm"
              label="GitHub"
              class="ms-auto"
              @click.stop="openGitHubRelease(repository, release)"
            />
          </div>
          <ReleaseMetadata :release="release" />
        </div>

        <div v-if="release.html" class="mt-4 rounded-lg bg-muted/80 p-4">
          <div
            class="pointer-events-none line-clamp-5 text-sm text-toned"
            v-html="sanitizeHtml(release.html)"
          />
        </div>
      </a>

      <div v-if="loading" class="space-y-3">
        <USkeleton v-for="i in 3" :key="i" class="h-32 w-full" />
      </div>

      <div v-else-if="!pagination.hasNextPage" class="py-4 text-center">
        <p class="text-muted">All releases have been displayed</p>
      </div>
    </div>

    <UAlert
      v-else-if="!loading && repository"
      color="info"
      variant="soft"
      title="No releases found"
      description="This repository has no releases."
      icon="i-lucide-info"
    />
  </div>
</template>
