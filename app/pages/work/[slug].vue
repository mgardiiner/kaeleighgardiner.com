<script setup lang="ts">
import projectsData from '~/data/projects.json'

const route = useRoute()
const project = projectsData.find(p => p.slug === route.params.slug)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const prev = project.prevSlug ? projectsData.find(p => p.slug === project.prevSlug) : null
const next = project.nextSlug ? projectsData.find(p => p.slug === project.nextSlug) : null
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

      <div class="border-t border-purple-100 pt-10 flex justify-between items-center">
        <NuxtLink
          v-if="prev"
          :to="`/work/${prev.slug}`"
          class="text-sm text-purple-600 font-medium hover:underline underline-offset-4"
        >
          ← {{ prev.title }}
        </NuxtLink>
        <span v-else />
        <NuxtLink
          v-if="next"
          :to="`/work/${next.slug}`"
          class="text-sm text-purple-600 font-medium hover:underline underline-offset-4"
        >
          {{ next.title }} →
        </NuxtLink>
        <NuxtLink v-else to="/work" class="text-sm text-purple-600 font-medium hover:underline underline-offset-4">
          All Work →
        </NuxtLink>
      </div>

    </div>
  </div>
</template>
