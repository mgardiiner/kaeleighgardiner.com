<script setup lang="ts">
import aboutData from '~/data/about.json'

useSeoMeta({
  title: 'Kaeleigh Gardiner — UX Designer',
  description: aboutData.heroCopy,
  ogTitle: 'Kaeleigh Gardiner — UX Designer',
  ogDescription: aboutData.heroCopy,
})

// The scroll engine scans everything inside this root for data-* hooks.
const root = ref<HTMLElement | null>(null)
useScrollFx(root)
</script>

<template>
  <div ref="root">
    <SiteHeader variant="home" />
    <HeroDeck />
    <SkillsMarquee />
    <AboutBlock />
    <WorkStack />
    <ProcessPinned />
    <StatsRow />
    <ExperienceList />
    <OffTheClock />
    <TestimonialFill />
    <ContactBlock />
  </div>
</template>
