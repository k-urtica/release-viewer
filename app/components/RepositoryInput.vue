<script setup lang="ts">
const inputValue = defineModel<string>({ default: '' });

withDefaults(defineProps<{
  placeholder?: string;
  loading?: boolean;
}>(), {
  placeholder: 'microsoft/vscode or https://github.com/microsoft/vscode',
});

const emit = defineEmits<{
  search: [repository: RepositoryInfo];
}>();

const error = ref<string>();

function handleSearch() {
  error.value = undefined;

  if (!inputValue.value.trim()) {
    error.value = 'Please enter a repository';
    return;
  }

  const repository = parseRepository(inputValue.value);
  if (!repository) {
    error.value = 'Please enter a valid repository format (e.g., owner/repo)';
    return;
  }

  emit('search', repository);
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    handleSearch();
  }
}
</script>

<template>
  <div class="w-full space-y-3">
    <div class="flex gap-2">
      <UInput
        v-model="inputValue"
        :placeholder="placeholder"
        :disabled="loading"
        size="xl"
        icon="i-lucide-github"
        autofocus
        class="flex-1"
        @keydown="handleKeydown"
      />

      <UButton
        :loading="loading"
        :disabled="!inputValue.trim() || loading"
        color="primary"
        size="lg"
        icon="i-lucide-search"
        @click="handleSearch"
      >
        Search
      </UButton>
    </div>

    <UAlert
      v-if="error"
      color="error"
      variant="soft"
      :title="error"
      icon="i-lucide-triangle-alert"
    />
  </div>
</template>
