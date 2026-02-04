<script setup lang="ts">
defineOgImage({
  url: '/og-image.png',
  width: 1200,
  height: 600,
});
</script>

<template>
  <UApp :tooltip="{ delayDuration: 100, skipDelayDuration: 150 }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
