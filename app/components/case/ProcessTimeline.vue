<script setup lang="ts">
import { pad2 } from '~/utils/caseStudy'

// Pinned phase timeline: as the block scrolls through, --p fills the line and
// useScrollFx sets --on (current phase) / --past (reached) on each [data-step].
defineProps<{ steps: { name: string; text: string; methods: string }[] }>()

// Fallbacks before the engine runs: every dot filled, first phase showing.
const on = (i: number) => (i === 0 ? 1 : 0)
</script>

<template>
  <div data-progress :data-steps="steps.length" class="relative h-[230vh]">
    <div data-sticky class="sticky top-0 flex h-screen items-center">
      <div data-fit class="w-full pb-[30px] pt-[90px]">
        <div class="rounded-3xl bg-plum p-[clamp(22px,3vw,40px)] text-white">
          <div class="relative">
            <div class="absolute inset-x-0 top-[9px] h-[2px] bg-white/[0.18]">
              <div class="absolute inset-0 origin-left bg-lavender" style="transform: scaleX(var(--p,1))" />
            </div>
            <div class="grid gap-[10px]" :style="{ gridTemplateColumns: `repeat(${steps.length},minmax(0,1fr))` }">
              <div v-for="(s, i) in steps" :key="s.name" :data-step="i">
                <span
                  class="block h-5 w-5 rounded-full border-2 border-lavender bg-plum"
                  style="box-shadow: inset 0 0 0 4px #533A71, inset 0 0 0 10px rgba(212,193,244,calc(var(--past,1)))"
                />
                <p
                  class="mt-[14px] font-display text-[clamp(13px,1.3vw,17px)] font-bold tracking-[-0.01em] transition-opacity duration-[400ms]"
                  style="opacity: calc(0.4 + var(--past,1) * 0.6)"
                >{{ s.name }}</p>
              </div>
            </div>
          </div>

          <div class="mt-9 grid">
            <div
              v-for="(s, i) in steps"
              :key="s.name"
              :data-step="i"
              class="flex flex-wrap items-start gap-x-9 gap-y-4 [grid-area:1/1]"
              :style="{
                opacity: `var(--on,${on(i)})`,
                transform: `translateY(calc((1 - var(--on,${on(i)})) * 20px))`,
                transition: 'opacity .45s, transform .6s cubic-bezier(.16,.84,.24,1)',
              }"
            >
              <span class="font-serif text-numeral font-black italic leading-[0.9] text-lavender">{{ pad2(i + 1) }}</span>
              <div class="min-w-0 flex-[1_1_280px]">
                <p class="text-[clamp(16px,1.3vw,18px)] leading-[1.55] text-[#F3ECFB]">{{ s.text }}</p>
                <p class="mt-[14px] font-mono text-[12px] tracking-[0.04em] text-on-dark-muted">{{ s.methods }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
