<script setup lang="ts">
const open = defineModel<boolean>('open');
const toast = useToast();
const { addToHistory } = useSearchHistory();

function handleSubmit(inputValue: string) {
  const repository = parseRepository(inputValue);
  if (!repository) {
    toast.add({
      title: 'Invalid repository format',
      description: 'Please enter a valid repository in the format owner/repo',
      color: 'error'
    });
    return;
  }

  handleSearch(repository);
}

async function handleSearch(repo: RepositoryInfo) {
  addToHistory(repo);
  await navigateTo(`/repo/${repo.owner}/${repo.repo}`);
  open.value = false;
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="Search Repository"
    :ui="{
      content: 'max-w-xl rounded-2xl',
      header: 'border-none',
      body: 'pt-0 sm:pt-0',
      overlay: 'backdrop-blur-xs bg-elevated/40'
    }"
  >
    <template #default>
      <slot />
    </template>

    <template #body>
      <RepositoryPicker autofocus @submit="handleSubmit" />
    </template>
  </UModal>
</template>
