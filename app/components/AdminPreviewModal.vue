<script setup lang="ts">
import { renderHtml } from '~/utils/renderHtml'

const props = defineProps<{ project: any }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const gradientFrom = computed(() => props.project.heroGradient?.from ?? '#A799B7')
const gradientTo   = computed(() => props.project.heroGradient?.to   ?? '#533A71')
const stripeColor  = computed(() => gradientTo.value)
const heroImage    = computed(() => props.project.heroImage || props.project.thumbnail)
const isCaseStudy  = computed(() => props.project.pageLayout === 'case-study')

function close(e: MouseEvent) {
  if ((e.target as HTMLElement).classList.contains('modal-backdrop')) emit('close')
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      class="modal-backdrop fixed inset-0 z-50 bg-black/60 overflow-y-auto"
      @click="close"
    >
      <!-- Preview container -->
      <div class="relative min-h-screen">

        <!-- Sticky header bar -->
        <div class="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-plum-900/95 backdrop-blur text-white">
          <div class="flex items-center gap-3">
            <span class="text-xs font-semibold uppercase tracking-widest text-plum-300">Preview</span>
            <span class="text-sm text-plum-200 truncate max-w-xs">{{ project.title }}</span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-medium">Unsaved changes</span>
          </div>
          <button
            @click="emit('close')"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Close
          </button>
        </div>

        <!-- Page content -->
        <div class="bg-white">

          <!-- Hero band -->
          <ProjectHeroBand
            :title="project.title"
            :year="project.year"
            :stripe-color="stripeColor"
          />

          <!-- Gradient screenshot band -->
          <div
            class="w-full flex items-center justify-center px-6"
            style="min-height: 800px;"
            :style="{ background: `linear-gradient(180deg, ${gradientFrom} 0%, ${gradientTo} 91%)` }"
          >
            <img
              v-if="heroImage"
              :src="heroImage"
              :alt="project.title"
              class="w-full object-contain shadow-hero-img rounded-xl"
              style="max-width: 1100px; max-height: 640px;"
            />
            <div v-else class="w-full max-w-[1100px] h-[400px] rounded-xl bg-white/10 flex items-center justify-center">
              <span class="text-white/50 text-sm">No hero image</span>
            </div>
          </div>

          <!-- Meta strip -->
          <ProjectMetaStrip
            :company="project.company ?? ''"
            :dateRange="project.dateRange ?? project.year"
            :tools="project.tools ?? []"
            :description="project.description"
            :role="project.role ?? ''"
          />

          <!-- Challenge -->
          <ProjectChallenge :challenge="project.challenge ?? ''" />

          <!-- ── CASE STUDY ── -->
          <template v-if="isCaseStudy">

            <ProjectDesignProcess :steps="project.designProcess ?? []" />

            <section v-if="project.backgroundInfo" class="bg-white px-6 py-[100px]">
              <div class="max-w-5xl mx-auto">
                <h2 class="font-display font-bold text-plum-900 mb-[55px]" style="font-size: 32px; line-height: 1.25;">Background Information</h2>
                <div class="prose-content text-slate-600 text-[18px] leading-[35px] max-w-[1184px]" v-html="renderHtml(project.backgroundInfo)" />
              </div>
            </section>

            <ProjectSplitSection
              v-if="project.researchMethods?.body || project.researchMethods?.image"
              heading="Research Methods"
              :body="project.researchMethods?.body ?? ''"
              :image="project.researchMethods?.image ?? ''"
              :image-right="true"
            />

            <ProjectSplitSection
              v-if="project.analysisResults?.body || project.analysisResults?.image"
              heading="Analysis and Results"
              :body="project.analysisResults?.body ?? ''"
              :image="project.analysisResults?.image ?? ''"
              :image-right="false"
              style="background: #fff;"
            />

            <ProjectWireframes
              :wireframes="project.wireframes ?? []"
              :body="project.wireframesBody ?? ''"
            />

            <ProjectPrototypes
              :prototypes="project.prototypes ?? []"
              :layout="project.prototypeLayout ?? 'grid'"
              heading="Final Prototype"
            />

          </template>

          <!-- ── STANDARD ── -->
          <template v-else>

            <section v-if="project.backgroundInfo" class="bg-white px-6 py-[100px]">
              <div class="max-w-5xl mx-auto">
                <h2 class="font-display font-bold text-plum-900 mb-[55px]" style="font-size: 32px; line-height: 1.25;">Background Information</h2>
                <div class="prose-content text-slate-600 text-[18px] leading-[35px] max-w-[1184px]" v-html="renderHtml(project.backgroundInfo)" />
              </div>
            </section>

            <section v-if="project.insights" class="px-6 py-[100px]" style="background: #FCFBFB;">
              <div class="max-w-5xl mx-auto">
                <h2 class="font-display font-bold text-plum-900 mb-[55px]" style="font-size: 32px; line-height: 1.25;">Discovery and Insights</h2>
                <div class="prose-content text-slate-600 text-[18px] leading-[35px] max-w-[1184px]" v-html="renderHtml(project.insights)" />
              </div>
            </section>

            <ProjectPrototypes
              :prototypes="project.prototypes ?? []"
              :layout="project.prototypeLayout ?? 'alternating'"
            />

          </template>

          <!-- Extra sections (both layouts) -->
          <template v-if="project.extraSections?.length">
            <section
              v-for="(section, i) in project.extraSections"
              :key="section.heading"
              class="px-6 py-[100px]"
              :class="i % 2 === 0 ? 'bg-white' : 'bg-paper'"
            >
              <div class="max-w-5xl mx-auto">
                <h2 class="font-display font-bold text-plum-900 mb-[55px]" style="font-size: 32px; line-height: 1.25;">{{ section.heading }}</h2>
                <div class="prose-content text-slate-600 text-[18px] leading-[35px] max-w-[1184px]" v-html="renderHtml(section.body)" />
              </div>
            </section>
          </template>

          <!-- Footer placeholder -->
          <div class="py-16 px-6 bg-paper text-center">
            <p class="text-slate-400 text-sm">— More Projects section hidden in preview —</p>
          </div>

        </div>
      </div>
    </div>
  </Teleport>
</template>
