<script setup lang="ts">
defineProps<{
  searchHistory: readonly RepositoryInfo[];
}>();

defineEmits<{
  click: [repository: RepositoryInfo];
}>();
</script>

<template>
  <div class="space-y-2">
    <p class="text-sm font-medium text-muted">Recent searches:</p>
    <div class="flex flex-wrap gap-2">
      <UButton
        v-for="(repo, idx) in searchHistory"
        :key="idx"
        :label="`${repo.owner}/${repo.name}`"
        color="neutral"
        variant="soft"
        size="xs"
        @click="$emit('click', repo)"
      />
    </div>
  </div>
</template>
