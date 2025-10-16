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
      <UDashboardNavbar :title="release.name || release.tag" :toggle="false">
        <template #toggle>
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            size="sm"
            aria-label="Close detail"
            @click="$emit('close')"
          />
        </template>
        <template #trailing>
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
        </template>
        <template #right>
          <ReleaseMetaInfo :release="release" />
        </template>
      <!-- <ReleaseHeader :release="release" /> -->
      </UDashboardNavbar>
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
  <!-- <article>
    <header>
      <ReleaseHeader :release="release" class="border-b pb-2">
        <template #actions>
          <div class="ms-auto flex items-center gap-3">
            <UButton
              icon="i-lucide-external-link"
              color="neutral"
              variant="outline"
              size="sm"
              label="GitHub"
              aria-label="Open release on GitHub"
              @click="$emit('openGitHub', release)"
            />
            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="outline"
              size="sm"
              aria-label="Close detail"
              @click="$emit('close')"
            />
          </div>
        </template>
      </ReleaseHeader>
    </header>
    <div class="mt-6 overflow-hidden rounded-lg ring-1 ring-muted/40">
      <section
        class="markdown-body px-4 py-6"
        v-html="release.html"
      />
    </div>
  </article> -->
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
