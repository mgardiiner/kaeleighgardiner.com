<script setup lang="ts">
import projectsData from '~/data/projects.json'
const projects = projectsData
</script>

<template>
  <div class="pt-28 pb-32 px-6">
    <div class="max-w-5xl mx-auto">

      <!-- Header -->
      <div class="mb-20">
        <div class="flex items-center gap-4 mb-6">
          <span class="w-10 h-px bg-purple-300"></span>
          <p class="text-xs font-semibold tracking-widest uppercase text-slate-400">Portfolio</p>
        </div>
        <h1 class="font-display text-5xl md:text-6xl font-semibold text-slate-900 leading-tight mb-4">All Projects</h1>
        <p class="text-slate-500 text-lg max-w-lg leading-relaxed">
          UX design, research, and product work across government services, enterprise systems, and more.
        </p>
      </div>

      <!-- Project list -->
      <div class="divide-y divide-slate-100">
        <NuxtLink
          v-for="project in projects"
          :key="project.slug"
          :to="`/work/${project.slug}`"
          class="group flex flex-col sm:flex-row gap-6 sm:gap-10 sm:items-center py-10 first:pt-0"
        >
          <!-- Thumbnail -->
          <div class="w-full sm:w-52 md:w-64 shrink-0 aspect-[4/3] rounded-xl overflow-hidden bg-purple-50">
            <img
              v-if="project.thumbnail"
              :src="project.thumbnail"
              :alt="project.title"
              class="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <span class="font-display text-3xl font-semibold text-purple-200">KG</span>
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="text-xs font-medium text-purple-500"
              >{{ tag }}</span>
              <span class="text-slate-200 text-xs select-none">·</span>
              <span class="text-xs text-slate-400">{{ project.year }}</span>
            </div>
            <h2 class="font-display text-2xl md:text-3xl font-semibold text-slate-900 leading-snug mb-3 group-hover:text-purple-700 transition-colors duration-200">
              {{ project.title }}
            </h2>
            <p class="text-slate-500 text-sm leading-relaxed line-clamp-2 max-w-lg">{{ project.description }}</p>
          </div>

          <!-- Arrow -->
          <div class="shrink-0 hidden sm:flex">
            <div class="w-11 h-11 rounded-full border border-slate-200 group-hover:border-purple-300 group-hover:bg-purple-50 flex items-center justify-center transition-all duration-200">
              <svg class="w-4 h-4 text-slate-300 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>

    </div>
  </div>
</template>
