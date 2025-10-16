<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const { pinnedRepositories, removePinnedRepository } = usePinnedRepositories();
const { searchHistories } = useSearchHistory();

type NavigationMenuItemWithRepo = NavigationMenuItem & { repo?: RepositoryInfo };

const pinnedMenus = computed<NavigationMenuItemWithRepo[]>(() => {
  return [
    {
      label: 'Pinned Repos',
      icon: 'i-lucide-pin',
      defaultOpen: true,
      children: pinnedRepositories.value.length
        ? pinnedRepositories.value.map((repo) => ({
            label: getRepoName(repo),
            to: `/repo/${repo.owner}/${repo.repo}`,
            repo
          }))
        : [
            {
              label: 'No pinned repositories',
              type: 'label',
              class: 'text-muted',

            }
          ]
    },
  ];
});

const recentlyMenus = computed(() => {
  return [
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
  ] satisfies NavigationMenuItem[];
});
</script>

<template>
  <UDashboardSidebar
    id="default"
    collapsible
    resizable
    :default-size="16"
    :ui="{
      root: 'border-none min-h-[calc(100svh-2rem)] transition-[width] ease-in-out',
      footer: 'p-4 lg:border-t'
    }"
  >
    <template #header="{ collapsed }">
      <UButton
        variant="ghost"
        icon="i-lucide-github"
        :label="collapsed ? undefined : 'Release Viewer'"
        to="/"
        :block="collapsed"
        class="w-full font-bold"
      />
    </template>

    <template #default="{ collapsed }">
      <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

      <ClientOnly>
        <UNavigationMenu
          :collapsed="collapsed"
          :items="pinnedMenus"
          orientation="vertical"
          tooltip
          popover
        >
          <template #item-trailing="{ item }">
            <UButton
              v-if="item.repo"
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              size="xs"
              aria-label="Unpin repository"
              class="opacity-0 transition-opacity group-hover:opacity-100"
              @click.stop="removePinnedRepository(item.repo)"
            />
          </template>
        </UNavigationMenu>

        <UNavigationMenu
          :collapsed="collapsed"
          :items="recentlyMenus"
          orientation="vertical"
          tooltip
          popover
        />
      </ClientOnly>
    </template>

    <template #footer="{ collapsed }">
      <div class="flex w-full items-center justify-center gap-2.5" :class="collapsed ? 'flex-col' : 'flex-row'">
        <GitHubButton />
        <ThemeSwitcher />
      </div>
    </template>
  </UDashboardSidebar>
</template>
