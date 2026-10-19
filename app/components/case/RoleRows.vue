<script setup lang="ts">
import { pad2, type RowItem } from '~/utils/caseStudy'

// Ruled rows with a number or arrow marker. A `lead` row gets the "Lead" tag
// and a handwritten "the part I led".
defineProps<{ block: { marker: 'number' | 'arrow'; items: RowItem[] } }>()
</script>

<template>
  <div class="mt-6">
    <div
      v-for="(r, i) in block.items"
      :key="r.title"
      data-reveal="up"
      class="flex items-start gap-[18px] border-t border-ink/[0.14] py-[18px]"
      :class="i === block.items.length - 1 && 'border-b'"
    >
      <span
        class="flex-[0_0_26px] font-mono text-[12px] text-plum"
        :class="block.marker === 'arrow' ? 'pt-1' : 'pt-[5px]'"
        aria-hidden="true"
      >{{ block.marker === 'arrow' ? '→' : pad2(i + 1) }}</span>
      <div class="min-w-0 flex-1">
        <h3 class="flex flex-wrap items-center gap-[10px] font-display text-[18px] font-bold tracking-[-0.01em] text-ink">
          {{ r.title }}
          <template v-if="r.lead">
            <span class="rounded-[5px] bg-lavender px-2 py-1 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-ink">Lead</span>
            <span class="-rotate-3 font-script text-[24px] font-normal leading-none text-plum">the part I led</span>
          </template>
        </h3>
        <p class="mt-[6px] text-[16px] leading-[1.55] text-text">{{ r.text }}</p>
      </div>
    </div>
  </div>
</template>
