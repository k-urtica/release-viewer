<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  },
});

const icon = computed(() => (isDark.value ? 'i-lucide-moon' : 'i-lucide-sun'));
</script>

<template>
  <ClientOnly>
    <UButton
      :icon
      variant="outline"
      size="sm"
      aria-label="Toggle theme"
      @click="isDark = !isDark"
    />
    <template #fallback>
      <USkeleton class="size-7" />
    </template>
  </ClientOnly>
</template>
