<script setup>
useHead({ bodyAttrs: { style: 'overflow: hidden;' } })
</script>

<template>
  <div class="h-screen overflow-hidden">
    <slot />
  </div>
</template>
