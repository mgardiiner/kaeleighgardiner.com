<script setup lang="ts">
import aboutData from '~/data/about.json'

// "91.9%" → counts up to 91.9 (1 decimal) + suffix "%". "%" sits at half size,
// word suffixes (" mo", " /4.0") smaller still. `basis` says how a result was measured.
const stats = aboutData.credibility.map((c) => {
  const m = c.stat.match(/^([\d.]+)(.*)$/)
  const num = m?.[1] ?? c.stat
  const suffix = m?.[2] ?? ''
  const decimals = num.includes('.') ? num.split('.')[1]!.length : undefined
  return { ...c, num, decimals, suffix, small: !suffix.startsWith('%') }
})
</script>

<template>
  <section class="bg-paper pb-5 pt-[120px]">
    <div class="container-x">
      <p class="mono-label tracking-[0.1em] text-muted">(04) By the numbers</p>
      <div class="mt-9 grid gap-x-6 gap-y-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
        <div
          v-for="(s, i) in stats"
          :key="s.label"
          data-reveal="up"
          :data-delay="i ? i * 100 : undefined"
          class="border-t-2 border-ink pt-5"
        >
          <p class="font-display text-stat-home font-bold leading-none tracking-[-0.05em]">
            <span :data-count="s.num" :data-decimals="s.decimals">{{ s.num }}</span>
            <span class="tracking-normal" :class="s.small ? 'text-[0.4em]' : 'text-[0.5em]'">{{ s.suffix }}</span>
          </p>
          <p class="mt-3 text-[16px] leading-[1.45] text-muted">{{ s.label }}</p>
          <p v-if="s.basis" class="mt-2 text-[13px] leading-[1.45] text-muted">{{ s.basis }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
