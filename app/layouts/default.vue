<template>
  <!-- overflow-x: clip (not hidden) so position: sticky keeps working inside. -->
  <div class="relative overflow-x-clip bg-paper font-sans text-ink">
    <slot />
  </div>
</template>
