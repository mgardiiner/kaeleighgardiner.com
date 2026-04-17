<script setup lang="ts">
import projectsData from '~/data/projects.json'

const route = useRoute()
const project = projectsData.find(p => p.slug === route.params.slug)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const prev = project.prevSlug ? projectsData.find(p => p.slug === project.prevSlug) : null
const next = project.nextSlug ? projectsData.find(p => p.slug === project.nextSlug) : null

const moreProjects = projectsData.filter(p => p.slug !== project.slug).slice(0, 3)
</script>

<template>
  <div class="pt-28 pb-24 px-6">
    <div class="max-w-3xl mx-auto">

      <NuxtLink to="/work" class="inline-flex items-center gap-2 text-sm text-purple-600 font-medium hover:underline underline-offset-4 mb-10">
        ← All Work
      </NuxtLink>

      <div class="mb-4 flex flex-wrap gap-2">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-600"
        >
          {{ tag }}
        </span>
      </div>

      <h1 class="font-display text-4xl md:text-5xl font-semibold text-slate-900 leading-tight mb-4">
        {{ project.title }}
      </h1>
      <p class="text-slate-500 text-lg leading-relaxed mb-10">
        {{ project.description }}
      </p>

      <div class="rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200 aspect-video flex items-center justify-center mb-14">
        <img
          v-if="project.thumbnail"
          :src="project.thumbnail"
          :alt="project.title"
          class="w-full h-full object-cover"
        />
        <span v-else class="text-purple-300 text-5xl font-display font-semibold opacity-40">KG</span>
      </div>

      <section
        v-for="section in project.sections"
        :key="section.heading"
        class="mb-12"
      >
        <h2 class="font-display text-2xl font-semibold text-slate-900 mb-4">{{ section.heading }}</h2>
        <div class="text-slate-600 leading-relaxed space-y-3">
          <p v-for="(para, i) in section.body.split('\n\n')" :key="i">{{ para }}</p>
        </div>
      </section>

    </div>
  </div>

  <!-- More projects -->
  <section class="border-t border-slate-100 py-20 px-6 bg-slate-50">
    <div class="max-w-5xl mx-auto">
      <div class="flex items-end justify-between mb-12">
        <div>
          <p class="text-xs font-semibold tracking-widest uppercase text-purple-500 mb-2">Keep Exploring</p>
          <h2 class="font-display text-3xl font-semibold text-slate-900">More Work</h2>
        </div>
        <NuxtLink to="/work" class="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          All projects
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>

      <div class="grid sm:grid-cols-3 gap-4">
        <NuxtLink
          v-for="p in moreProjects"
          :key="p.slug"
          :to="`/work/${p.slug}`"
          class="group block rounded-2xl overflow-hidden bg-white border border-slate-100 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-50 transition-all duration-300"
        >
          <div class="aspect-video bg-purple-50 overflow-hidden">
            <img
              v-if="p.thumbnail"
              :src="p.thumbnail"
              :alt="p.title"
              class="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <span class="font-display text-2xl font-semibold text-purple-200">KG</span>
            </div>
          </div>
          <div class="p-5">
            <div class="flex flex-wrap gap-1.5 mb-2">
              <span v-for="tag in p.tags" :key="tag" class="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 font-medium">{{ tag }}</span>
            </div>
            <h3 class="font-semibold text-slate-900 group-hover:text-purple-700 transition-colors leading-snug text-sm">{{ p.title }}</h3>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
