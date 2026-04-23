<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { LazyRepositorySearchModal } from '#components';

const { pinnedRepositories, removePinnedRepository } = usePinnedRepositories();
const { searchHistories } = useSearchHistory();
const repositorySearchModal = useOverlay().create(LazyRepositorySearchModal);

type NavigationMenuItemWithRepo = NavigationMenuItem & { repo?: RepositoryInfo };

const pinnedMenus = computed<NavigationMenuItemWithRepo[]>(() => {
  return [
    {
      label: 'Pinned Repos',
      icon: 'i-lucide-pin',
      type: 'trigger',
      defaultOpen: true,
      children: pinnedRepositories.value.length
        ? pinnedRepositories.value.map((repo) => ({
            label: getRepoName(repo),
            to: `/repo/${repo.owner}/${repo.repo}`,
            repo,
          }))
        : [
            {
              label: 'No pinned repositories',
              type: 'label',
              class: 'text-muted',
            }
          ]
    },
    {
      label: 'Recently Repos',
      icon: 'i-lucide-clock',
      type: 'trigger',
      defaultOpen: true,
      children: searchHistories.value.length
        ? searchHistories.value.map((repo) => ({
            label: getRepoName(repo),
            to: `/repo/${repo.owner}/${repo.repo}`,
          }))
        : [
            {
              label: 'No recently viewed',
              type: 'label',
              class: 'text-muted',
            }
          ]
    }
  ];
});

defineShortcuts({
  meta_k: () => repositorySearchModal.open(),
});
</script>

<template>
  <UDashboardSidebar
    id="rls-sidebar"
    collapsible
    :resizable="false"
    :default-size="18"
    :ui="{
      root: 'group/root border-none min-h-(--app-content-height) transition-[width] duration-200 ease-out',
      header: 'px-2',
      body: 'overflow-x-clip pt-0 px-3 pb-6 group-data-[collapsed=true]/root:px-4',
      footer: 'p-4 lg:border-t'
    }"
  >
    <template #header="{ collapsed }">
      <UButton
        variant="ghost"
        icon="i-lucide-github"
        :label="collapsed ? undefined : 'Release Viewer'"
        to="/"
        size="xl"
        :block="collapsed"
        aria-label="Release Viewer"
        class="w-full font-bold tracking-tight"
      />
    </template>

    <template #default="{ collapsed }">
      <div class="h-full">
        <div class="sticky top-0 z-1">
          <div aria-hidden="true" class="pointer-events-none -mx-4 h-2 bg-default/80 px-4 backdrop-blur-xs" />

          <UButton
            variant="outline"
            :label="collapsed ? undefined : 'Search repository'"
            icon="i-lucide-search"
            :block="collapsed"
            aria-label="Search repository"
            class="w-full rounded-lg"
            @click="repositorySearchModal.open()"
          >
            <template v-if="!collapsed" #trailing>
              <div class="ms-auto flex items-center gap-0.5">
                <UKbd value="meta" variant="subtle" size="sm" />
                <UKbd value="k" variant="subtle" size="sm" />
              </div>
            </template>
          </UButton>

          <div aria-hidden="true" class="pointer-events-none -mx-4 -mt-0.5 h-4 bg-linear-to-b from-default to-transparent px-4" />
        </div>

        <ClientOnly>
          <UNavigationMenu
            color="neutral"
            :collapsed="collapsed"
            :items="pinnedMenus"
            orientation="vertical"
            highlight
            tooltip
            popover
            trailing-icon="i-lucide-chevron-right"
            :ui="{
              list: 'space-y-2',
              link: 'tracking-tight data-[active]:bg-accented/50 hover:before:bg-accented/40 rounded-md',
              linkTrailingIcon: 'size-4 group-data-[state=open]:rotate-90',
            }"
            class="animate-fade-in"
          >
            <template #item-trailing="{ item }">
              <UTooltip
                v-if="!!item.repo"
                text="Unpin repository"
                arrow
              >
                <UButton
                  icon="i-lucide-pin-off"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  aria-label="Unpin repository"
                  class="absolute right-0 text-muted transition-opacity group-hover:opacity-100 focus-visible:opacity-100 lg:opacity-0"
                  @click.prevent.stop="removePinnedRepository(item.repo)"
                />
              </UTooltip>
            </template>
          </UNavigationMenu>
        </ClientOnly>
      </div>
    </template>

    <template #footer="{ collapsed }">
      <div
        class="flex w-full items-center"
        :class="collapsed ? 'flex-col gap-4' : 'flex-row justify-between gap-2'"
      >
        <div class="flex items-center gap-2" :class="collapsed ? 'flex-col' : 'flex-row'">
          <FeedbackButton />
          <GitHubButton />
        </div>

        <UColorModeButton size="sm" variant="subtle" class="shrink-0 rounded-full" />
      </div>
    </template>
  </UDashboardSidebar>
</template>
