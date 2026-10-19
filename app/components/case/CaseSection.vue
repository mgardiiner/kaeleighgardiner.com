<script setup lang="ts">
import { pad2, type CaseSection } from '~/utils/caseStudy'

defineProps<{ section: CaseSection; index: number }>()
</script>

<template>
  <section
    :id="section.id"
    :data-section="section.id"
    class="scroll-mt-24 py-16"
    :class="index > 0 && 'border-t-[1.5px] border-dashed border-ink/20'"
  >
    <div class="flex items-baseline gap-[14px]">
      <span class="font-serif text-[26px] font-black italic leading-none text-plum">{{ pad2(index + 1) }}</span>
      <span class="mono-label text-muted">{{ section.label }}</span>
    </div>
    <h2 data-reveal="up" class="mt-[14px] max-w-[780px] font-display text-case-h2 font-bold leading-[1.15] tracking-[-0.025em] text-ink [text-wrap:balance]">{{ section.title }}</h2>
    <p class="mt-3 max-w-[680px] text-[17px] leading-[1.5] text-text">
      <span class="marker">{{ section.tldr }}</span>
    </p>
    <CaseBlock v-for="(block, i) in section.blocks" :key="i" :block="block" />
  </section>
</template>
