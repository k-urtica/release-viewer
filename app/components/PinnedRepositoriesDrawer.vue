<script setup lang="ts">
const open = defineModel<boolean>('open');

const emit = defineEmits<{
  select: [repo: RepositoryInfo];
}>();

const { hasPinned, pinnedRepositories, removePinnedRepository, clearPinnedRepositories } = usePinnedRepositories();

function handleRepositoryClick(repo: RepositoryInfo) {
  emit('select', repo);
  open.value = false;
}
function handleRemovePinned(repo: RepositoryInfo) {
  removePinnedRepository(repo);
}
function handleClearAll() {
  clearPinnedRepositories();
}
</script>

<template>
  <UDrawer
    v-model:open="open"
    :handle="false"
    direction="left"
    :ui="{ container: 'min-w-72', header: 'flex items-center justify-between', body: 'h-full min-h-0 flex flex-col' }"
  >
    <template #header>
      <h2 class="text-lg font-semibold">
        Pinned Repositories
      </h2>

      <UButton
        icon="i-lucide-x"
        color="neutral"
        variant="ghost"
        @click="open = false"
      />
    </template>

    <template #body>
      <div class="overflow-y-auto">
        <div v-if="!hasPinned" class="p-4 text-center">
          <UIcon name="i-lucide-pin" class="mx-auto mb-2 size-8 text-muted" />
          <p class="text-muted">
            No pinned repositories yet
          </p>
        </div>

        <div v-else class="flex flex-col space-y-2.5 py-4">
          <UButtonGroup
            v-for="repo in pinnedRepositories"
            :key="`${getRepoName(repo)}`"
            size="xl"
          >
            <UButton
              color="neutral"
              variant="soft"
              :label="`${getRepoName(repo)}`"
              :aria-label="`Open ${getRepoName(repo)}`"
              block
              :ui="{ base: 'justify-start min-w-0' }"
              @click="handleRepositoryClick(repo)"
            />
            <UButton
              color="neutral"
              variant="soft"
              icon="i-lucide-x"
              :aria-label="`Remove ${getRepoName(repo)} from pinned`"
              class="text-dimmed/40 hover:text-muted"
              @click="handleRemovePinned(repo)"
            />
          </UButtonGroup>
        </div>
      </div>
    </template>

    <template #footer>
      <UButton
        label="Clear All"
        color="error"
        variant="subtle"
        size="sm"
        icon="i-lucide-trash-2"
        block
        @click="handleClearAll"
      />
    </template>
  </UDrawer>
</template>
