<script setup lang="ts">
defineProps<{
  prerelease?: boolean;
  draft?: boolean;
}>();
</script>

<template>
  <div class="flex items-center gap-1.5">
    <UBadge
      v-if="prerelease"
      color="warning"
      variant="soft"
      size="sm"
      label="Pre-release"
    />
    <UBadge
      v-if="draft"
      color="neutral"
      variant="soft"
      size="sm"
      label="Draft"
    />
  </div>
</template>
