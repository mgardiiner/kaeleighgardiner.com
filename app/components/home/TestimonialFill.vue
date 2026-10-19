<script setup lang="ts">
import aboutData from '~/data/about.json'

const t = aboutData.testimonials[0]!
const initials = t.name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()
</script>

<template>
  <section class="bg-lavender-2 py-[clamp(96px,14vh,160px)] text-ink">
    <div class="container-x flex flex-wrap gap-x-12 gap-y-6">
      <p class="mono-label flex-[1_1_180px] pt-[14px] tracking-[0.1em] text-text">(07) In their words</p>
      <figure class="flex-[4_1_560px]">
        <blockquote data-enter class="max-w-[900px] font-display text-[clamp(22px,2.3vw,34px)] font-semibold leading-[1.25] tracking-[-0.02em]">
          <span class="scroll-fill [--fill-faded:rgba(36,22,58,0.22)]">“{{ t.quote }}”</span>
        </blockquote>
        <figcaption class="mt-9 flex items-center gap-[14px]">
          <span class="grid h-11 w-11 place-items-center rounded-full bg-ink font-display text-[15px] font-extrabold text-lavender" aria-hidden="true">{{ initials }}</span>
          <div>
            <p class="text-[16px] font-bold">{{ t.name }}</p>
            <p class="mt-[2px] text-[14px] text-text">{{ t.title }}</p>
          </div>
        </figcaption>
      </figure>
    </div>
  </section>
</template>
