<script setup lang="ts">
// Tilted white tiles for the Logo Designs / Illustrations pages; hover straightens them.
defineProps<{
  block: { min: number; items: { src: string; alt: string; title: string; text: string; chip?: string }[] }
}>()

const TILT = [-1.6, 1.2, -0.8, 1.6]
</script>

<template>
  <div
    class="mt-9 grid gap-x-7 gap-y-9"
    :style="{ gridTemplateColumns: `repeat(auto-fill,minmax(min(100%,${block.min}px),1fr))` }"
  >
    <div v-for="(g, i) in block.items" :key="g.src" data-reveal="up" :data-delay="(i % 3) * 90">
      <div
        class="relative transition-transform duration-300 ease-fx hover:![transform:rotate(0deg)_scale(1.03)]"
        :style="{ transform: `rotate(${TILT[i % TILT.length]}deg)` }"
      >
        <div class="flex aspect-square items-center justify-center rounded-[18px] bg-white p-[8%] shadow-taped">
          <img :src="g.src" :alt="g.alt" class="block max-h-full max-w-full rounded-md object-contain" loading="lazy">
        </div>
        <span
          v-if="g.chip"
          class="absolute right-[-8px] top-[-12px] rotate-6 rounded-md bg-highlighter px-[9px] py-[6px] font-mono text-[12px] uppercase tracking-[0.06em] text-ink shadow-[0_6px_14px_rgba(36,22,58,0.18)]"
        >{{ g.chip }}</span>
      </div>
      <h3 class="mt-5 font-display text-[18px] font-bold tracking-[-0.01em] text-ink">{{ g.title }}</h3>
      <p class="mt-1 text-[15px] leading-[1.5] text-text">{{ g.text }}</p>
    </div>
  </div>
</template>
