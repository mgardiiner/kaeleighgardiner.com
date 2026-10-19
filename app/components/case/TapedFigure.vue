<script setup lang="ts">
import type { FigureItem } from '~/utils/caseStudy'

// A screenshot "taped" to the page with a handwritten caption. The parent sets
// the top margin; a maxWidth centres it.
defineProps<{ figure: FigureItem; tilt: number; maxWidth?: number }>()
</script>

<template>
  <figure
    data-reveal="up"
    class="relative rounded-[10px] bg-white px-3 pb-2 pt-3 shadow-taped"
    :class="maxWidth && 'mx-auto'"
    :style="{ transform: `rotate(${tilt}deg)`, maxWidth: maxWidth ? `${maxWidth}px` : undefined }"
  >
    <span class="tape top-[-13px] -ml-[60px] h-[26px] w-[120px] -rotate-2" />
    <img :src="figure.src" :alt="figure.alt" class="block h-auto w-full rounded-md" loading="lazy">
    <figcaption class="px-[6px] pt-2 font-script text-[24px] leading-[1.3] text-plum">{{ figure.caption }}</figcaption>
  </figure>
</template>
