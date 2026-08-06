<template>
  <UTooltip text="GitHub Repository" arrow>
    <UButton
      icon="local-i-github"
      size="sm"
      variant="outline"
      :to="REPOSITORY_URL"
      target="_blank"
      aria-label="GitHub repository"
      class="rounded-full"
    />
  </UTooltip>
</template>
