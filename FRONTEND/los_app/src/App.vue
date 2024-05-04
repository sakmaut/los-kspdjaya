<template>
  <RouterView />
</template>
<style>
html.dark {
  color-scheme: dark;
}

body {
  @apply bg-sfcls dark:bg-sfcls-drk
}

.btn-pr {
  @apply bg-pr justify-center md:w-1/6 hover:bg-pr/90 h-12 hover:shadow-md rounded-xl !text-sf !font-bold w-full
}
</style>