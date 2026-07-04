<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <div class="inline-flex items-center gap-2.5 rounded-full" style="background: #E7FFE4; padding: 8px 16px;">
    <span
      class="inline-block rounded-full shrink-0"
      style="width: 8px; height: 8px; background: #22C55E; box-shadow: 0 0 0 4px rgba(34,197,94,0.2);"
    ></span>
    <span class="font-display font-semibold" style="font-size: 13px; letter-spacing: 0.02em; color: #1F6B33;">
      {{ label }}
    </span>
  </div>
</template>
