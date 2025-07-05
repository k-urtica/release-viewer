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
      <ReleaseListItem
        v-for="release in releases"
        :key="release.id"
        :release="release"
        :repository="repository"
        @select="selectRelease"
        @open-git-hub="openGitHubRelease"
      />

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
