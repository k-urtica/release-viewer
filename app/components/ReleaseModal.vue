<script setup lang="ts">
import type { GitHubRelease } from '~/types/ungh';

const open = defineModel<boolean>();

defineProps<{
  release: GitHubRelease;
}>();

const emit = defineEmits<{
  openGitHub: [release: GitHubRelease];
}>();

function handleOpenGitHub(release: GitHubRelease) {
  emit('openGitHub', release);
}
</script>

<template>
  <UModal
    v-model:open="open"
  >
    <template #content="{ close }">
      <div class="overflow-auto p-5">
        <ReleaseDetail
          :release="release"
          @open-git-hub="handleOpenGitHub"
          @close="close"
        />
      </div>
    </template>
  </UModal>
</template>
