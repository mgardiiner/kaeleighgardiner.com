<script setup lang="ts">
import type { FigureItem } from '~/utils/caseStudy'

// Stacked taped figures, alternating tilt, each with optional text below.
// `lg` spacing is the roomier GRCOA layout.
const props = defineProps<{ block: { spacing?: 'md' | 'lg'; maxWidth?: number; items: FigureItem[] } }>()
const lg = props.block.spacing === 'lg'
</script>

<template>
  <div>
    <div v-for="(f, i) in block.items" :key="f.src" :class="i === 0 ? 'mt-7' : lg ? 'mt-11' : 'mt-10'">
      <TapedFigure :figure="f" :tilt="i % 2 ? 0.6 : -0.6" :max-width="block.maxWidth" :class="lg ? 'mt-8' : 'mt-6'" />
      <p
        v-if="f.text"
        class="max-w-[680px] text-[16px] leading-[1.55] text-text"
        :class="lg ? 'mt-2' : 'mt-[10px]'"
      >{{ f.text }}</p>
    </div>
  </div>
</template>
