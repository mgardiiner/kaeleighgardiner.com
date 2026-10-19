<script setup lang="ts">
import aboutData from '~/data/about.json'

const off = aboutData.home.offClock
const TILT = [-4, 3, -2, 4, -3, 2]
</script>

<template>
  <section id="offclock" class="overflow-hidden bg-plum py-[clamp(96px,13vh,150px)] text-white">
    <div class="container-x flex flex-wrap items-end justify-between gap-6">
      <div>
        <p class="mono-label tracking-[0.1em] text-on-dark">(06) Off the clock</p>
        <h2 data-reveal="up" class="mt-[18px] max-w-[820px] font-display text-home-h2 font-bold leading-[1.04] tracking-[-0.04em]">
          <span class="font-serif italic tracking-[-0.02em] text-lavender">Still</span> designing.
        </h2>
        <p data-reveal="up" data-delay="100" class="mt-[18px] max-w-[560px] text-[18px] leading-[1.55] text-on-dark">{{ off.subheading }}</p>
      </div>
      <NuxtLink
        to="/projects/logo-designs"
        class="inline-flex items-center gap-[10px] rounded-xl bg-white px-[22px] py-[15px] text-[15px] font-semibold text-plum transition-colors hover:bg-[#F1EAF8]"
      >See the collection →</NuxtLink>
    </div>

    <!-- The strip drifts sideways as the section scrolls through (--e). -->
    <div data-enter class="mt-16">
      <div
        class="flex w-max gap-7 px-[clamp(20px,4.4vw,64px)] pb-2 pt-4"
        style="transform: translateX(calc((0.5 - var(--e,0.5)) * 320px))"
      >
        <div
          v-for="(t, i) in off.tiles"
          :key="t.image"
          data-reveal="up"
          :data-delay="i * 80"
          class="w-[clamp(200px,19vw,280px)] flex-none"
        >
          <div
            class="transition-transform duration-300 ease-fx hover:![transform:rotate(0deg)_scale(1.05)]"
            :style="{ transform: `rotate(${TILT[i % TILT.length]}deg)` }"
          >
            <img
              :src="t.image"
              :alt="t.alt"
              class="block aspect-square w-full rounded-[20px] border-8 border-white bg-white object-cover shadow-[0_20px_44px_rgba(20,8,36,0.35)]"
            >
          </div>
          <p class="mt-[18px] text-[15px] font-semibold">{{ t.title }}</p>
          <p class="mt-[2px] text-[14px] text-on-dark">{{ t.caption }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
