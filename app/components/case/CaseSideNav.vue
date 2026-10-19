<script setup lang="ts">
import { pad2 } from '~/utils/caseStudy'

const props = defineProps<{
  items: { id: string; label: string }[]
  current: string | null
  prototypeUrl?: string
}>()

// Active = plum pill; sections already read = ink; the rest muted.
const activeIndex = computed(() => props.items.findIndex((n) => n.id === props.current))
</script>

<template>
  <aside class="sticky top-[100px] hidden flex-[0_0_200px] self-start pt-16 toc:block">
    <p class="font-script text-[30px] leading-none text-plum">Contents</p>
    <nav class="mt-[14px] flex flex-col gap-[2px]" aria-label="Contents">
      <a
        v-for="(it, i) in items"
        :key="it.id"
        :href="`#${it.id}`"
        class="flex items-center gap-[10px] rounded-[10px] px-3 py-[7px] text-[14px] font-semibold transition-colors duration-[250ms]"
        :class="i === activeIndex ? 'bg-plum text-white' : i < activeIndex ? 'text-ink' : 'text-muted'"
        :aria-current="i === activeIndex ? 'location' : undefined"
      >
        <span class="font-mono text-[12px] opacity-70">{{ pad2(i + 1) }}</span>
        <span>{{ it.label }}</span>
      </a>
    </nav>
    <a
      v-if="prototypeUrl"
      :href="prototypeUrl"
      target="_blank"
      rel="noopener"
      class="mt-5 flex items-center justify-between rounded-xl border-[1.5px] border-ink px-[14px] py-3 text-[14px] font-semibold transition-colors hover:bg-ink hover:text-white"
    >Open prototype <span>↗</span></a>
  </aside>
</template>
