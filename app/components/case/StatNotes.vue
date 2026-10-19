<script setup lang="ts">
import { NOTE_BG, NOTE_TILT } from '~/utils/caseStudy'

defineProps<{ items: { count: string; unit: string; label: string; text: string }[] }>()
</script>

<template>
  <div class="mt-7 grid gap-[14px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
    <div
      v-for="(s, i) in items"
      :key="s.label"
      data-reveal="up"
      :data-delay="i * 90"
      class="rounded-lg p-6 shadow-note"
      :class="NOTE_BG[i % 4]"
      :style="{ transform: `rotate(${NOTE_TILT[i % 4]}deg)` }"
    >
      <p class="font-serif text-stat-case font-black italic leading-none text-ink">
        <span :data-count="s.count">{{ s.count }}</span><span class="font-sans text-[0.36em] font-semibold not-italic tracking-normal">{{ s.unit }}</span>
      </p>
      <p class="mt-3"><span class="mono-label text-plum">{{ s.label }}</span></p>
      <p class="mt-[10px] text-[15px] leading-[1.55] text-text">{{ s.text }}</p>
    </div>
  </div>
</template>
