<script setup lang="ts">
const { copied, copy } = useCopyEmail()
</script>

<template>
  <button
    type="button"
    class="cursor-pointer border border-white/[0.22] bg-transparent font-mono text-[12px] tracking-[0.04em] text-white transition-colors hover:bg-white/[0.08]"
    @click="copy"
  >
    <span aria-live="polite">{{ copied ? 'Copied ✓' : 'Copy email' }}</span>
  </button>
</template>
