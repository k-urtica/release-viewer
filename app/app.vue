<template>
  <UApp :tooltip="{ delayDuration: 100, skipDelayDuration: 150 }">
    <div class="min-h-dvh">
      <AppHeader />
      <main>
        <NuxtPage />
      </main>
    </div>
  </UApp>
</template>
