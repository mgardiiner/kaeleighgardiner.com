<script setup lang="ts">
import projectsData from '~/data/projects.json'
import aboutData from '~/data/about.json'

const featured = projectsData.slice(0, 3)
const testimonials = aboutData.testimonials

const marqueeItems = [
  'UX Design', 'User Research', 'Prototyping', 'Figma',
  'Service Design', 'Accessibility', 'Wireframing', 'Usability Testing',
]
const marqueeDouble = [...marqueeItems, ...marqueeItems]
</script>

<template>
  <div>

    <!-- Hero -->
    <section class="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden">

      <!-- Grid background -->
      <div class="pointer-events-none absolute inset-0"
        style="background-image: linear-gradient(to right, #f3e8ff22 1px, transparent 1px), linear-gradient(to bottom, #f3e8ff22 1px, transparent 1px); background-size: 60px 60px;"
      />

      <!-- Purple glow -->
      <div class="pointer-events-none absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-purple-200/40 blur-3xl -translate-y-1/2" />

      <div class="relative max-w-5xl mx-auto w-full pt-20">

        <!-- Eyebrow -->
        <p class="hero-enter d1 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mb-6">
          <span class="w-8 h-px bg-slate-300"></span>
          UX Designer · Toronto, Canada
        </p>

        <!-- Name block -->
        <div class="hero-enter d2 mb-6 -ml-1">
          <p class="font-display font-semibold text-slate-900 text-6xl md:text-8xl lg:text-[10rem] leading-none">Hi, I'm</p>
          <!-- Outlined + filled split on "Kaeleigh" -->
          <p
            class="font-display font-semibold leading-none text-6xl md:text-8xl lg:text-[10rem] select-none"
            style="
              -webkit-text-stroke: 2px #9333ea;
              color: transparent;
              background: linear-gradient(90deg, #9333ea 50%, transparent 50%);
              -webkit-background-clip: text;
              background-clip: text;
            "
          >
            Kaeleigh.
          </p>
        </div>

        <!-- Description + CTA side by side on larger screens -->
        <div class="hero-enter d3 flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
          <p class="text-slate-500 text-lg md:text-xl leading-relaxed max-w-md">
            I design thoughtful, human-centred experiences — from complex government systems to everyday interfaces.
          </p>
          <div class="hero-enter d4 flex flex-wrap gap-3 shrink-0">
            <NuxtLink
              to="/work"
              class="px-7 py-3.5 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
            >
              View My Work
            </NuxtLink>
            <a
              href="mailto:kaeleigh.gardiner@yahoo.ca"
              class="px-7 py-3.5 rounded-full border border-slate-200 text-slate-700 font-medium hover:border-purple-300 hover:text-purple-700 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>

      </div>

      <!-- Scroll hint -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-300">
        <span class="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <span class="w-px h-10 bg-gradient-to-b from-slate-300 to-transparent"></span>
      </div>
    </section>

    <!-- Marquee -->
    <div class="border-y border-purple-100 py-4 bg-white">
      <div class="max-w-5xl mx-auto px-6 overflow-hidden">
        <div class="marquee-track">
          <span
            v-for="(item, i) in marqueeDouble"
            :key="i"
            class="inline-flex items-center gap-4 pr-8 text-sm font-medium text-slate-400 whitespace-nowrap"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-purple-300 shrink-0"></span>
            {{ item }}
          </span>
        </div>
      </div>
    </div>

    <!-- Selected Work -->
    <section class="py-24 px-6 bg-white">
      <div class="max-w-5xl mx-auto">

        <!-- Section header -->
        <div class="flex items-center justify-between mb-14">
          <div class="flex items-center gap-4">
            <span class="w-10 h-px bg-purple-300"></span>
            <p class="text-xs font-semibold tracking-widest uppercase text-slate-400">Selected Work</p>
          </div>
          <NuxtLink to="/work" class="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-slate-900 transition-colors">
            View all
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Project rows -->
        <div class="divide-y divide-slate-100">
          <NuxtLink
            v-for="(project, i) in featured"
            :key="project.slug"
            :to="`/work/${project.slug}`"
            class="group flex flex-col sm:flex-row gap-6 sm:gap-10 sm:items-center py-10 first:pt-0 last:pb-0"
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
              <h3 class="font-display text-2xl md:text-3xl font-semibold text-slate-900 leading-snug mb-3 group-hover:text-purple-700 transition-colors duration-200">
                {{ project.title }}
              </h3>
              <p class="text-slate-500 text-sm leading-relaxed line-clamp-2 max-w-lg">{{ project.description }}</p>
            </div>

            <!-- Arrow indicator -->
            <div class="shrink-0 hidden sm:flex">
              <div class="w-11 h-11 rounded-full border border-slate-200 group-hover:border-purple-300 group-hover:bg-purple-50 flex items-center justify-center transition-all duration-200">
                <svg class="w-4 h-4 text-slate-300 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Mobile view all -->
        <div class="mt-10 pt-8 border-t border-slate-100 sm:hidden">
          <NuxtLink to="/work" class="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            View all projects
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>

      </div>
    </section>

    <!-- Testimonials -->
    <section v-if="testimonials?.length" class="py-20 px-6 bg-slate-50">
      <div class="max-w-3xl mx-auto text-center">
        <div v-for="t in testimonials" :key="t.name">
          <svg class="w-8 h-8 text-purple-200 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote class="font-display text-2xl md:text-3xl font-semibold text-slate-800 leading-snug mb-10">
            "{{ t.quote }}"
          </blockquote>
          <div class="flex items-center justify-center gap-3">
            <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
              <span class="text-purple-500 font-semibold text-sm">{{ t.name.split(' ').map((n: string) => n[0]).join('') }}</span>
            </div>
            <div class="text-left">
              <p class="text-sm font-semibold text-slate-900">{{ t.name }}</p>
              <p class="text-xs text-slate-500">{{ t.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 px-6 pb-28">
      <div class="max-w-5xl mx-auto">
        <div class="relative rounded-3xl overflow-hidden bg-slate-900 px-10 py-20 text-center">
          <!-- Decorative blobs -->
          <div class="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-purple-600/30 blur-3xl" />
          <div class="pointer-events-none absolute -bottom-20 -right-10 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl" />
          <!-- Subtle grid -->
          <div class="pointer-events-none absolute inset-0"
            style="background-image: linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px); background-size: 40px 40px;"
          />
          <div class="relative">
            <p class="text-xs font-semibold tracking-[0.2em] uppercase text-purple-400 mb-4">Available for work</p>
            <h2 class="font-display text-4xl md:text-5xl font-semibold text-white mb-5 leading-tight">
              Let's Build Something<br class="hidden md:block" /> Meaningful Together
            </h2>
            <p class="text-slate-400 text-lg mb-10 max-w-sm mx-auto">Open to full-time roles and freelance projects.</p>
            <a
              href="mailto:kaeleigh.gardiner@yahoo.ca"
              class="inline-block px-9 py-4 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-500 transition-colors shadow-lg shadow-purple-900/50"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
