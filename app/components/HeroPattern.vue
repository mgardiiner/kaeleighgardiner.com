<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div
      v-for="i in 4"
      :key="i"
      class="absolute"
      :style="patternStyles[i - 1]"
    />
  </div>
</template>

<script setup lang="ts">
const patternStyles = [
  {
    width: '1500px',
    height: '180px',
    top: '-60px',
    left: '-300px',
    transform: 'rotate(-45deg)',
    background: 'linear-gradient(to bottom, #FEF9FF, transparent)',
    opacity: '0.5',
    borderRadius: '8px',
  },
  {
    width: '1500px',
    height: '180px',
    top: '60px',
    left: '-200px',
    transform: 'rotate(-45deg)',
    background: 'linear-gradient(to bottom, #FEF9FF, transparent)',
    opacity: '0.4',
    borderRadius: '8px',
  },
  {
    width: '1500px',
    height: '180px',
    top: '180px',
    left: '-100px',
    transform: 'rotate(-45deg)',
    background: 'linear-gradient(to bottom, #FEF9FF, transparent)',
    opacity: '0.3',
    borderRadius: '8px',
  },
  {
    width: '1500px',
    height: '180px',
    top: '300px',
    left: '0px',
    transform: 'rotate(-45deg)',
    background: 'linear-gradient(to bottom, #FEF9FF, transparent)',
    opacity: '0.2',
    borderRadius: '8px',
  },
]
</script>
