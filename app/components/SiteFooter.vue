<script setup lang="ts">
// The © row at the bottom of the dark Contact (home) and next-project (case study) footers.
defineProps<{ backTo: string; backLabel: string }>()
</script>

<template>
  <div class="flex flex-wrap justify-between gap-3 border-t border-white/[0.12] pt-6 text-[14px] text-on-dark-muted">
    <span>© 2026 Kaeleigh Gardiner · Toronto, Canada</span>
    <NuxtLink :to="backTo" class="text-on-dark transition-colors hover:text-lavender">{{ backLabel }}</NuxtLink>
  </div>
</template>
