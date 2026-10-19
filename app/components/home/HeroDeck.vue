<script setup lang="ts">
import aboutData from '~/data/about.json'
import projectsData from '~/data/projects.json'

const hero = aboutData.home.hero

// Back-to-front. --p (0 → 1 while the hero is pinned) fans the deck out.
const POSES = [
  {
    transform: 'translate(calc(var(--p,1) * 14%), calc(-50% + var(--p,1) * 32%)) rotate(calc(7deg - var(--p,1) * 4deg)) scale(calc(0.9 + var(--p,1) * 0.02))',
    shadow: '0 30px 80px rgba(0,0,0,0.45)',
  },
  {
    transform: 'translate(calc(var(--p,1) * -14%), calc(-50% - var(--p,1) * 32%)) rotate(calc(-7deg + var(--p,1) * 4deg)) scale(calc(0.92 + var(--p,1) * 0.02))',
    shadow: '0 30px 80px rgba(0,0,0,0.45)',
  },
  {
    transform: 'translate(calc(var(--p,1) * 6%), -50%) scale(calc(1 + var(--p,1) * 0.04))',
    shadow: '0 40px 90px rgba(0,0,0,0.5)',
  },
]

const deck = hero.deck.map((d, i) => {
  const p = projectsData.find((x) => x.slug === d.slug)!
  return { ...d, title: p.title, image: p.homeCard!.image, gradient: p.homeCard!.gradient, ...POSES[i], front: i === hero.deck.length - 1 }
})
const lastLine = hero.headline.length - 1
</script>

