<script setup>
useHead({
  bodyAttrs: { style: 'overflow: hidden;' },
  // The editor is never a search result.
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
</script>

<template>
  <div class="h-screen overflow-hidden">
    <slot />
  </div>
</template>
