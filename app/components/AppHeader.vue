<template>
  <header class="sticky top-0 z-50 border-b border-muted/40 bg-default/60 backdrop-blur-sm">
    <UContainer class="flex h-(--header-height) items-center justify-between">
      <div class="flex items-center gap-3">
        <UIcon
          name="i-lucide-github"
          class="size-8 text-primary"
        />
        <NuxtLink to="/">
          <h1 class="text-lg font-black text-highlighted">
            Release Viewer
          </h1>
          <p class="text-xs text-muted">
            GitHub repository release viewer
          </p>
        </NuxtLink>
      </div>

      <div class="flex items-center gap-2.5">
        <ThemeSwitcher />
        <UButton icon="i-mdi-github" size="sm" variant="outline" to="https://github.com/k-urtica/release-viewer" target="_blank" />
      </div>
    </UContainer>
  </header>
</template>
