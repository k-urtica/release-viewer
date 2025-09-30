<script setup lang="ts">
const emit = defineEmits<{
  select: [repo: RepositoryInfo];
}>();

const { pinnedRepositories, removePinnedRepository } = usePinnedRepositories();

const scrollContainer = useTemplateRef('scrollContainer');
const { width } = useElementSize(scrollContainer);
const OFFSET_HORIZONTAL = 20; // Offset to account for scrollbar width

const hasHorizontalOverflow = computed(() => {
  const element = scrollContainer.value;
  if (!element) return false;

  return element?.scrollWidth > width.value + OFFSET_HORIZONTAL;
});

function handleRepositoryClick(repo: RepositoryInfo) {
  emit('select', repo);
}

function handleRemovePinned(repo: RepositoryInfo) {
  removePinnedRepository(repo);
}

function scrollLeft() {
  scrollContainer.value?.scrollBy({ left: -200, behavior: 'smooth' });
}

function scrollRight() {
  scrollContainer.value?.scrollBy({ left: 200, behavior: 'smooth' });
}
</script>

<template>
  <div class="relative flex h-(--pinned-bar-height) items-center px-2">
    <UButton
      v-if="hasHorizontalOverflow"
      icon="i-lucide-chevron-left"
      color="neutral"
      variant="ghost"
      size="xs"
      aria-label="Scroll left"
      class="absolute left-1 z-10 text-muted hover:text-toned"
      @click="scrollLeft"
    />

    <div
      ref="scrollContainer"
      class="scrollbar-none flex items-center gap-1 overflow-x-auto"
      :class="{ 'mx-8': hasHorizontalOverflow }"
    >
      <UFieldGroup
        v-for="repo in pinnedRepositories"
        :key="`${getRepoName(repo)}`"
        size="xs"
      >
        <UButton
          color="neutral"
          variant="soft"
          :label="`${getRepoName(repo)}`"
          :aria-label="`Open ${getRepoName(repo)}`"
          class="text-dimmed hover:text-muted"
          @click="handleRepositoryClick(repo)"
        />
        <UTooltip :text="`Remove ${getRepoName(repo)} from pinned`" arrow>
          <UButton
            color="neutral"
            variant="soft"
            icon="i-lucide-x"
            :aria-label="`Remove ${getRepoName(repo)} from pinned`"
            class="text-dimmed/40 hover:text-muted"
            @click="handleRemovePinned(repo)"
          />
        </UTooltip>
      </UFieldGroup>
    </div>

    <UButton
      v-if="hasHorizontalOverflow"
      icon="i-lucide-chevron-right"
      color="neutral"
      variant="ghost"
      size="xs"
      aria-label="Scroll right"
      class="absolute right-1 z-10 text-muted hover:text-toned"
      @click="scrollRight"
    />
  </div>
</template>

<style scoped>
.scrollbar-none {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
</style>
