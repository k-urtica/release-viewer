<template>
  <UDashboardGroup unit="rem" storage="cookie" class="bg-default">
    <AppSidebar class="mt-(--app-margin)" />

    <div class="flex flex-1 overflow-hidden bg-default shadow-2xs lg:my-(--app-margin) lg:mr-(--app-margin) lg:rounded-lg lg:border">
      <slot />
    </div>
  </UDashboardGroup>
</template>
