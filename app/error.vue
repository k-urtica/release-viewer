<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError
});

const is404 = computed(() => props.error?.statusCode === 404);

const title = computed(() => {
  return is404.value ? 'Page Not Found' : 'Something went wrong';
});

const description = computed(() => {
  if (is404.value) {
    return 'The page you are looking for does not exist.';
  }
  return props.error?.statusMessage || 'An unexpected error occurred.';
});

const statusCode = computed(() => props.error?.statusCode || 500);

useSeoMeta({
  title: () => `${title.value} | Release Viewer`,
});
</script>

<template>
  <UContainer class="flex min-h-dvh items-center justify-center">
    <div class="max-w-md space-y-6 text-center">
      <div class="space-y-4">
        <h1 class="text-xl font-semibold text-muted">Release Viewer</h1>
        <div class="space-y-2">
          <h2 class="text-6xl font-bold text-highlighted">
            {{ statusCode }}
          </h2>
          <h3 class="text-2xl font-semibold text-default">
            {{ title }}
          </h3>
          <p class="text-muted">
            {{ description }}
          </p>
        </div>
      </div>

      <UButton
        color="neutral"
        size="lg"
        to="/"
        icon="i-lucide-home"
      >
        Back to Home
      </UButton>
    </div>
  </UContainer>
</template>
