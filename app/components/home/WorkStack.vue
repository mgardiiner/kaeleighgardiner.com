<script setup lang="ts">
import projectsData from '~/data/projects.json'

const cards = projectsData.filter((p) => p.homeCard)
</script>

<template>
  <section id="work" class="bg-paper pb-[100px] pt-10">
    <div class="container-x">
      <div class="mb-12 flex flex-wrap items-end justify-between gap-6 border-t border-ink/[0.14] pt-7">
        <div>
          <p class="mono-label tracking-[0.1em] text-muted">(02) Selected work · 2023–2026</p>
          <h2 data-reveal="up" class="mt-[18px] max-w-[900px] font-display text-home-h2 font-bold leading-[1.02] tracking-[-0.035em]">Selected&nbsp;work</h2>
        </div>
        <span class="font-display text-[clamp(40px,4vw,64px)] font-extrabold leading-[0.8] tracking-[-0.05em] text-lavender-2">{{ String(cards.length).padStart(2, '0') }}</span>
      </div>

      <div data-stack class="flex flex-col gap-[6vh] pb-[4vh]">
        <!-- top is inline: useScrollFx reads it as each card's base sticky offset. -->
        <div
          v-for="(p, i) in cards"
          :key="p.slug"
          data-stack-card
          class="sticky"
          :style="{ top: `${92 + i * 16}px` }"
        >
          <WorkStackCard :slug="p.slug" :title="p.title" :card="p.homeCard!" :index="i" :total="cards.length" />
        </div>
      </div>
    </div>
  </section>
</template>
