<script setup lang="ts">
import projectsData from '~/data/projects.json'
import type { CaseStudy } from '~/utils/caseStudy'

const route = useRoute()
const project = projectsData.find((p) => p.slug === route.params.slug)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

// Search engines truncate past ~160 characters, so cut on a word boundary.
const metaDescription = (() => {
  const raw = String(project.description ?? '').replace(/\s+/g, ' ').trim()
  if (raw.length <= 160) return raw
  return `${raw.slice(0, 157).replace(/\s+\S*$/, '')}…`
})()

useSeoMeta({
  title: `${project.title} · Kaeleigh Gardiner`,
  description: metaDescription,
  ogTitle: `${project.title} · Kaeleigh Gardiner`,
  ogDescription: metaDescription,
})

const cs = project.caseStudy as CaseStudy
const next = projectsData.find((p) => p.slug === project.nextSlug)
// Logo Designs and Illustrations are a single full-width gallery with no contents nav.
const isGallery = cs.sections.some((s) => s.blocks.some((b) => b.type === 'gallery'))
const navItems = cs.sections.map(({ id, label }) => ({ id, label }))

// The section in view drives the side nav highlight and the header capsule.
const currentSection = ref<string | null>(null)
const sectionLabel = computed(() => navItems.find((n) => n.id === currentSection.value)?.label ?? 'Intro')

const root = ref<HTMLElement | null>(null)
useScrollFx(root, { onSection: (id) => { currentSection.value = id } })
</script>

<template>
  <div ref="root">
    <SiteHeader variant="case" :project-label="cs.label" :section-label="sectionLabel" />
    <CaseHero :cs="cs" />

    <div class="bg-paper">
      <div class="container-x" :class="isGallery ? 'pb-24' : 'flex items-start gap-14 pb-20'">
        <CaseSideNav v-if="!isGallery" :items="navItems" :current="currentSection" :prototype-url="project.prototypeUrl || undefined" />
        <main :class="!isGallery && 'min-w-0 max-w-[900px] flex-[1_1_0]'">
          <CaseSection v-for="(s, i) in cs.sections" :key="s.id" :section="s" :index="i" />
        </main>
      </div>
    </div>

    <CaseFooterNext v-if="next" :next-slug="next.slug" :next-title="next.title" :next="next.caseStudy as CaseStudy" />
  </div>
</template>
