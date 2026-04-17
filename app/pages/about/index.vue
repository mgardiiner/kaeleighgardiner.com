<script setup lang="ts">
import aboutData from '~/data/about.json'

const { bio, photo, location, availability, education, email, linkedin } = aboutData
</script>

<template>
  <div class="pt-28 pb-32 px-6">
    <div class="max-w-5xl mx-auto">

      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end gap-10 mb-20">
        <div class="flex-1">
          <div class="flex items-center gap-4 mb-6">
            <span class="w-10 h-px bg-purple-300"></span>
            <p class="text-xs font-semibold tracking-widest uppercase text-slate-400">About</p>
          </div>
          <h1 class="font-display text-5xl md:text-6xl font-semibold text-slate-900 leading-tight">Kaeleigh Gardiner</h1>
        </div>
        <!-- Headshot -->
        <div v-if="photo" class="shrink-0">
          <div class="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden shadow-md border border-purple-100">
            <img :src="photo" alt="Kaeleigh Gardiner" class="w-full h-full object-cover object-top" />
          </div>
        </div>
      </div>

      <!-- Bio + Quick facts -->
      <div class="grid md:grid-cols-[1fr_auto] gap-16 md:gap-24 items-start mb-20">

        <!-- Bio -->
        <div class="max-w-xl">
          <p
            v-for="(paragraph, i) in bio"
            :key="i"
            class="text-slate-600 leading-relaxed mb-5"
            :class="{ 'text-xl text-slate-700': i === 0 }"
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

        <!-- Quick facts -->
        <div class="flex flex-col gap-8 shrink-0">
          <div v-if="location">
            <p class="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1">Based in</p>
            <p class="text-slate-800 font-medium">{{ location }}</p>
          </div>
          <div v-if="availability">
            <p class="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1">Availability</p>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <p class="text-slate-800 font-medium">{{ availability }}</p>
            </div>
          </div>
          <div v-if="education">
            <p class="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1">Education</p>
            <p class="text-slate-800 font-medium">{{ education.degree }}</p>
            <p class="text-slate-500 text-sm">{{ education.institution }}</p>
            <p class="text-slate-400 text-xs mt-0.5">{{ education.years }}</p>
          </div>
          <div v-if="linkedin">
            <p class="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1">LinkedIn</p>
            <a :href="linkedin" target="_blank" rel="noopener" class="text-purple-600 font-medium text-sm hover:underline underline-offset-4">View Profile →</a>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
