<script setup lang="ts">
import aboutData from '~/data/about.json'
import type { CaseStudy } from '~/utils/caseStudy'

// Dark footer: a teaser for the next project in the loop, then contact links.
defineProps<{ nextSlug: string; nextTitle: string; next: CaseStudy }>()
</script>

<template>
  <section class="relative overflow-hidden bg-ink pb-8 pt-[clamp(72px,10vh,110px)] text-white">
    <div
      class="pointer-events-none absolute right-[-300px] top-[-300px] h-[1000px] w-[1000px]"
      style="background: radial-gradient(closest-side, rgba(126,92,168,0.6), rgba(83,58,113,0))"
    />
    <div class="container-x relative">
      <NuxtLink
        :to="`/projects/${nextSlug}`"
        class="flex flex-wrap items-center gap-x-12 gap-y-7 border-b border-white/[0.12] pb-14 transition-opacity hover:opacity-[0.92]"
      >
        <div class="flex-[1_1_380px]">
          <span class="mono-label text-on-dark-muted">{{ next.teaser.kicker }}</span>
          <h2 class="mt-4 font-display text-[clamp(26px,2.8vw,40px)] font-extrabold leading-[1.08] tracking-[-0.03em]">
            {{ next.teaser.title ?? nextTitle }} <span class="text-lavender">→</span>
          </h2>
        </div>
        <div
          class="flex flex-[1_1_320px] justify-center rounded-[20px]"
          :class="next.teaser.style === 'flat' ? 'max-h-[360px] items-center overflow-hidden p-[6%]' : 'p-[4%]'"
          :style="{ background: `linear-gradient(160deg,${next.gradient[0]},${next.gradient[1]})` }"
        >
          <img
            :src="next.teaser.image"
            :alt="next.teaser.title ?? nextTitle"
            class="block"
            :class="next.teaser.style === 'flat' ? 'max-h-[280px] max-w-[80%] rounded-xl shadow-[0_14px_30px_rgba(0,0,0,0.2)]' : 'h-auto w-[90%]'"
            loading="lazy"
          >
        </div>
      </NuxtLink>

      <div class="flex flex-wrap items-center justify-between gap-6 pt-10">
        <div>
          <p class="font-script text-[36px] leading-[1.1] text-lavender">Thanks for reading!</p>
          <p class="mt-[6px] text-[16px] text-on-dark">{{ aboutData.home.contact.line }}</p>
        </div>
        <div class="flex flex-wrap gap-[10px]">
          <CopyEmailButton class="rounded-xl px-4 py-[14px]" />
          <a
            :href="`mailto:${aboutData.email}`"
            class="inline-flex items-center rounded-xl bg-lavender px-[22px] py-[15px] text-[15px] font-semibold text-ink transition-colors hover:bg-lavender-hover"
          >Email me</a>
          <a
            href="/resume.pdf"
            target="_blank"
            class="inline-flex items-center rounded-xl border border-white/25 px-[22px] py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-white/[0.08]"
          >Résumé (PDF) ↓</a>
        </div>
      </div>

      <SiteFooter back-to="/" back-label="Back to home" class="mt-[72px]" />
    </div>
  </section>
</template>
