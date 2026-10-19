<script setup lang="ts">
import aboutData from '~/data/about.json'
import experienceData from '~/data/experience.json'

const TYPE_BG: Record<string, string> = { 'Co-op': 'bg-lavender', Education: 'bg-lavender-2' }

const edu = aboutData.education
const rows = [
  ...experienceData.roles.map((r) => ({
    dates: `${r.startDate} – ${r.endDate}`,
    title: r.title,
    type: r.type,
    org: r.company,
    location: r.location,
    summary: r.summary ?? [],
  })),
  {
    dates: edu.years,
    title: edu.degree,
    type: 'Education',
    org: `${edu.institution} · GPA ${edu.gpa}`,
    location: edu.location,
    summary: [] as string[],
  },
]
</script>

<template>
  <section id="experience" class="bg-paper py-[120px]">
    <div class="container-x">
      <div class="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p class="mono-label tracking-[0.1em] text-muted">(05) Experience</p>
          <h2 data-reveal="up" class="mt-[18px] font-display text-home-h2 font-bold leading-[1.04] tracking-[-0.04em]">Where I've worked</h2>
        </div>
        <a
          href="/resume.pdf"
          target="_blank"
          class="inline-flex items-center gap-[10px] rounded-xl border-[1.5px] border-ink px-5 py-[14px] text-[15px] font-semibold transition-colors hover:bg-ink hover:text-white"
        >Full résumé (PDF) ↓</a>
      </div>

      <div
        v-for="(r, i) in rows"
        :key="r.title"
        data-reveal="up"
        class="flex flex-wrap gap-x-8 gap-y-3 rounded px-6 py-[30px] transition-colors duration-[250ms] hover:bg-white border-t border-ink/[0.16]"
        :class="i === rows.length - 1 && 'border-b'"
      >
        <p class="flex-[0_0_150px] pt-[6px] font-mono text-[13px] text-muted">{{ r.dates }}</p>
        <div class="flex-[1_1_380px]">
          <h3 class="font-display text-[clamp(22px,2vw,30px)] font-bold tracking-[-0.02em]">
            {{ r.title }}
            <span
              class="ml-2 rounded-[5px] px-2 py-1 align-middle font-mono text-[12px] font-medium uppercase tracking-[0.06em]"
              :class="TYPE_BG[r.type] ?? 'bg-[#EDE4F7]'"
            >{{ r.type }}</span>
          </h3>
          <p class="mt-[6px] text-[16px] text-text">{{ r.org }}</p>
          <ul v-if="r.summary.length" class="mt-4 flex max-w-[680px] list-disc flex-col gap-[6px] pl-[18px] text-[15px] leading-[1.6] text-text">
            <li v-for="b in r.summary" :key="b">{{ b }}</li>
          </ul>
        </div>
        <p class="flex-[0_1_180px] pt-[6px] text-[14px] text-muted">{{ r.location }}</p>
      </div>
    </div>
  </section>
</template>
