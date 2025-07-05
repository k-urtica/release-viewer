<template>
  <UApp :tooltip="{ delayDuration: 100, skipDelayDuration: 150 }">
    <div class="grid-background" aria-hidden="true" />

    <div class="min-h-dvh">
      <AppHeader />
      <main class="pt-(--header-height)">
        <NuxtPage />
      </main>
    </div>
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
  background-size: 22px 26px;
}
</style>
