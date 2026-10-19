<script setup lang="ts">
import aboutData from '~/data/about.json'

const steps = aboutData.howIWorkSteps
const headline = aboutData.howIWorkHeadline.split('\n')
// --on / --past are set per step by useScrollFx; these fallbacks show step 1 before it runs.
const on = (i: number) => (i === 0 ? 1 : 0)
</script>

<template>
  <section id="process" data-progress :data-steps="steps.length" class="relative h-[380vh] bg-ink text-white">
    <div data-sticky class="sticky top-0 flex h-screen min-h-[680px] items-center overflow-hidden">
      <div
        class="pointer-events-none absolute bottom-[-400px] left-[-300px] h-[900px] w-[900px]"
        style="background: radial-gradient(closest-side, rgba(83,58,113,0.6), rgba(83,58,113,0))"
      />

      <div data-fit class="container-x relative flex w-full flex-wrap items-center gap-x-[72px] gap-y-10 pb-12 pt-24">
        <div class="flex-[1_1_400px]">
          <p class="mono-label tracking-[0.1em] text-on-dark-muted">(03) How I work</p>
          <h2 class="mt-[18px] font-display text-[clamp(30px,3.2vw,48px)] font-bold leading-[1.04] tracking-[-0.04em]">
            <template v-for="(line, i) in headline" :key="i"><br v-if="i">{{ line }}</template>
          </h2>
          <div
            class="relative mt-7 h-[clamp(120px,14vw,210px)] font-serif text-[clamp(120px,14vw,210px)] font-black italic leading-none tracking-[-0.03em] text-lavender"
            aria-hidden="true"
          >
            <span
              v-for="(s, i) in steps"
              :key="s.n"
              :data-step="i"
              class="absolute left-0 top-0"
              :style="{
                opacity: `var(--on,${on(i)})`,
                transform: `translateY(calc((1 - var(--on,${on(i)})) * 40px))`,
                transition: 'opacity .5s, transform .6s cubic-bezier(.16,.84,.24,1)',
              }"
            >{{ s.n }}</span>
          </div>
        </div>

        <div class="relative flex-[1.2_1_460px] pl-8">
          <div class="absolute bottom-2 left-0 top-2 w-[2px] bg-white/[0.12]">
            <div class="absolute inset-0 origin-top bg-lavender" style="transform: scaleY(var(--p,1))" />
          </div>
          <div
            v-for="(s, i) in steps"
            :key="s.n"
            :data-step="i"
            data-step-expand
            class="py-[22px] transition-opacity duration-[400ms]"
            :class="i < steps.length - 1 && 'border-b border-white/10'"
            style="opacity: calc(0.3 + var(--past,1) * 0.25 + var(--on,1) * 0.45)"
          >
            <div class="flex items-baseline gap-4">
              <span class="font-mono text-[12px] text-lavender">{{ s.n }}</span>
              <h3 class="font-display text-[clamp(22px,2vw,30px)] font-bold tracking-[-0.02em]">{{ s.title }}</h3>
            </div>
            <div
              class="overflow-hidden"
              style="max-height: calc(var(--on,1) * 220px); opacity: var(--on,1); transition: max-height .5s cubic-bezier(.16,.84,.24,1), opacity .4s"
            >
              <p class="mt-3 max-w-[520px] text-[17px] leading-[1.55] text-on-dark">{{ s.desc }}</p>
              <p class="mt-[14px] font-mono text-[12px] tracking-[0.04em] text-on-dark-muted">{{ s.methods }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
