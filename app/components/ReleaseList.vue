<script setup lang="ts">
import type { GitHubRelease } from '~/types/ungh';

interface Props {
  releases: GitHubRelease[];
  loading?: boolean;
  error?: string | null;
  repository?: { owner: string; name: string } | null;
}

withDefaults(defineProps<Props>(), {
  loading: false,
  error: null,
  repository: null,
});

const emit = defineEmits<{
  selectRelease: [release: GitHubRelease];
}>();

function selectRelease(release: GitHubRelease) {
  emit('selectRelease', release);
}
</script>

<template>
  <div class="space-y-4">
    <div v-if="loading" class="space-y-3">
      <USkeleton v-for="i in 5" :key="i" class="h-32 w-full" />
    </div>

    <UAlert
      v-else-if="error"
      color="error"
      variant="soft"
      :title="error"
      icon="i-lucide-alert-circle"
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
            v-html="release.html"
          />
        </div>
      </a>
    </div>

    <UAlert
      v-else
      color="info"
      variant="soft"
      title="リリースが見つかりません"
      description="このリポジトリにはリリースがありません。"
      icon="i-lucide-info"
    />
  </div>
</template>
