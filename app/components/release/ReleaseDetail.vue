<script setup lang="ts">
import type { GitHubRelease } from '~/../shared/types/github';

defineProps<{
  release: GitHubRelease;
}>();

defineEmits<{
  close: [];
  openGitHub: [release: GitHubRelease];
}>();

const isDark = computed(() => useColorMode().value === 'dark');

const cssHref = computed(() =>
  isDark.value
    ? 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown-dark.min.css'
    : 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown-light.min.css'
);

useHead(() => ({
  link: [
    {
      rel: 'stylesheet',
      href: cssHref.value,
    }
  ]
}));
</script>

<template>
  <UDashboardPanel
    id="release-detail"
    :ui="{ root: 'min-h-[calc(100svh-2rem)] border-none' }"
  >
    <template #header>
      <UDashboardNavbar :title="getReleaseTitle(release)" :toggle="false">
        <template #trailing>
          <ReleaseStatusBadges :prerelease="release.prerelease" :draft="release.draft" />
        </template>

        <template #right>
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            size="sm"
            aria-label="Close detail"
            @click="$emit('close')"
          />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar class="py-2">
        <template #right>
          <ReleaseMetaInfo :release="release" class="ms-auto justify-end" />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <div class="flex flex-col">
        <section
          class="markdown-body overflow-hidden rounded-lg p-4 ring-1 ring-default"
          v-html="release.html"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>

<style scoped>
:deep(.markdown-body) {
  ul {
    list-style: initial;
    margin: initial;
    padding-left: 2em;
  }
  ul li {
    display: list-item;
  }
  ol {
    list-style-type: decimal;
    margin: initial;
    padding-left: 2em;
  }
  ol li {
    display: list-item;
  }
}
</style>
