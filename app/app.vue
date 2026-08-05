<script setup lang="ts">
useSeoMeta({
  ogImageUrl: '/og-image.png',
  twitterImage: '/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 600,
});
</script>

<template>
  <UApp :tooltip="{ delayDuration: 100, skipDelayDuration: 150 }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
