<script setup lang="ts">
import aboutData from '~/data/about.json'
</script>

<template>
  <section id="about" class="bg-paper pb-[clamp(72px,10vh,120px)] pt-[clamp(96px,14vh,160px)]">
    <div class="container-x flex flex-wrap gap-x-12 gap-y-6">
      <div class="max-w-[380px] flex-[1_1_260px]">
        <p class="mono-label pt-[14px] tracking-[0.1em] text-muted">(01) About</p>
        <div data-reveal="up" class="relative mt-7 -rotate-[2.5deg]">
          <img
            :src="aboutData.photo"
            alt="Kaeleigh Gardiner"
            class="block aspect-[4/5] w-full rounded-3xl border-8 border-white object-cover object-[center_26%] shadow-[0_24px_50px_rgba(83,58,113,0.22)]"
          >
          <span class="tape top-[-14px] -ml-12 h-7 w-24 rotate-[3deg] bg-[rgba(194,181,214,0.75)]" />
          <span class="absolute bottom-7 right-[-12px] rotate-[5deg] rounded-xl bg-white px-4 pb-[6px] pt-[10px] font-script text-[30px] leading-none text-plum shadow-[0_10px_24px_rgba(83,58,113,0.2)]">that's me!</span>
        </div>
      </div>

      <div class="flex-[3_1_520px]">
        <p data-enter class="font-display text-[clamp(24px,2.6vw,40px)] font-semibold leading-[1.2] tracking-[-0.025em]">
          <span class="scroll-fill">{{ aboutData.home.about }}</span>
        </p>
        <div class="mt-16 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
          <div
            v-for="(item, i) in aboutData.whatIDo"
            :key="item.title"
            data-reveal="up"
            :data-delay="i ? i * 100 : undefined"
            class="rounded-[18px] p-[26px]"
            :class="item.bg"
          >
            <p class="font-mono text-[12px] uppercase tracking-[0.08em] text-plum">{{ item.title }}</p>
            <p class="mt-3 text-[16px] leading-[1.55] text-text">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
