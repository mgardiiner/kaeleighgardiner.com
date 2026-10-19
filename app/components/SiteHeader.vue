<script setup lang="ts">
import aboutData from '~/data/about.json'

// Floating nav capsule. `home` shows the section links; `case` shows a back
// link plus "<project label> • <current section>".
withDefaults(defineProps<{
  variant?: 'home' | 'case'
  projectLabel?: string
  sectionLabel?: string
}>(), { variant: 'home', projectLabel: '', sectionLabel: 'Intro' })

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]
</script>

<template>
  <header class="pointer-events-none fixed inset-x-0 top-[14px] z-[60] flex justify-center px-[14px]">
    <nav
      class="pointer-events-auto relative flex w-full max-w-[1180px] items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/10 p-[9px] text-white backdrop-blur-[14px]"
      :class="variant === 'home' ? 'bg-ink/80 pl-[14px]' : 'bg-ink/[0.84] pl-[10px]'"
      aria-label="Main"
    >
      <template v-if="variant === 'home'">
        <a href="#top" class="flex items-center gap-[10px] text-white">
          <img :src="aboutData.photo" alt="" class="h-[34px] w-[34px] rounded-full border-2 border-lavender object-cover object-[center_28%]">
          <!-- Scales down under ~450px so name + "Email me" fit one line on phones. -->
          <span class="whitespace-nowrap pt-1 font-script text-[clamp(22px,6vw,27px)] leading-none">Kaeleigh Gardiner</span>
        </a>
        <div class="hidden items-center gap-[2px] nav:flex">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="rounded-[10px] px-[14px] py-[9px] text-[14px] font-medium text-on-dark transition-colors hover:bg-white/[0.08] hover:text-white"
          >{{ link.label }}</a>
        </div>
        <div class="flex items-center gap-[6px]">
          <a href="/resume.pdf" target="_blank" rel="noopener" class="hidden rounded-[10px] px-[14px] py-[10px] text-[14px] font-semibold text-white transition-colors hover:bg-white/[0.08] nav:inline-block">Résumé</a>
          <a :href="`mailto:${aboutData.email}`" class="whitespace-nowrap rounded-[10px] bg-lavender px-4 py-[10px] text-[14px] font-semibold text-ink transition-colors hover:bg-lavender-hover">Email me</a>
        </div>
      </template>

      <template v-else>
        <NuxtLink to="/#work" class="flex items-center gap-[10px] rounded-[10px] py-[5px] pl-[5px] pr-3 text-white transition-colors hover:bg-white/[0.08]">
          <img :src="aboutData.photo" alt="" class="h-8 w-8 rounded-full border-2 border-lavender object-cover object-[center_28%]">
          <span class="text-[14px] font-semibold">← All work</span>
        </NuxtLink>
        <div class="mono-label hidden items-center gap-[10px] tracking-[0.06em] text-on-dark-muted toc:flex">
          <span>{{ projectLabel }}</span>
          <span class="h-1 w-1 rounded-full bg-muted" aria-hidden="true" />
          <span class="text-lavender">{{ sectionLabel }}</span>
        </div>
        <a :href="`mailto:${aboutData.email}`" class="whitespace-nowrap rounded-[10px] bg-lavender px-4 py-[10px] text-[14px] font-semibold text-ink transition-colors hover:bg-lavender-hover">Email me</a>
      </template>

      <span data-page-progress class="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-lavender" aria-hidden="true" />
    </nav>
  </header>
</template>
