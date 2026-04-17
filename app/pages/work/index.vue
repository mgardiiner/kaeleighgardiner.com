<script setup lang="ts">
import projectsData from '~/data/projects.json'
const projects = projectsData
</script>

<template>
  <div class="pt-28 pb-24 px-6">
    <div class="max-w-5xl mx-auto">
      <h1 class="font-display text-5xl font-semibold text-slate-900 mb-3">Work</h1>
      <p class="text-slate-500 text-lg mb-14 max-w-lg">
        A selection of UX, product, and visual design projects.
      </p>

      <div class="grid md:grid-cols-2 gap-8">
        <NuxtLink
          v-for="project in projects"
          :key="project.slug"
          :to="`/work/${project.slug}`"
          class="group block rounded-2xl border border-purple-100 overflow-hidden hover:shadow-lg hover:shadow-purple-100 transition-all duration-300"
        >
          <div class="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center overflow-hidden">
            <img
              v-if="project.thumbnail"
              :src="project.thumbnail"
              :alt="project.title"
              class="w-full h-full object-cover"
            />
            <span v-else class="text-purple-300 text-5xl font-display font-semibold opacity-40">KG</span>
          </div>
          <div class="p-6">
            <h2 class="font-display text-xl font-semibold text-slate-900 group-hover:text-purple-700 transition-colors mb-2 leading-snug">
              {{ project.title }}
            </h2>
            <p class="text-slate-500 text-sm mb-4 leading-relaxed">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-600"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
