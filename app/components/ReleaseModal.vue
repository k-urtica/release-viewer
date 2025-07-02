<script setup lang="ts">
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
      <div class="overflow-auto">
        <ReleaseDetail
          :release="release"
          @open-git-hub="handleOpenGitHub"
          @close="close"
        />
      </div>
    </template>
  </UModal>
</template>
