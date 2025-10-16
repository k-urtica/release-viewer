<script setup lang="ts">
import { useNpmSearch } from '~/composables/useNpmSearch';

interface CustomInputItem {
  label: string;
  value: string;
  description?: string;
  icon: string;
}

defineProps<{
  autofocus?: boolean;
}>();

const emit = defineEmits<{
  submit: [repositoryUrl: string];
}>();

const searchTerm = ref('');

const { suggestions, loading: isLoading, error: searchError, search } = useNpmSearch();

const menuItems = computed(() => {
  if (isGitHubUrl(searchTerm.value.trim())) return [];

  return suggestions.value.map<CustomInputItem>((pkg) => ({
    label: `${pkg.name} - [${pkg.owner}/${pkg.repo}]`,
    value: pkg.repositoryUrl,
    description: pkg.description,
    icon: 'i-lucide-package'
  }));
});

function handleSearchTermChange(newTerm: string) {
  const trimmed = newTerm.trim();
  if (trimmed && !isGitHubUrl(trimmed)) {
    search(trimmed);
  }
}

function handleSubmit(repositoryUrl: string) {
  emit('submit', repositoryUrl);
}

function handleManualInput(userInput: string) {
  const trimmedInput = userInput.trim();
  if (!trimmedInput) {
    return;
  }
  handleSubmit(trimmedInput);
}

function handleSelect({ value }: CustomInputItem) {
  handleSubmit(value);
}
</script>

<template>
  <div class="space-y-3">
    <UFormField help="GitHub repo URL, owner/repo, or an npm package name">
      <UInputMenu
        v-model:search-term="searchTerm"
        :loading="isLoading"
        :items="menuItems"
        :create-item="{ position: 'bottom', when: 'empty' }"
        icon="i-lucide-search"
        trailing-icon=""
        placeholder="e.g. owner/repo or nuxt"
        size="lg"
        variant="outline"
        ignore-filter
        :autofocus="autofocus"
        autocapitalize="off"
        autocorrect="off"
        :ui="{ base: 'rounded-xl py-3', itemLabel: 'w-full', itemLeadingIcon: 'size-4.5' }"
        class="w-full"
        @update:model-value="handleSelect"
        @update:search-term="handleSearchTermChange"
        @create="handleManualInput"
      >
        <template #item-label="{ item }">
          <div class="flex flex-col gap-1">
            <span class="font-medium">{{ item.label }}</span>
            <span v-if="item.description" class="line-clamp-1 text-sm text-muted">
              {{ item.description }}
            </span>
          </div>
        </template>

        <template #create-item-label="{ item }">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-github " class="size-4.5 shrink-0 text-muted" />
            <span class="text-muted">
              Use "{{ item }}" manually
            </span>
          </div>
        </template>
      </UInputMenu>
    </UFormField>

    <UAlert
      v-if="searchError"
      color="error"
      variant="soft"
      :title="searchError"
      icon="i-lucide-triangle-alert"
    />
  </div>
</template>
