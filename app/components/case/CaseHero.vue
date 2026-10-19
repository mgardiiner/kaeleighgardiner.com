<script setup lang="ts">
import aboutData from '~/data/about.json'
import { NOTE_BG, type CaseStudy } from '~/utils/caseStudy'

const props = defineProps<{ cs: CaseStudy }>()

const META_TILT = [-0.8, 0.6, -0.5, 0.8]
const COLLAGE_POSE = ['rotate(-7deg) translateY(8px)', 'rotate(4deg) translateY(-14px)', 'rotate(-3deg) translateY(10px)']

const hero = props.cs.hero
const lastLine = props.cs.title.length - 1
</script>

<template>
  <section id="top" data-section="intro" class="relative overflow-hidden bg-paper pb-6 pt-[136px]">
    <div class="container-x">
      <div data-reveal="fade" class="mono-label flex flex-wrap items-center gap-x-[14px] gap-y-[10px] tracking-[0.1em] text-muted">
        <NuxtLink to="/#work" class="text-text underline underline-offset-4">Work</NuxtLink>
        <template v-for="c in cs.crumbs" :key="c">
          <span aria-hidden="true">/</span>
          <span>{{ c }}</span>
        </template>
        <span class="rounded-[5px] bg-ink px-[9px] py-[5px] text-white">{{ cs.badge }}</span>
      </div>

      <div class="mt-7 flex flex-wrap items-center gap-x-14 gap-y-12">
        <div class="min-w-0 flex-[1.1_1_380px]">
          <h1 class="font-display text-case-h1 font-extrabold leading-[0.92] tracking-[-0.05em] text-ink">
            <span v-for="(line, i) in cs.title" :key="line" class="mask-line">
              <span data-reveal="mask" :data-delay="i ? 110 * i : undefined" class="block [text-wrap:balance]">
                <span v-if="i > 0" class="font-serif font-black italic tracking-[-0.03em] text-plum">{{ line }}</span>
                <template v-else>{{ line }}</template>
                <span
                  v-if="cs.note && i === lastLine"
                  class="ml-[0.2em] inline-block -rotate-6 align-middle font-script text-[clamp(22px,2vw,30px)] font-normal tracking-normal text-plum"
                >{{ cs.note }}</span>
              </span>
            </span>
          </h1>
          <p data-reveal="up" data-delay="220" class="mt-6 max-w-[720px] text-lede leading-[1.5] text-text [text-wrap:pretty]">{{ cs.lede }}</p>
          <div data-reveal="up" data-delay="300" class="mt-8 flex items-center gap-[14px]">
            <img
              :src="aboutData.photo"
              alt="Kaeleigh Gardiner"
              class="h-[52px] w-[52px] rounded-full border-[3px] border-white object-cover object-[center_28%] shadow-[0_6px_16px_rgba(36,22,58,0.15)]"
            >
            <div>
              <p class="text-[15px] font-bold">Kaeleigh Gardiner</p>
              <p class="mt-[2px] text-[14px] text-muted">{{ cs.byline }}</p>
            </div>
          </div>
        </div>

        <div class="min-w-0 flex-[1_1_340px] pt-7">
          <div
            data-reveal="up"
            data-delay="200"
            class="relative rotate-[1.2deg] rounded-[28px] shadow-panel"
            :class="'collage' in hero ? 'flex items-center justify-center gap-[4%] px-[6%] py-[8%]' : hero.style === 'flat' ? 'p-[7%]' : 'px-[7%] py-[4%]'"
            :style="{ background: `linear-gradient(160deg,${cs.gradient[0]},${cs.gradient[1]})` }"
          >
            <span class="tape top-[-14px] -ml-[75px] h-[30px] w-[150px] -rotate-3 bg-[rgba(194,181,214,0.85)]" />

            <template v-if="'collage' in hero">
              <div
                v-for="(src, i) in hero.collage"
                :key="src"
                class="flex aspect-square min-w-0 flex-[1_1_0] items-center justify-center rounded-2xl border-4 border-white bg-white p-[6%] shadow-[0_16px_34px_rgba(36,22,58,0.25)]"
                :style="{ transform: COLLAGE_POSE[i % COLLAGE_POSE.length] }"
              >
                <img :src="src" alt="" class="block max-h-full max-w-full object-contain">
              </div>
            </template>
            <img
              v-else
              data-enter
              :src="hero.image"
              :alt="hero.alt"
              class="block h-auto w-full"
              :class="hero.style === 'flat' && 'rounded-[14px] shadow-[0_18px_40px_rgba(36,22,58,0.25)]'"
              style="transform: translateY(calc(var(--c,0) * 24px))"
            >

            <div
              v-if="cs.sticker"
              class="absolute right-[3%] top-[-36px] flex aspect-square w-[clamp(104px,10vw,140px)] rotate-[10deg] flex-col items-center justify-center rounded-full border-4 border-white bg-highlighter text-center text-ink shadow-[0_12px_28px_rgba(36,22,58,0.25)]"
            >
              <span class="font-serif text-[clamp(26px,2.4vw,36px)] font-black italic leading-none">{{ cs.sticker.value }}</span>
              <span class="mt-1 font-mono text-[12px] uppercase leading-[1.3] tracking-[0.04em]">
                <template v-for="(l, i) in cs.sticker.label" :key="l"><br v-if="i">{{ l }}</template>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,190px),1fr))]">
        <div
          v-for="(m, i) in cs.meta"
          :key="m.label"
          data-reveal="up"
          :data-delay="340 + i * 60"
          class="rounded-lg px-[18px] py-4"
          :class="NOTE_BG[i]"
          :style="{ transform: `rotate(${META_TILT[i]}deg)` }"
        >
          <span class="mono-label text-plum">{{ m.label }}</span>
          <p class="mt-[6px] text-[16px] font-semibold">{{ m.value }}</p>
        </div>
        <div
          data-reveal="up"
          :data-delay="340 + cs.meta.length * 60"
          class="rounded-lg px-[18px] py-4"
          :class="NOTE_BG[cs.meta.length % 4]"
          :style="{ transform: `rotate(${META_TILT[cs.meta.length % 4]}deg)` }"
        >
          <span class="mono-label text-plum">Tools</span>
          <div class="mt-[6px] flex flex-wrap gap-[6px]">
            <span
              v-for="t in cs.tools"
              :key="t.name"
              class="inline-flex items-center gap-[7px] rounded-lg bg-white py-[5px] pl-[6px] pr-[10px] text-[14px] font-semibold"
            >
              <img :src="t.icon" alt="" class="block h-5 w-5 object-contain">{{ t.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
