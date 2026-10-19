<script setup lang="ts">
interface HomeStat { value: string; suffix?: string; label: string; count?: boolean; decimals?: number }
interface HomeCard {
  kicker: string
  blurb: string
  chips: string[]
  stats: HomeStat[]
  // How the stats were measured (study stage, participants, tasks), shown under them.
  statsBasis?: string
  gradient: string[]
  image: string
  alt: string
}

const props = defineProps<{
  slug: string
  title: string
  card: HomeCard
  index: number
  total: number
}>()

const pad = (n: number) => String(n).padStart(2, '0')
// The first card is the capstone, so it gets the lavender accents.
const accent = props.index === 0
const last = props.index === props.total - 1
</script>

<template>
  <NuxtLink
    :to="`/projects/${slug}`"
    class="relative flex min-h-[min(74vh,640px)] origin-top flex-wrap overflow-hidden rounded-[28px] bg-ink text-white shadow-panel"
    style="transform: scale(calc(1 - var(--x,0) * 0.06))"
  >
    <div class="flex flex-[1_1_380px] flex-col justify-between gap-7 p-[clamp(26px,3.2vw,48px)]">
      <div>
        <div class="flex justify-between gap-3 font-mono text-[12px] uppercase tracking-[0.08em] text-on-dark-muted">
          <span>{{ pad(index + 1) }} / {{ pad(total) }}</span>
          <span :class="accent && 'text-lavender'">{{ card.kicker }}</span>
        </div>
        <h3 class="mt-7 font-display text-[clamp(28px,2.6vw,42px)] font-bold leading-[1.04] tracking-[-0.03em]">{{ title }}</h3>
        <p class="mt-[18px] max-w-[480px] text-[17px] leading-[1.55] text-on-dark [text-wrap:pretty]">{{ card.blurb }}</p>
        <div class="mt-5 flex flex-wrap gap-[6px]">
          <span
            v-for="chip in card.chips"
            :key="chip"
            class="rounded-full border border-white/20 px-[11px] py-[6px] font-mono text-[12px] uppercase tracking-[0.04em] text-[#EBE3F4]"
          >{{ chip }}</span>
        </div>
      </div>

      <div>
        <div class="flex gap-9 border-t border-white/[0.12] pt-[22px]">
          <div v-for="stat in card.stats" :key="stat.label">
            <p class="font-display text-stat-case font-bold leading-none tracking-[-0.03em] text-lavender">
              <span v-if="stat.count" :data-count="stat.value" :data-decimals="stat.decimals">{{ stat.value }}</span><template v-else>{{ stat.value }}</template>{{ stat.suffix }}
            </p>
            <p class="mt-[6px] text-[13px] text-on-dark-muted">{{ stat.label }}</p>
          </div>
        </div>
        <p v-if="card.statsBasis" class="mt-3 text-[13px] leading-[1.45] text-on-dark-muted">{{ card.statsBasis }}</p>
        <span class="mt-[26px] inline-flex items-center gap-3 text-[15px] font-semibold">
          Read the case study
          <span
            class="grid h-9 w-9 place-items-center rounded-full text-[16px] text-ink"
            :class="accent ? 'bg-lavender' : 'bg-white'"
          >→</span>
        </span>
      </div>
    </div>

    <div
      class="relative m-3 flex min-h-[320px] flex-[1.4_1_460px] items-center justify-center overflow-hidden rounded-[20px]"
      :style="{ background: `linear-gradient(160deg,${card.gradient[0]} 0%,${card.gradient[1]} 100%)` }"
    >
      <img
        data-enter
        :src="card.image"
        :alt="card.alt"
        class="block h-auto w-[88%]"
        :style="{ transform: 'translateY(calc(var(--c,0) * 40px))', filter: `drop-shadow(0 30px 40px rgba(0,0,0,${last ? 0.25 : 0.3}))` }"
      >
    </div>

    <!-- Darkens this card as the next one slides over it (--x). The last card is never covered. -->
    <div v-if="!last" class="pointer-events-none absolute inset-0 bg-ink" style="opacity: calc(var(--x,0) * 0.55)" />
  </NuxtLink>
</template>
