<script setup lang="ts">
import projectsData from '~/data/projects.json'
import { renderHtml } from '~/utils/renderHtml'

const route = useRoute()
const project = projectsData.find((p: any) => p.slug === route.params.slug) as any

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const heroImage = project.heroImage || project.thumbnail
const gradientFrom = project.heroGradient?.from ?? '#A799B7'
const gradientTo   = project.heroGradient?.to   ?? '#533A71'
const stripeColor  = gradientTo

const isCaseStudy = project.pageLayout === 'case-study'

const moreProjects = projectsData.filter((p: any) => p.slug !== project.slug).slice(0, 3)
</script>

<template>
  <div>

    <!-- 1. Hero band -->
    <ProjectHeroBand :title="project.title" :year="project.year" :stripe-color="stripeColor" />

    <!-- 2. Gradient screenshot band -->
    <div
      class="w-full flex items-center justify-center px-6 min-h-[320px] md:min-h-[560px] lg:min-h-[800px]"
      :style="{ background: `linear-gradient(180deg, ${gradientFrom} 0%, ${gradientTo} 91%)` }"
    >
      <img
        v-if="heroImage"
        :src="heroImage"
        :alt="project.title"
        class="w-full object-contain shadow-hero-img rounded-xl"
        style="max-width: 1100px; max-height: 640px;"
      />
      <div v-else class="w-full max-w-[1100px] h-[400px] rounded-xl bg-white/10" />
    </div>

    <!-- 3. Meta strip -->
    <ProjectMetaStrip
      :company="project.company ?? ''"
      :dateRange="project.dateRange ?? project.year"
      :tools="project.tools ?? []"
      :description="project.description"
      :role="project.role ?? ''"
    />

    <!-- 4. Challenge (conditional) -->
    <ProjectChallenge :challenge="project.challenge ?? ''" />

    <!-- ── CASE STUDY LAYOUT ────────────────────────────────────── -->
    <template v-if="isCaseStudy">

      <!-- 5. Design Process -->
      <ProjectDesignProcess :steps="project.designProcess ?? []" />

      <!-- 6. Background Information -->
      <section v-if="project.backgroundInfo" class="bg-white px-6 py-16 md:py-[100px]">
        <div class="max-w-5xl mx-auto">
          <h2 class="font-display font-bold text-plum-900 mb-[55px]" style="font-size: 32px; line-height: 1.25;">
            Background Information
          </h2>
          <div class="prose-content text-slate-600 text-[18px] leading-[35px] max-w-[1184px]" v-html="renderHtml(project.backgroundInfo)" />
        </div>
      </section>

      <!-- 7. Research Methods -->
      <ProjectSplitSection
        v-if="project.researchMethods?.body || project.researchMethods?.image"
        heading="Research Methods"
        :body="project.researchMethods?.body ?? ''"
        :image="project.researchMethods?.image ?? ''"
        :image-right="true"
      />

      <!-- 8. Analysis and Results -->
      <ProjectSplitSection
        v-if="project.analysisResults?.body || project.analysisResults?.image"
        heading="Analysis and Results"
        :body="project.analysisResults?.body ?? ''"
        :image="project.analysisResults?.image ?? ''"
        :image-right="false"
        style="background: #fff;"
      />

      <!-- 9. Wireframes and Prototypes -->
      <ProjectWireframes :wireframes="project.wireframes ?? []" :body="project.wireframesBody ?? ''" />

      <!-- 10. Final Prototype -->
      <ProjectPrototypes
        :prototypes="project.prototypes ?? []"
        :layout="project.prototypeLayout ?? 'grid'"
        heading="Final Prototype"
      />

    </template>

    <!-- ── STANDARD LAYOUT ─────────────────────────────────────── -->
    <template v-else>

      <!-- 5. Background Information -->
      <section v-if="project.backgroundInfo" class="bg-white px-6 py-16 md:py-[100px]">
        <div class="max-w-5xl mx-auto">
          <h2 class="font-display font-bold text-plum-900 mb-[55px]" style="font-size: 32px; line-height: 1.25;">
            Background Information
          </h2>
          <div class="prose-content text-slate-600 text-[18px] leading-[35px] max-w-[1184px]" v-html="renderHtml(project.backgroundInfo)" />
        </div>
      </section>

      <!-- 6. Discovery and Insights -->
      <section v-if="project.insights" class="px-6 py-16 md:py-[100px]" style="background: #FCFBFB;">
        <div class="max-w-5xl mx-auto">
          <h2 class="font-display font-bold text-plum-900 mb-[55px]" style="font-size: 32px; line-height: 1.25;">
            Discovery and Insights
          </h2>
          <div class="prose-content text-slate-600 text-[18px] leading-[35px] max-w-[1184px]" v-html="renderHtml(project.insights)" />
        </div>
      </section>

      <!-- 7. Prototypes -->
      <ProjectPrototypes :prototypes="project.prototypes ?? []" :layout="project.prototypeLayout ?? 'alternating'" />

    </template>

    <!-- Extra sections (both layouts) -->
    <template v-if="project.extraSections?.length">
      <section
        v-for="(section, i) in project.extraSections"
        :key="section.heading"
        class="px-6 py-16 md:py-[100px]"
        :class="i % 2 === 0 ? 'bg-white' : 'bg-paper'"
      >
        <div class="max-w-5xl mx-auto">
          <h2 class="font-display font-bold text-plum-900 mb-[55px]" style="font-size: 32px; line-height: 1.25;">
            {{ section.heading }}
          </h2>
          <div class="prose-content text-slate-600 text-[18px] leading-[35px] max-w-[1184px]" v-html="renderHtml(section.body)" />
        </div>
      </section>
    </template>

    <!-- More projects -->
    <section class="py-20 px-6 bg-paper">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-end justify-between mb-12">
          <div>
            <p class="text-xs font-bold tracking-widest uppercase text-plum-500 mb-2">Keep Exploring</p>
            <h2 class="font-display font-bold text-plum-900" style="font-size: 32px;">More Projects</h2>
          </div>
          <NuxtLink
            to="/projects"
            class="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-plum-900 transition-colors"
          >
            All projects
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
        <div class="grid sm:grid-cols-3 gap-6">
          <NuxtLink
            v-for="p in moreProjects"
            :key="p.slug"
            :to="`/projects/${p.slug}`"
            class="group block rounded-2xl overflow-hidden bg-white shadow-card-proto hover:shadow-card-home transition-all duration-200"
          >
            <div class="aspect-video overflow-hidden flex items-center justify-center p-4 bg-plum-50">
              <img
                v-if="p.thumbnail"
                :src="p.thumbnail"
                :alt="p.title"
                class="w-full h-full object-contain group-hover:scale-[1.04] transition-transform duration-500"
              />
              <span v-else class="font-serif text-2xl font-bold text-plum-400">KG</span>
            </div>
            <div class="p-5">
              <div class="flex flex-wrap gap-1.5 mb-2">
                <span v-for="tag in p.tags" :key="tag" class="text-xs text-plum-500 font-medium">{{ tag }}</span>
              </div>
              <h3 class="font-display font-bold text-plum-900 group-hover:text-plum-700 transition-colors leading-snug">
                {{ p.title }}
              </h3>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>
