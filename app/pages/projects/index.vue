<script setup lang="ts">
import projectsData from '~/data/projects.json'

const allProjects = projectsData as any[]

const allTags = computed(() => {
  const tags = new Set<string>()
  allProjects.forEach(p => p.tags?.forEach((t: string) => tags.add(t)))
  return ['All', ...Array.from(tags)]
})

const activeTag = ref('All')

const filtered = computed(() =>
  activeTag.value === 'All'
    ? allProjects
    : allProjects.filter(p => p.tags?.includes(activeTag.value))
)
</script>

<template>
  <div class="bg-white min-h-screen">

    <!-- Header -->
    <div class="pt-[140px] md:pt-[160px] pb-12 px-8 md:px-16 lg:px-32">
      <p class="font-display font-bold text-plum-700 mb-4 uppercase" style="font-size: 13px; letter-spacing: 0.18em;">
        SELECTED WORK · 2022–2025
      </p>
      <div class="flex items-end justify-between gap-6 flex-wrap">
        <h1
          class="font-serif font-bold text-plum-900"
          style="font-size: clamp(56px, 7vw, 100px); font-weight: 700; letter-spacing: -0.03em; line-height: 0.95;"
        >
          Projects.
        </h1>
        <span
          class="font-display font-semibold text-plum-700 border border-plum-400 rounded-full mb-2"
          style="font-size: 13px; padding: 8px 18px; letter-spacing: 0.06em; white-space: nowrap;"
        >
          {{ filtered.length }} {{ filtered.length === 1 ? 'case study' : 'case studies' }}
        </span>
      </div>

      <!-- Filter chips -->
      <div class="flex flex-wrap gap-2 mt-10">
        <button
          v-for="tag in allTags"
          :key="tag"
          @click="activeTag = tag"
          class="font-display font-semibold rounded-full transition-all"
          style="padding: 9px 18px; font-size: 13px;"
          :class="activeTag === tag
            ? 'bg-plum-700 text-white'
            : 'text-plum-700 border border-plum-400 hover:border-plum-700 hover:bg-plum-50'"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <!-- Project list -->
    <div class="px-8 md:px-16 lg:px-32 pb-[100px]">
      <div style="border-top: 1px solid rgba(194,181,214,0.4);">

        <TransitionGroup name="list" tag="div">
          <NuxtLink
            v-for="(p, i) in filtered"
            :key="p.slug"
            :to="`/projects/${p.slug}`"
            class="group flex items-center gap-5 md:gap-8 py-6 md:py-7 transition-colors hover:bg-plum-25/60 -mx-8 px-8 md:-mx-16 md:px-16 lg:-mx-32 lg:px-32"
            style="border-bottom: 1px solid rgba(194,181,214,0.4);"
          >
            <!-- Index number -->
            <span
              class="font-serif italic text-plum-400 shrink-0 hidden sm:block"
              style="font-size: 18px; font-weight: 400; min-width: 28px;"
            >{{ String(i + 1).padStart(2, '0') }}</span>

            <!-- Thumbnail -->
            <div
              class="shrink-0 rounded-xl overflow-hidden bg-plum-25 flex items-center justify-center"
              style="width: 68px; height: 68px;"
            >
              <img
                v-if="p.thumbnail"
                :src="p.thumbnail"
                :alt="p.title"
                class="w-full h-full object-cover"
              />
              <span v-else class="font-serif font-bold text-plum-400 text-lg">KG</span>
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <h3
                class="font-serif font-bold text-plum-900 group-hover:text-plum-700 transition-colors truncate"
                style="font-size: clamp(18px, 2.2vw, 26px); font-weight: 700; line-height: 1.2;"
              >{{ p.title }}</h3>
              <p class="text-plum-700/70 mt-1 truncate" style="font-size: 13px; letter-spacing: 0.06em;">
                {{ p.company || p.tags?.join(' · ') }}
              </p>
            </div>

            <!-- Tags -->
            <div class="hidden md:flex gap-2 shrink-0">
              <span
                v-for="tag in p.tags?.slice(0, 2)"
                :key="tag"
                class="font-display font-semibold text-plum-700 rounded-full"
                style="font-size: 11px; letter-spacing: 0.1em; padding: 5px 12px; border: 1px solid rgba(194,181,214,0.7);"
              >{{ tag }}</span>
            </div>

            <!-- Year -->
            <span
              class="font-display text-plum-500 shrink-0 hidden sm:block"
              style="font-size: 14px; font-weight: 500; min-width: 36px; text-align: right;"
            >{{ p.year }}</span>

            <!-- Arrow -->
            <span
              class="font-display font-bold text-plum-400 group-hover:text-plum-700 group-hover:translate-x-1 transition-all shrink-0"
              style="font-size: 18px;"
            >→</span>
          </NuxtLink>
        </TransitionGroup>

        <p v-if="!filtered.length" class="py-16 text-center text-plum-400 text-sm">
          No projects match this filter.
        </p>

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
</style>
