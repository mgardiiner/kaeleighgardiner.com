<script setup lang="ts">
import aboutData from '~/data/about.json'

const items = aboutData.home.marquee as { text: string; accent?: boolean }[]
// The strip slides 1100px across the section's time on screen; repeat the
// first three so the right edge never runs out on wide screens.
const strip = [...items, ...items.slice(0, 3)]
</script>

<template>
  <section data-enter class="relative z-[2] overflow-hidden bg-lavender py-6 text-ink" aria-label="Skills">
    <div
      class="flex w-max items-center gap-10 whitespace-nowrap font-display text-[clamp(18px,2.2vw,34px)] font-bold tracking-[-0.02em]"
      style="transform: translateX(calc(var(--e,0.5) * -1100px))"
    >
      <template v-for="(item, i) in strip" :key="i">
        <span v-if="i" class="h-[14px] w-[14px] shrink-0 rotate-45 bg-ink" aria-hidden="true" />
        <span :class="item.accent && 'font-serif italic tracking-[-0.01em]'">{{ item.text }}</span>
      </template>
    </div>
  </section>
</template>
