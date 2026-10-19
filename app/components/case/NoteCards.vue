<script setup lang="ts">
import { NOTE_BG, NOTE_TILT, type NoteItem } from '~/utils/caseStudy'

const props = defineProps<{ block: { size: 'md' | 'lg'; offset?: number; items: NoteItem[] } }>()

const lg = props.block.size === 'lg'
const tone = (i: number) => (i + (props.block.offset ?? 0)) % 4
</script>

<template>
  <div
    class="mt-7 grid"
    :class="lg ? 'gap-[14px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]' : 'gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr))]'"
  >
    <div
      v-for="(n, i) in block.items"
      :key="n.label"
      data-reveal="up"
      :data-delay="i * 80"
      class="rounded-lg shadow-note"
      :class="[lg ? 'p-[22px]' : 'p-5', n.dark ? 'bg-ink text-white' : NOTE_BG[tone(i)]]"
      :style="{ transform: `rotate(${NOTE_TILT[tone(i)]}deg)` }"
    >
      <span class="mono-label" :class="n.dark ? 'text-lavender' : 'text-plum'">{{ n.label }}</span>
      <template v-if="n.dark && n.count">
        <p class="mt-[10px] font-serif text-[40px] font-black italic leading-none text-lavender">
          <span :data-count="n.count">{{ n.count }}</span>{{ n.suffix }}
        </p>
        <p class="mt-2 text-[15px] leading-[1.5] text-on-dark">{{ n.text }}</p>
      </template>
      <p
        v-else
        :class="[lg ? 'mt-3 text-[17px] leading-[1.5]' : 'mt-[10px] text-[16px] leading-[1.55]', n.dark ? 'text-on-dark' : 'text-ink']"
      >{{ n.text }}</p>
    </div>
  </div>
</template>
