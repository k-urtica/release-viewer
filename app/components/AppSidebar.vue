<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const { pinnedRepositories, removePinnedRepository } = usePinnedRepositories();
const { searchHistories } = useSearchHistory();
const openSearchModal = ref(false);

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

defineShortcuts({
  meta_k: () => {
    openSearchModal.value = !openSearchModal.value;
  }
});
</script>

<template>
  <UDashboardSidebar
    id="default"
    collapsible
    :resizable="false"
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
      <RepositorySearchModal v-model:open="openSearchModal">
        <UButton
          variant="outline"
          :label="collapsed ? undefined : 'Search repository'"
          icon="i-lucide-search"
          :block="collapsed"
          aria-label="Search repository"
          class="w-full rounded-lg"
        >
          <template v-if="!collapsed" #trailing>
            <div class="ms-auto flex items-center gap-0.5">
              <UKbd value="meta" variant="subtle" size="sm" />
              <UKbd value="k" variant="subtle" size="sm" />
            </div>
          </template>
        </UButton>
      </RepositorySearchModal>

      <ClientOnly>
        <UNavigationMenu
          color="neutral"
          :collapsed="collapsed"
          :items="pinnedMenus"
          orientation="vertical"
          tooltip
          popover
        >
          <template #item-trailing="{ item }">
            <UTooltip v-if="item.repo" text="Unpin repository" arrow>
              <UButton
                icon="i-lucide-pin-off"
                color="neutral"
                variant="ghost"
                size="xs"
                aria-label="Unpin repository"
                class="opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                @click.prevent.stop="removePinnedRepository(item.repo)"
              />
            </UTooltip>
          </template>
        </UNavigationMenu>

        <UNavigationMenu
          color="neutral"
          :collapsed="collapsed"
          :items="recentlyMenus"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          color="neutral"
          :collapsed="collapsed"
          :items="[{
            label: 'Feedback',
            icon: 'i-lucide-message-circle',
            to: 'https://github.com/k-urtica/release-viewer/issues',
            target: '_blank'
          }]"
          orientation="vertical"
          tooltip
          popover
          class="mt-auto"
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
