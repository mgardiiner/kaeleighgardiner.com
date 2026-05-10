<script setup lang="ts">
import { renderHtml } from '~/utils/renderHtml'

const props = defineProps<{
  section: string
  project?: any
  about?: any
  roles?: any[]
  contact?: any
  projects?: any[]
}>()
const emit = defineEmits<{ (e: 'close'): void }>()

const gradientFrom = computed(() => props.project?.heroGradient?.from ?? '#A799B7')
const gradientTo   = computed(() => props.project?.heroGradient?.to   ?? '#533A71')
const stripeColor  = computed(() => gradientTo.value)
const heroImage    = computed(() => props.project?.heroImage || props.project?.thumbnail)
const isCaseStudy  = computed(() => props.project?.pageLayout === 'case-study')
const featured     = computed(() => props.projects?.filter((p: any) => p.featured) ?? [])

const sectionLabel = computed(() => {
  const map: Record<string, string> = {
    projects: props.project?.title ?? 'Project',
    homepage: 'Homepage',
    about: 'About',
    experience: 'Experience',
    testimonials: 'Testimonials',
    contact: 'Contact',
  }
  return map[props.section] ?? props.section
})

function close(e: MouseEvent) {
  if ((e.target as HTMLElement).classList.contains('modal-backdrop')) emit('close')
}

onMounted(() => { document.body.style.overflow = 'hidden' })
onUnmounted(() => { document.body.style.overflow = '' })
</script>

