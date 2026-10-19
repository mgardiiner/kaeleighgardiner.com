<script setup lang="ts">
// Outlined pills under a small label. `issue` marks each one with a red ✕.
defineProps<{ block: { label: string; issue?: boolean; items: string[] } }>()
</script>

<template>
  <div>
    <p class="mt-[30px]"><span class="mono-label text-muted">{{ block.label }}</span></p>
    <div class="mt-3 flex flex-wrap gap-2">
      <span
        v-for="(c, i) in block.items"
        :key="c"
        data-reveal="scale"
        :data-delay="i * 60"
        class="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink px-[14px] py-[10px] text-[15px] font-semibold text-ink"
      >
        <span v-if="block.issue" class="text-issue-red" aria-hidden="true">✕</span>{{ c }}
      </span>
    </div>
  </div>
</template>
