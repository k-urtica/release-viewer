<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

const pinned = defineModel<boolean>();

const icon = computed(() => pinned.value ? 'i-lucide-pin' : 'i-lucide-pin-off');
const color = computed<ButtonProps['color']>(() => pinned.value ? 'primary' : 'neutral');
const ariaLabel = computed(() => pinned.value ? 'Unpin repository' : 'Pin repository');

function handleClick() {
  pinned.value = !pinned.value;
}
</script>

<template>
  <ClientOnly>
    <UTooltip :text="ariaLabel" arrow>
      <UButton
        :icon="icon"
        :color="color"
        variant="subtle"
        size="xs"
        :aria-label="ariaLabel"
        @click="handleClick"
      />
    </UTooltip>

    <template #fallback>
      <USkeleton class="size-6" />
    </template>
  </ClientOnly>
</template>
