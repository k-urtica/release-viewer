<script setup lang="ts">
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
  <article class="rounded-lg border p-6">
    <header class="space-y-3 border-b pb-2">
      <div class="flex items-center gap-3">
        <h3 class="text-2xl font-bold text-highlighted">
          {{ release.name || release.tag }}
        </h3>
        <div class="flex gap-2">
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
        </div>

        <div class="ms-auto flex items-center gap-3">
          <UButton
            icon="i-lucide-external-link"
            color="neutral"
            variant="outline"
            size="sm"
            label="GitHub"
            @click="$emit('openGitHub', release)"
          />
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            size="sm"
            aria-label="Close detail"
            @click="$emit('close')"
          />
        </div>
      </div>
      <ReleaseMetadata :release="release" />
    </header>

    <div class="mt-6 overflow-hidden rounded-lg ring-1 ring-muted/40">
      <section
        class="markdown-body px-4 py-6"
        v-html="sanitizeHtml(release.html)"
      />
    </div>
  </article>
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
