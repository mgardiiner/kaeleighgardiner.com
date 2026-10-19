<script setup lang="ts">
import aboutData from '~/data/about.json'

const contact = aboutData.home.contact
</script>

<template>
  <section id="contact" class="relative overflow-hidden bg-ink pb-9 pt-[110px] text-white">
    <div
      class="pointer-events-none absolute right-[-300px] top-[-200px] h-[1100px] w-[1100px]"
      style="background: radial-gradient(closest-side, rgba(83,58,113,0.6), rgba(83,58,113,0))"
    />
    <div class="container-x relative">
      <div class="mono-label flex flex-wrap justify-between gap-3 tracking-[0.1em] text-on-dark-muted">
        <span>(08) Contact</span>
        <span class="flex items-center gap-[10px] text-on-dark">
          <span class="h-2 w-2 rounded-full bg-lavender shadow-[0_0_0_5px_rgba(212,193,244,0.18)]" />{{ contact.status }}
        </span>
      </div>

      <h2 data-reveal="up" class="mt-7 font-display text-[clamp(34px,3.6vw,56px)] font-bold leading-none tracking-[-0.04em] text-white">
        Let's <span class="font-serif italic tracking-[-0.02em] text-lavender">talk.</span>
      </h2>

      <div class="mt-7 flex flex-wrap items-end justify-between gap-10">
        <p data-reveal="up" class="max-w-[520px] flex-[1_1_360px] text-lede leading-[1.55] text-on-dark [text-wrap:pretty]">
          {{ contact.line }}
          <span class="mt-[18px] block font-script text-[40px] leading-none text-lavender">Kaeleigh</span>
        </p>
        <div data-reveal="up" data-delay="120" class="flex flex-[1_1_420px] flex-col items-start gap-[18px]">
          <div class="flex flex-wrap items-center gap-3">
            <a
              :href="`mailto:${aboutData.email}`"
              class="border-b-2 border-lavender pb-1 font-display text-[clamp(22px,2.4vw,36px)] font-semibold tracking-[-0.02em] text-white transition-colors hover:text-lavender"
            >{{ aboutData.email }}</a>
            <CopyEmailButton class="rounded-[10px] px-[14px] py-[10px]" />
          </div>
          <div class="flex flex-wrap gap-[10px]">
            <a
              :href="aboutData.linkedin"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-[10px] rounded-xl bg-lavender px-[22px] py-[15px] text-[15px] font-semibold text-ink transition-colors hover:bg-lavender-hover"
            >LinkedIn ↗</a>
            <a
              href="/resume.pdf"
              target="_blank"
              class="inline-flex items-center gap-[10px] rounded-xl border border-white/25 px-[22px] py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-white/[0.08]"
            >Résumé (PDF) ↓</a>
          </div>
        </div>
      </div>

      <SiteFooter back-to="#top" back-label="Back to top ↑" class="mt-[88px]" />
    </div>
  </section>
</template>
