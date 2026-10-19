<script setup lang="ts">
import { NOTE_TILT, pad2 } from '~/utils/caseStudy'

// `tone` is a Tailwind colour name (butter, sage, sky, lavender-bg).
defineProps<{ items: { title: string; tone: string; text: string; designed: string }[] }>()

const TONE_BG: Record<string, string> = {
  butter: 'bg-butter',
  sage: 'bg-sage',
  sky: 'bg-sky',
  'lavender-bg': 'bg-lavender-bg',
}
</script>

<template>
  <div class="mt-7 grid gap-[14px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
    <div
      v-for="(a, i) in items"
      :key="a.title"
      data-reveal="up"
      :data-delay="i * 90"
      class="flex flex-col gap-[14px] rounded-lg p-6 shadow-note"
      :class="TONE_BG[a.tone]"
      :style="{ transform: `rotate(${NOTE_TILT[i % 4]}deg)` }"
    >
      <span class="mono-label text-plum">Archetype {{ pad2(i + 1) }}</span>
      <h3 class="font-display text-[20px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink">{{ a.title }}</h3>
      <p class="text-[16px] leading-[1.5] text-ink">{{ a.text }}</p>
      <div class="mt-auto border-t-[1.5px] border-ink/20 pt-3">
        <span class="mono-label text-muted">We designed</span>
        <p class="mt-[6px] text-[15px] leading-[1.5] text-text">{{ a.designed }}</p>
      </div>
    </div>
  </div>
</template>
