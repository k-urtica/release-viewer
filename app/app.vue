<script setup lang="ts">
const { hasPinned } = usePinnedRepositories();
const openPinnedDrawer = ref(false);

async function handlePinnedRepositorySelect(repo: RepositoryInfo) {
  openPinnedDrawer.value = false;
  await navigateTo(`/repo/${repo.owner}/${repo.repo}`);
}
</script>

<template>
  <UApp :tooltip="{ delayDuration: 100, skipDelayDuration: 150 }">
    <div class="grid-background" aria-hidden="true" />

    <div class="min-h-dvh">
      <AppHeader @open-pinned-drawer="openPinnedDrawer = true" />

      <ClientOnly>
        <div v-if="hasPinned" class="fixed inset-x-0 top-[calc(var(--header-height)+1px)] z-50 hidden border-b border-muted/40 bg-default/60 backdrop-blur-xs lg:block">
          <PinnedRepositoriesList @select="handlePinnedRepositorySelect" />
        </div>
      </ClientOnly>

      <main class="pt-(--header-height) lg:pt-(--app-top-offset)">
        <NuxtPage />
      </main>
    </div>

    <PinnedRepositoriesDrawer
      v-model:open="openPinnedDrawer"
      @select="handlePinnedRepositorySelect"
    />
  </UApp>
</template>

<style scoped>
.grid-background {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(to right, --alpha(var(--ui-border) / 0.23) 1px, transparent 1px),
    linear-gradient(to bottom, --alpha(var(--ui-border) / 0.23) 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>