<template>
  <Teleport to="body">
    <div
      class="modal-backdrop fixed inset-0 z-50 bg-black/60 overflow-y-auto"
      @click="close"
    >
      <div class="relative min-h-screen">

        <!-- Sticky header bar -->
        <div class="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-plum-900/95 backdrop-blur text-white">
          <div class="flex items-center gap-3">
            <span class="text-xs font-semibold uppercase tracking-widest text-plum-300">Preview</span>
            <span class="text-sm text-plum-200 truncate max-w-xs">{{ sectionLabel }}</span>
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

        <!-- ══════════════════════════════════════════════════════ -->
        <!-- PROJECTS                                               -->
        <!-- ══════════════════════════════════════════════════════ -->
        <div v-if="section === 'projects' && project" class="bg-white">

          <ProjectHeroBand :title="project.title" :year="project.year" :stripe-color="stripeColor" />

          <div
            class="w-full flex items-center justify-center px-6 min-h-[320px] md:min-h-[560px] lg:min-h-[800px]"
            :style="{ background: `linear-gradient(180deg, ${gradientFrom} 0%, ${gradientTo} 91%)` }"
          >
            <img v-if="heroImage" :src="heroImage" :alt="project.title" class="w-full object-contain shadow-hero-img rounded-xl" style="max-width: 1100px; max-height: 640px;" />
            <div v-else class="w-full max-w-[1100px] h-[400px] rounded-xl bg-white/10 flex items-center justify-center">
              <span class="text-white/50 text-sm">No hero image</span>
            </div>
          </div>

          <ProjectMetaStrip
            :company="project.company ?? ''"
            :dateRange="project.dateRange ?? project.year"
            :tools="project.tools ?? []"
            :description="project.description"
            :role="project.role ?? ''"
          />

          <ProjectChallenge :challenge="project.challenge ?? ''" />

          <template v-if="isCaseStudy">
            <ProjectDesignProcess :steps="project.designProcess ?? []" />
            <section v-if="project.backgroundInfo" class="bg-white px-6 py-16 md:py-[100px]">
              <div class="max-w-5xl mx-auto">
                <h2 class="font-display font-bold text-plum-900 mb-[55px]" style="font-size: 32px; line-height: 1.25;">Background Information</h2>
                <div class="prose-content text-slate-600 text-[18px] leading-[35px] max-w-[1184px]" v-html="renderHtml(project.backgroundInfo)" />
              </div>
            </section>
            <ProjectSplitSection v-if="project.researchMethods?.body || project.researchMethods?.image" heading="Research Methods" :body="project.researchMethods?.body ?? ''" :image="project.researchMethods?.image ?? ''" :image-right="true" />
            <ProjectSplitSection v-if="project.analysisResults?.body || project.analysisResults?.image" heading="Analysis and Results" :body="project.analysisResults?.body ?? ''" :image="project.analysisResults?.image ?? ''" :image-right="false" style="background: #fff;" />
            <ProjectWireframes :wireframes="project.wireframes ?? []" :body="project.wireframesBody ?? ''" />
            <ProjectPrototypes :prototypes="project.prototypes ?? []" :layout="project.prototypeLayout ?? 'grid'" heading="Final Prototype" />
          </template>

          <template v-else>
            <section v-if="project.backgroundInfo" class="bg-white px-6 py-16 md:py-[100px]">
              <div class="max-w-5xl mx-auto">
                <h2 class="font-display font-bold text-plum-900 mb-[55px]" style="font-size: 32px; line-height: 1.25;">Background Information</h2>
                <div class="prose-content text-slate-600 text-[18px] leading-[35px] max-w-[1184px]" v-html="renderHtml(project.backgroundInfo)" />
              </div>
            </section>
            <section v-if="project.insights" class="px-6 py-16 md:py-[100px]" style="background: #FCFBFB;">
              <div class="max-w-5xl mx-auto">
                <h2 class="font-display font-bold text-plum-900 mb-[55px]" style="font-size: 32px; line-height: 1.25;">Discovery and Insights</h2>
                <div class="prose-content text-slate-600 text-[18px] leading-[35px] max-w-[1184px]" v-html="renderHtml(project.insights)" />
              </div>
            </section>
            <ProjectPrototypes :prototypes="project.prototypes ?? []" :layout="project.prototypeLayout ?? 'alternating'" />
          </template>

          <template v-if="project.extraSections?.length">
            <section v-for="(s, i) in project.extraSections" :key="s.heading" class="px-6 py-16 md:py-[100px]" :class="i % 2 === 0 ? 'bg-white' : 'bg-paper'">
              <div class="max-w-5xl mx-auto">
                <h2 class="font-display font-bold text-plum-900 mb-[55px]" style="font-size: 32px; line-height: 1.25;">{{ s.heading }}</h2>
                <div class="prose-content text-slate-600 text-[18px] leading-[35px] max-w-[1184px]" v-html="renderHtml(s.body)" />
              </div>
            </section>
          </template>

          <div class="py-16 px-6 bg-paper text-center">
            <p class="text-slate-400 text-sm">— More Projects section hidden in preview —</p>
          </div>
        </div>

        <!-- ══════════════════════════════════════════════════════ -->
        <!-- HOMEPAGE                                               -->
        <!-- ══════════════════════════════════════════════════════ -->
        <div v-else-if="section === 'homepage' && about" class="bg-white">

          <!-- Hero -->
          <section class="pt-[120px] md:pt-[160px] lg:pt-[180px] pb-16 md:pb-20 px-8 md:px-16 lg:px-32 bg-white relative overflow-hidden">
            <div class="absolute pointer-events-none" style="right: -120px; top: -80px; width: 720px; height: 720px; background: radial-gradient(ellipse at center, rgba(194,181,214,0.38) 0%, transparent 68%); z-index: 0;" />
            <p class="font-display font-bold text-plum-700 mb-6 uppercase relative z-10" style="font-size: 13px; letter-spacing: 0.18em;">{{ about.heroEyebrow }}</p>
            <div class="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-center relative z-10">
              <div>
                <h1 class="font-display font-black text-plum-900 mb-7" style="font-size: clamp(44px, 7.8vw, 112px); font-weight: 900; letter-spacing: -0.03em; line-height: 0.95;">{{ about.heroHeading }}</h1>
                <p class="text-plum-900/70 mb-9" style="font-size: clamp(16px, 2vw, 19px); line-height: 1.55; max-width: 560px;">{{ about.heroCopy }}</p>
                <div class="flex flex-wrap gap-3.5">
                  <span class="inline-block font-display font-semibold px-[30px] py-4 rounded-full bg-plum-700 text-white" style="font-size: 15px;">View My Work →</span>
                  <span class="inline-block font-display font-semibold px-[30px] py-4 rounded-full text-plum-900" style="font-size: 15px; border: 1.5px solid #C2B5D6;">Download Résumé</span>
                </div>
                <div class="flex items-center gap-2.5" style="margin-top: 40px;">
                  <span class="inline-block rounded-full shrink-0" style="width: 8px; height: 8px; background: #22C55E; box-shadow: 0 0 0 4px rgba(34,197,94,0.18);" />
                  <span class="font-display font-semibold text-plum-900" style="font-size: 13px; letter-spacing: 0.04em;">{{ about.heroStatusLine }}</span>
                </div>
              </div>
              <div class="flex justify-center lg:justify-end">
                <div class="relative w-full" style="max-width: 380px; aspect-ratio: 380 / 480;">
                  <div class="absolute inset-0 pointer-events-none hidden sm:block" style="background: #533A71; opacity: 0.15; clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%); transform: translate(22px, 22px); border-radius: 16px; z-index: 0;" />
                  <div class="rounded-2xl overflow-hidden bg-plum-25 w-full h-full relative" style="box-shadow: 0 24px 48px rgba(83,58,113,0.15); z-index: 1;">
                    <img v-if="about.photo" :src="about.photo" alt="Headshot" class="w-full h-full object-cover" style="object-position: center 22%;" />
                    <div v-else class="w-full h-full bg-plum-100 flex items-center justify-center"><span class="text-plum-400 text-sm">No photo</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Trust strip -->
          <div class="bg-plum-700 flex items-center justify-between flex-wrap gap-4 px-8 md:px-16 lg:px-32" style="padding-top: 18px; padding-bottom: 18px;">
            <span v-for="client in about.trustClients" :key="client" class="font-display font-semibold text-plum-50 uppercase" style="font-size: 13px; letter-spacing: 0.12em;">{{ client }}</span>
          </div>

          <!-- Selected work -->
          <section class="px-8 md:px-16 lg:px-32 py-16 md:py-[120px] bg-white">
            <div class="flex justify-between items-end mb-10 md:mb-14">
              <div>
                <p class="font-display font-bold text-plum-700 mb-3 uppercase" style="font-size: 13px; letter-spacing: 0.18em;">SELECTED WORK · 2023–2025</p>
                <h2 class="font-serif font-bold text-plum-900" style="font-size: clamp(28px, 4.5vw, 56px);">Recent Projects</h2>
              </div>
            </div>
            <div class="flex flex-col gap-8">
              <ProjectCardHome v-for="(p, i) in featured" :key="p.slug" :project="p" :index="i" />
            </div>
          </section>

          <!-- How I Work -->
          <section class="px-8 md:px-16 lg:px-32 py-16 md:py-[100px] bg-white">
            <div class="bg-paper rounded-3xl p-8 md:p-16">
              <div class="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
                <div>
                  <p class="font-display font-bold text-plum-700 uppercase mb-3.5" style="font-size: 13px; letter-spacing: 0.18em;">HOW I WORK</p>
                  <h3 class="font-serif font-bold text-plum-900" style="font-size: clamp(26px, 3vw, 36px); font-weight: 700; line-height: 1.15; white-space: pre-line;">{{ about.howIWorkHeadline }}</h3>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <div v-for="step in about.howIWorkSteps" :key="step.n">
                    <p class="font-serif italic text-plum-400 mb-2" style="font-size: 28px; font-weight: 400; line-height: 1;">{{ step.n }}</p>
                    <p class="font-display font-bold text-plum-900 mb-2" style="font-size: 17px;">{{ step.title }}</p>
                    <p class="text-plum-900/70" style="font-size: 14px; line-height: 1.6;">{{ step.desc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- ══════════════════════════════════════════════════════ -->
        <!-- ABOUT                                                  -->
        <!-- ══════════════════════════════════════════════════════ -->
        <div v-else-if="(section === 'about' || section === 'testimonials') && about" class="bg-paper">

          <!-- Hero -->
          <div class="pt-[160px] px-8 md:px-16 lg:px-32 pb-0">
            <div class="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-20">
              <div>
                <p class="font-display font-bold text-plum-700 mb-4 uppercase" style="font-size: 13px; letter-spacing: 0.18em;">About</p>
                <h1 class="font-serif font-bold text-plum-900" style="font-size: clamp(48px, 5.5vw, 80px); font-weight: 700; letter-spacing: -0.02em; line-height: 1.05;">{{ about.aboutHeadline }}</h1>
                <p class="text-plum-900/75 mt-8" style="font-size: 18px; line-height: 1.6; max-width: 480px;">{{ about.aboutCopy }}</p>
              </div>
              <div class="flex justify-center lg:justify-end">
                <div class="relative shrink-0" style="width: 320px; height: 400px; max-width: 100%;">
                  <div class="absolute inset-0 pointer-events-none hidden sm:block" style="background: #533A71; opacity: 0.15; clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%); transform: translate(18px, 18px); border-radius: 16px; z-index: 0;" />
                  <div class="rounded-2xl overflow-hidden bg-plum-25 w-full h-full relative" style="box-shadow: 0 24px 48px rgba(83,58,113,0.15); z-index: 1;">
                    <img v-if="about.photo" :src="about.photo" alt="Headshot" class="w-full h-full object-cover" style="object-position: center 22%;" />
                    <div v-else class="w-full h-full bg-plum-100 flex items-center justify-center"><span class="text-plum-400 text-sm">No photo</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick facts -->
          <div class="px-8 md:px-16 lg:px-32 mt-[100px] pt-10" style="border-top: 1px solid #0A0414;">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div><p class="font-display font-bold text-plum-700 uppercase mb-2" style="font-size: 11px; letter-spacing: 0.18em;">Based In</p><p class="font-display text-plum-900" style="font-size: 18px; font-weight: 500;">{{ about.location }}</p></div>
              <div><p class="font-display font-bold text-plum-700 uppercase mb-2" style="font-size: 11px; letter-spacing: 0.18em;">Studying</p><p class="font-display text-plum-900" style="font-size: 18px; font-weight: 500;">{{ about.studyingLabel }}</p></div>
              <div><p class="font-display font-bold text-plum-700 uppercase mb-2" style="font-size: 11px; letter-spacing: 0.18em;">Currently</p><p class="font-display text-plum-900" style="font-size: 18px; font-weight: 500;">{{ about.availability }}</p></div>
              <div><p class="font-display font-bold text-plum-700 uppercase mb-2" style="font-size: 11px; letter-spacing: 0.18em;">Contact</p><p class="font-display text-plum-900" style="font-size: 18px; font-weight: 500;">{{ about.email }}</p></div>
            </div>
          </div>

          <!-- Bio -->
          <div class="px-8 md:px-16 lg:px-32 mt-[100px] grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <div>
              <p class="font-display font-bold text-plum-700 uppercase mb-4" style="font-size: 13px; letter-spacing: 0.18em;">About Me</p>
              <h2 class="font-serif font-bold text-plum-900" style="font-size: 36px; font-weight: 700; line-height: 1.15;">A little more about who I am.</h2>
            </div>
            <div class="space-y-5">
              <p v-for="(para, i) in about.bio" :key="i" class="text-plum-900/75" style="font-size: 17px; line-height: 1.75;">{{ para }}</p>
            </div>
          </div>

          <!-- What I Do -->
          <div class="px-8 md:px-16 lg:px-32 mt-[100px]">
            <h2 class="font-serif font-bold text-plum-900 mb-10" style="font-size: 44px; font-weight: 700;">What I do</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div v-for="skill in about.whatIDo" :key="skill.title" :class="['rounded-xl', skill.bg]" style="padding: 32px; border-radius: 12px;">
                <h3 class="font-display font-bold text-plum-900 mb-3" style="font-size: 22px;">{{ skill.title }}</h3>
                <p class="text-plum-900/70" style="font-size: 15px; line-height: 1.6;">{{ skill.desc }}</p>
              </div>
            </div>
          </div>

          <!-- Testimonials (shown for both about and testimonials sections) -->
          <div v-if="about.testimonials?.length" class="px-8 md:px-16 lg:px-32 mt-[100px]">
            <h2 class="font-serif font-bold text-plum-900 mb-10" style="font-size: 36px;">What people say</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div v-for="(t, i) in about.testimonials" :key="i" class="bg-white rounded-2xl p-8 shadow-card-proto">
                <div class="prose-content text-plum-900/80 mb-6 italic" style="font-size: 17px; line-height: 1.7;" v-html="renderHtml(t.quote)" />
                <p class="font-display font-bold text-plum-900" style="font-size: 15px;">{{ t.name }}</p>
                <p class="text-plum-500" style="font-size: 13px;">{{ t.title }}</p>
              </div>
            </div>
          </div>

          <!-- Tools -->
          <div class="px-8 md:px-16 lg:px-32 mt-20 pt-10 pb-[100px]" style="border-top: 1px solid rgba(194,181,214,0.8);">
            <p class="font-display font-bold text-plum-700 uppercase mb-5" style="font-size: 13px; letter-spacing: 0.18em;">Tools</p>
            <div class="flex flex-wrap gap-9">
              <span v-for="tool in about.toolsList" :key="tool" class="font-display font-semibold text-plum-900" style="font-size: 18px;">{{ tool }}</span>
            </div>
          </div>
        </div>

        <!-- ══════════════════════════════════════════════════════ -->
        <!-- EXPERIENCE                                             -->
        <!-- ══════════════════════════════════════════════════════ -->
        <div v-else-if="section === 'experience' && roles" class="bg-white">

          <div class="pt-[160px] px-8 md:px-16 lg:px-32 pb-16">
            <p class="font-display font-bold text-plum-700 uppercase mb-4" style="font-size: 13px; letter-spacing: 0.18em;">Résumé</p>
            <h1 class="font-serif font-bold text-plum-900" style="font-size: clamp(56px, 6.1vw, 88px); font-weight: 700; letter-spacing: -0.02em;">Experience</h1>
            <p class="text-plum-900/70 mt-4" style="font-size: 18px; line-height: 1.6; max-width: 640px;">A condensed timeline of my work, education, and ongoing learning.</p>
          </div>

          <div class="px-8 md:px-16 lg:px-32">
            <div
              v-for="(role, i) in roles"
              :key="role.company + role.startDate"
              class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-14 py-9"
              :style="i === 0 ? 'border-top: 1px solid #0A0414;' : 'border-top: 1px solid rgba(194,181,214,0.8);'"
            >
              <div>
                <p class="font-display font-bold text-plum-900" style="font-size: 14px;">{{ role.startDate }} – {{ role.endDate }}</p>
                <p class="text-plum-700 mt-1" style="font-size: 13px;">{{ role.type }}</p>
                <p class="text-plum-900/60 mt-1" style="font-size: 13px;">{{ role.location }}</p>
              </div>
              <div>
                <h3 class="font-serif font-bold text-plum-900" style="font-size: 30px; font-weight: 700;">{{ role.title }}</h3>
                <p class="font-display font-medium text-plum-700 mt-1.5 mb-4" style="font-size: 16px;">{{ role.company }}</p>
                <ul class="space-y-2">
                  <li v-for="(bullet, bi) in role.bullets" :key="bi" class="relative text-plum-900/80" style="font-size: 15px; line-height: 1.7; padding-left: 18px;">
                    <span class="absolute left-0 bg-plum-700" style="top: 11px; width: 8px; height: 1px;" />
                    {{ bullet }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="px-8 md:px-16 lg:px-32 pb-16 md:pb-[100px]">
            <h2 class="font-serif font-bold text-plum-900 mt-20 mb-6" style="font-size: 36px; font-weight: 700;">Education</h2>
            <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-14 py-9" style="border-top: 1px solid #0A0414;">
              <div>
                <p class="font-display font-bold text-plum-900" style="font-size: 14px;">{{ about?.education?.years ?? '2021 – 2026' }}</p>
                <p class="text-plum-700 mt-1" style="font-size: 13px;">{{ about?.education?.degree ?? 'BA · UX Design' }}</p>
              </div>
              <div>
                <h3 class="font-serif font-bold text-plum-900" style="font-size: 26px; font-weight: 700;">{{ about?.education?.institution ?? 'Wilfrid Laurier University' }}</h3>
              </div>
            </div>
          </div>
        </div>

        <!-- ══════════════════════════════════════════════════════ -->
        <!-- CONTACT                                                -->
        <!-- ══════════════════════════════════════════════════════ -->
        <div v-else-if="section === 'contact' && contact" class="bg-white min-h-screen flex items-center justify-center px-8">
          <div class="max-w-xl w-full py-32">
            <h1 class="font-serif font-bold text-plum-900 mb-4" style="font-size: clamp(40px, 5vw, 72px); line-height: 1.1;">{{ contact.heading }}</h1>
            <p class="text-plum-900/70 mb-12" style="font-size: 18px; line-height: 1.6;">{{ contact.subheading }}</p>
            <div class="flex flex-col gap-5">
              <a :href="`mailto:${contact.email}`" class="font-display font-semibold text-plum-700 hover:text-plum-900 transition-colors" style="font-size: 20px;">{{ contact.email }}</a>
              <a :href="contact.linkedin" target="_blank" rel="noopener" class="font-display font-semibold text-plum-700 hover:text-plum-900 transition-colors" style="font-size: 20px;">LinkedIn →</a>
            </div>
            <p v-if="contact.footnote" class="mt-12 text-plum-500 text-sm">{{ contact.footnote }}</p>
          </div>
        </div>

      </div>
    </div>
  </Teleport>
</template>
