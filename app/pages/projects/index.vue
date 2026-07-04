<script setup lang="ts">
import projectsData from '~/data/projects.json'

const all = projectsData as any[]

// Capstone (GRCOA) shown as the featured hero card
const capstone = all.find(p => p.featured && p.capstone)
// The remaining case studies (Training, Highway, Court) fill the 2-col grid
const gridStudies = all.filter(p => p.featured && !p.capstone)
// Degree / side work shown in "More explorations"
const explorations = all.filter(p => !p.featured)

// Filter chips derived from the case-study tags, in first-seen order
const filterTags = computed(() => {
  const set = new Set<string>()
  all.filter(p => p.featured).forEach(p => p.tags?.forEach((t: string) => set.add(t)))
  return ['All', ...set]
})

const activeTag = ref('All')

const showFeatured = computed(() =>
  activeTag.value === 'All' || (capstone?.tags?.includes(activeTag.value) ?? false),
)

const visibleGrid = computed(() =>
  activeTag.value === 'All'
    ? gridStudies
    : gridStudies.filter(p => p.tags?.includes(activeTag.value)),
)

const count = computed(() => (showFeatured.value ? 1 : 0) + visibleGrid.value.length)
</script>

<template>
  <div class="bg-white min-h-screen">

    <!-- Header -->
    <div class="pt-[140px] md:pt-[160px] pb-12 px-8 md:px-16 lg:px-32">
      <p class="font-display font-bold text-plum-700 mb-4 uppercase" style="font-size: 13px; letter-spacing: 0.18em;">
        SELECTED WORK · 2022–2026
      </p>
      <div class="flex items-end justify-between gap-6 flex-wrap">
        <h1
          class="font-serif font-bold text-plum-900"
          style="font-size: clamp(56px, 7vw, 84px); font-weight: 700; letter-spacing: -0.03em; line-height: 0.95;"
        >
          Projects.
        </h1>
        <span
          class="font-display font-semibold text-plum-700 border border-plum-400 rounded-full mb-2"
          style="font-size: 13px; padding: 8px 18px; letter-spacing: 0.06em; white-space: nowrap;"
        >
          {{ count }} {{ count === 1 ? 'case study' : 'case studies' }}
        </span>
      </div>

      <!-- Filter chips -->
      <div class="flex flex-wrap gap-2 mt-10">
        <button
          v-for="tag in filterTags"
          :key="tag"
          class="font-display font-semibold rounded-full transition-all"
          style="padding: 9px 18px; font-size: 13px;"
          :class="activeTag === tag
            ? 'bg-plum-700 text-white'
            : 'text-plum-700 border border-plum-400 hover:border-plum-700 hover:bg-plum-50'"
          @click="activeTag = tag"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <!-- Featured + case-study grid -->
    <div class="px-8 md:px-16 lg:px-32 pb-[100px]">
      <Transition name="fade">
        <ProjectFeaturedCard v-if="showFeatured && capstone" :project="capstone" class="mb-8" />
      </Transition>

      <TransitionGroup name="list" tag="div" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectCard
          v-for="p in visibleGrid"
          :key="p.slug"
          :project="p"
          variant="row"
        />
      </TransitionGroup>

      <p v-if="count === 0" class="py-16 text-center text-plum-400 text-sm">
        No projects match this filter.
      </p>
    </div>

    <!-- More explorations -->
    <div class="px-8 md:px-16 lg:px-32 pt-14 pb-[100px]" style="border-top: 1px solid rgba(194,181,214,0.5);">
      <div class="flex items-end justify-between gap-6 flex-wrap mb-8">
        <h2 class="font-serif font-bold text-plum-900" style="font-size: 28px; font-weight: 700;">More explorations</h2>
        <p class="text-plum-500 max-w-[320px] sm:text-right" style="font-size: 13px; line-height: 1.5;">
          Product design, branding &amp; illustration from my degree.
        </p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        <ProjectCard
          v-for="p in explorations"
          :key="p.slug"
          :project="p"
          variant="mini"
        />
      </div>
    </div>

  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
.list-leave-active {
  position: absolute;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
