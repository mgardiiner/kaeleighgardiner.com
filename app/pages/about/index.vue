<script setup lang="ts">
import aboutData from '~/data/about.json'

const { bio, photo, location, availability, education, email, linkedin } = aboutData
</script>

<template>
  <div class="pt-28 pb-32 px-6">
    <div class="max-w-5xl mx-auto">

      <!-- Name -->
      <div class="mb-16">
        <div class="flex items-center gap-4 mb-6">
          <span class="w-10 h-px bg-purple-300"></span>
          <p class="text-xs font-semibold tracking-widest uppercase text-slate-400">About</p>
        </div>
        <h1 class="font-display text-5xl md:text-7xl font-semibold text-slate-900 leading-tight">Kaeleigh Gardiner</h1>
      </div>

      <!-- Photo + Bio -->
      <div class="grid md:grid-cols-[1fr_280px] gap-12 md:gap-16 items-start mb-16">

        <!-- Bio -->
        <div>
          <p
            v-for="(paragraph, i) in bio"
            :key="i"
            class="text-slate-600 leading-relaxed mb-5"
            :class="{ 'text-xl text-slate-700 font-medium': i === 0 }"
          >
            {{ paragraph }}
          </p>
          <div class="flex flex-wrap gap-3 mt-10">
            <a
              href="/resume.pdf"
              target="_blank"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              View Resume
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              :href="`mailto:${email}`"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-purple-200 text-purple-700 text-sm font-medium hover:bg-purple-50 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>

        <!-- Photo -->
        <div class="shrink-0">
          <div v-if="photo" class="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-purple-50">
            <img :src="photo" alt="Kaeleigh Gardiner" class="w-full h-full object-cover object-top" />
          </div>
          <div v-else class="w-full aspect-[3/4] rounded-2xl bg-purple-50 flex items-center justify-center">
            <span class="font-display text-5xl font-semibold text-purple-200">KG</span>
          </div>
        </div>

      </div>

      <!-- Quick facts strip -->
      <div class="border-t border-slate-100 pt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div v-if="location">
          <p class="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1">Based in</p>
          <p class="text-slate-800 font-medium text-sm">{{ location }}</p>
        </div>
        <div v-if="availability">
          <p class="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1">Availability</p>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
            <p class="text-slate-800 font-medium text-sm">{{ availability }}</p>
          </div>
        </div>
        <div v-if="education">
          <p class="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1">Education</p>
          <p class="text-slate-800 font-medium text-sm">{{ education.degree }}</p>
          <p class="text-slate-500 text-xs mt-0.5">{{ education.institution }}</p>
          <p class="text-slate-400 text-xs">{{ education.years }}</p>
        </div>
        <div v-if="linkedin">
          <p class="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1">LinkedIn</p>
          <a :href="linkedin" target="_blank" rel="noopener" class="text-purple-600 font-medium text-sm hover:underline underline-offset-4">View Profile →</a>
        </div>
      </div>

    </div>
  </div>
</template>
