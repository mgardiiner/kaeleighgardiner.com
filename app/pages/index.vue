<script setup lang="ts">
const projects = [
  {
    title: 'Training Coordination Solutions',
    slug: 'training-coordination-solutions',
    tags: ['UX Design', 'Research'],
    thumb: null,
  },
  {
    title: 'Highway Corridor Management System',
    slug: 'highway-corridor-management-system',
    tags: ['UX Design', 'Systems'],
    thumb: null,
  },
  {
    title: 'The Citizen POA Court Experience',
    slug: 'citizen-poa-court-experience',
    tags: ['UX Design', 'Service Design'],
    thumb: null,
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="pt-36 pb-24 px-6">
      <div class="max-w-5xl mx-auto">
        <p class="hero-enter d1 text-purple-600 font-medium text-sm tracking-widest uppercase mb-4">UX Designer</p>
        <h1 class="hero-enter d2 font-display text-5xl md:text-7xl font-semibold text-slate-900 leading-tight mb-6">
          Hi, I'm Kaeleigh.
        </h1>
        <p class="hero-enter d3 text-lg md:text-xl text-slate-500 max-w-xl leading-relaxed mb-10">
          I design thoughtful, human-centred experiences — from complex government systems to everyday interfaces.
        </p>
        <div class="hero-enter d4 flex flex-wrap gap-4">
          <NuxtLink to="/work" class="px-6 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors">
            View My Work
          </NuxtLink>
          <a href="mailto:kaeleigh.gardiner@yahoo.ca" class="px-6 py-3 rounded-full border border-purple-200 text-purple-700 font-medium hover:bg-purple-50 transition-colors">
            Get in Touch
          </a>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="py-20 px-6 bg-purple-50/50">
      <div class="max-w-5xl mx-auto">
        <h2 class="font-display text-3xl font-semibold text-slate-900 mb-12">Selected Work</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <NuxtLink
            v-for="project in projects"
            :key="project.slug"
            :to="`/work/${project.slug}`"
            class="group block rounded-2xl bg-white border border-purple-100 overflow-hidden hover:shadow-lg hover:shadow-purple-100 transition-all duration-300"
          >
            <div class="aspect-[4/3] bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
              <span class="text-purple-400 text-4xl font-display font-semibold opacity-30">KG</span>
            </div>
            <div class="p-5">
              <h3 class="font-semibold text-slate-900 group-hover:text-purple-700 transition-colors mb-2 leading-snug">
                {{ project.title }}
              </h3>
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
        <div class="mt-10">
          <NuxtLink to="/work" class="text-purple-700 font-medium hover:underline underline-offset-4">
            See all projects →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 px-6">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="font-display text-4xl font-semibold text-slate-900 mb-4">Let's Work Together</h2>
        <p class="text-slate-500 text-lg mb-8 max-w-md mx-auto">
          Open to new opportunities. Let's create something meaningful.
        </p>
        <a
          href="mailto:kaeleigh.gardiner@yahoo.ca"
          class="inline-block px-8 py-4 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
        >
          kaeleigh.gardiner@yahoo.ca
        </a>
      </div>
    </section>
  </div>
</template>
