<script setup lang="ts">
// A mock of the site's top navigation; `isNew` items are highlighted.
defineProps<{ block: { label: string; aside: string; items: { label: string; isNew?: boolean }[] } }>()
</script>

<template>
  <div data-reveal="up" class="mt-7 rounded-lg bg-white p-[clamp(18px,2.4vw,28px)] shadow-note">
    <div class="flex flex-wrap justify-between gap-[10px] border-b border-dashed border-ink/20 pb-4">
      <span class="mono-label text-muted">{{ block.label }}</span>
      <span class="mono-label text-muted">{{ block.aside }}</span>
    </div>
    <div class="mt-[18px] flex flex-wrap gap-2">
      <span
        v-for="(it, i) in block.items"
        :key="it.label"
        data-reveal="scale"
        :data-delay="i * 60"
        class="rounded-xl border-[1.5px] px-4 py-3 text-[15px] text-ink"
        :class="it.isNew ? 'inline-flex items-center gap-2 border-ink bg-highlighter font-bold' : 'border-ink/[0.18] font-semibold'"
      >
        {{ it.label }}<span
          v-if="it.isNew"
          class="rounded bg-ink px-[6px] py-[3px] font-mono text-[12px] font-medium tracking-[0.08em] text-highlighter"
        >NEW</span>
      </span>
    </div>
  </div>
</template>
