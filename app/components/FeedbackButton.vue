<template>
  <UTooltip text="Feedback & Issues" arrow>
    <UButton
      icon="i-lucide-message-square"
      variant="outline"
      size="sm"
      :to="`${REPOSITORY_URL}/issues`"
      target="_blank"
      aria-label="Feedback & Issues"
      class="rounded-full"
    />
  </UTooltip>
</template>
