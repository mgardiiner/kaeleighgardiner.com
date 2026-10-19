<script setup lang="ts">
import { NOTE_BG, NOTE_TILT, pad2 } from '~/utils/caseStudy'

const props = defineProps<{ items: { title: string; text: string }[]; offset: number }>()
const tone = (i: number) => (i + props.offset) % 4
</script>

<template>
  <div class="mt-7 grid gap-[14px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
    <div
      v-for="(n, i) in items"
      :key="n.title"
      data-reveal="up"
      :data-delay="i * 80"
      class="rounded-lg p-[22px] shadow-note"
      :class="NOTE_BG[tone(i)]"
      :style="{ transform: `rotate(${NOTE_TILT[tone(i)]}deg)` }"
    >
      <span class="font-serif text-[26px] font-black italic leading-none text-plum">{{ pad2(i + 1) }}</span>
      <h3 class="mt-[14px] font-display text-[19px] font-bold tracking-[-0.01em] text-ink">{{ n.title }}</h3>
      <p class="mt-2 text-[15px] leading-[1.55] text-text">{{ n.text }}</p>
    </div>
  </div>
</template>
