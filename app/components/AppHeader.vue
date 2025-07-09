<script setup lang="ts">
const emit = defineEmits<{
  openPinnedDrawer: [];
}>();

const { hasPinned, pinnedRepositories } = usePinnedRepositories();

function handleOpenPinnedDrawer() {
  emit('openPinnedDrawer');
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-muted/40 bg-default/40 backdrop-blur-sm">
    <UContainer class="flex h-(--header-height) items-center justify-between gap-2">
      <div class="flex items-center gap-3">
        <UIcon
          name="i-lucide-github"
          class="size-6 text-primary lg:size-8"
        />
        <NuxtLink to="/">
          <h1 class="text-lg font-black tracking-tight text-highlighted">
            Release Viewer
          </h1>
          <p class="text-xs leading-tight text-muted">
            GitHub repository release viewer
          </p>
        </NuxtLink>
      </div>

      <div class="flex items-center gap-2.5">
        <ClientOnly>
          <UButton
            icon="i-lucide-pin"
            size="sm"
            variant="outline"
            aria-label="Show pinned repositories"
            class="lg:hidden"
            @click="handleOpenPinnedDrawer"
          >
            <template v-if="hasPinned" #trailing>
              <span class="shrink-0">
                {{ pinnedRepositories.length }}
              </span>
            </template>
          </UButton>
          <template #fallback>
            <USkeleton class="size-7" />
          </template>
        </ClientOnly>

        <ThemeSwitcher />

        <UButton
          icon="i-mdi-github"
          size="sm"
          variant="outline"
          to="https://github.com/k-urtica/release-viewer"
          target="_blank"
          aria-label="GitHub repository"
        />
      </div>
    </UContainer>
  </header>
</template>