<template>
  <!-- --p starts at 0 (page loads at the top) so the deck doesn't jump when the engine starts. -->
  <section id="top" data-progress class="relative h-[210vh] bg-ink text-white" style="--p: 0">
    <div data-sticky class="sticky top-0 flex h-screen min-h-[640px] items-center overflow-hidden">
      <div
        class="pointer-events-none absolute inset-0 bg-[size:64px_64px]"
        style="background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px); -webkit-mask-image: radial-gradient(ellipse 60% 70% at 72% 50%, #000 20%, transparent 75%); mask-image: radial-gradient(ellipse 60% 70% at 72% 50%, #000 20%, transparent 75%)"
      />
      <div
        class="pointer-events-none absolute right-[-200px] top-1/2 -mt-[450px] h-[900px] w-[900px]"
        style="background: radial-gradient(closest-side, rgba(126,92,168,0.8), rgba(83,58,113,0))"
      />

      <div
        data-fit
        class="container-x relative grid w-full items-center gap-12 pb-[72px] pt-[116px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]"
      >
        <div>
          <div data-reveal="fade" class="mb-7 flex items-center gap-4">
            <img
              :src="aboutData.photo"
              alt="Kaeleigh Gardiner"
              class="h-16 w-16 rounded-full border-[3px] border-lavender object-cover object-[center_28%] shadow-[0_0_0_6px_rgba(212,193,244,0.16)]"
            >
            <div>
              <p class="font-script text-[40px] leading-none text-lavender">{{ hero.greeting }}</p>
              <p class="mt-1 flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] text-on-dark">
                <span class="h-[7px] w-[7px] rounded-full bg-status-green shadow-[0_0_0_4px_rgba(155,227,164,0.2)]" />{{ hero.status }}
              </p>
            </div>
          </div>

          <h1 class="font-display text-hero-h1 font-extrabold leading-none tracking-[-0.04em]">
            <span v-for="(line, i) in hero.headline" :key="line" class="mask-line">
              <span
                data-reveal="mask"
                :data-delay="i ? i * 100 : undefined"
                class="block"
                :class="i === lastLine && 'font-serif text-[1.08em] font-bold italic tracking-[-0.02em] text-lavender'"
              >{{ line }}</span>
            </span>
          </h1>

          <p data-reveal="up" data-delay="360" class="mt-7 max-w-[500px] text-[clamp(16px,1.3vw,19px)] leading-[1.55] text-on-dark [text-wrap:pretty]">
            {{ hero.copy }}
          </p>

          <div data-reveal="up" data-delay="460" class="mt-9 flex flex-wrap gap-[10px]">
            <a
              href="#work"
              class="inline-flex items-center gap-[10px] rounded-xl bg-lavender px-6 py-4 text-[15px] font-semibold text-ink transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-lavender-hover"
            >See my work <span>↓</span></a>
            <a
              href="/resume.pdf"
              target="_blank"
              class="inline-flex items-center gap-[10px] rounded-xl border border-white/25 px-6 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-white/[0.08]"
            >Résumé (PDF)</a>
          </div>
        </div>

        <div data-reveal="scale" data-delay="200" class="relative h-[clamp(380px,62vh,600px)]">
          <!-- Stickers drift as the deck spreads (--p). The hover straightens the winner sticker. -->
          <div
            class="absolute right-[-1%] top-[-3%] z-[5] w-[clamp(96px,9vw,140px)] transition-transform duration-200 hover:![transform:scale(1.06)_rotate(0deg)]"
            style="transform: translateY(calc(var(--p,0) * -46px)) rotate(calc(10deg - var(--p,0) * 8deg))"
          >
            <img
              src="/images/projects/logo-uxdsa.png"
              alt="UXDSA sticker design"
              class="block aspect-square w-full rounded-[22px] border-[6px] border-white bg-white object-cover shadow-[0_16px_36px_rgba(0,0,0,0.35)]"
            >
            <span class="absolute bottom-[-14px] left-1/2 -translate-x-1/2 -rotate-[4deg] whitespace-nowrap rounded-[5px] bg-highlighter px-2 py-[5px] font-mono text-[12px] uppercase tracking-[0.06em] text-ink">Contest winner</span>
          </div>
          <div
            class="absolute bottom-[-1%] left-[-2%] z-[5] w-[clamp(90px,8.4vw,128px)]"
            style="transform: translateY(calc(var(--p,0) * 34px)) rotate(calc(-9deg + var(--p,0) * 6deg))"
          >
            <img
              src="/images/projects/illustration-moose.png"
              alt="Moose illustration"
              class="block aspect-square w-full rounded-full border-[6px] border-white bg-white object-cover shadow-[0_16px_36px_rgba(0,0,0,0.35)]"
            >
          </div>
          <span
            class="absolute bottom-[2%] right-[2%] z-[5] whitespace-nowrap rounded-full bg-white px-[15px] py-[9px] font-serif text-[clamp(15px,1.3vw,19px)] font-bold italic text-plum shadow-[0_12px_28px_rgba(0,0,0,0.3)]"
            style="transform: translateY(calc(var(--p,0) * 24px)) rotate(-6deg)"
          >illustrator on weekends</span>

          <div
            v-for="card in deck"
            :key="card.slug"
            class="absolute left-[8%] top-1/2 flex aspect-[1.5] w-[84%] items-center justify-center overflow-hidden rounded-[20px] p-[5%]"
            :style="{ background: `linear-gradient(160deg,${card.gradient[0]},${card.gradient[1]})`, boxShadow: card.shadow, transform: card.transform }"
          >
            <img :src="card.image" :alt="card.title" class="block h-auto w-full">
            <span
              class="absolute left-[14px] top-[14px] rounded-md px-[10px] py-[6px] font-mono text-[12px] uppercase tracking-[0.06em]"
              :class="card.front ? 'bg-lavender text-ink' : 'bg-ink/[0.85] text-white'"
            >{{ card.label }}</span>
          </div>
        </div>
      </div>

      <div data-pin-only class="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-[14px] font-mono text-[12px] uppercase tracking-[0.1em] text-on-dark-muted">
        <span>Scroll to spread the deck</span>
        <span class="relative h-[2px] w-[120px] overflow-hidden bg-white/[0.15]">
          <span class="absolute inset-0 origin-left bg-lavender" style="transform: scaleX(var(--p,1))" />
        </span>
      </div>
    </div>
  </section>
</template>
