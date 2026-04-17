<script setup lang="ts">
import aboutData from '~/data/about.json'
import experienceData from '~/data/experience.json'

const { skills } = aboutData
const { roles } = experienceData
</script>

<template>
  <div class="pt-28 pb-32 px-6">
    <div class="max-w-5xl mx-auto">

      <!-- Header -->
      <div class="mb-20">
        <div class="flex items-center gap-4 mb-6">
          <span class="w-10 h-px bg-purple-300"></span>
          <p class="text-xs font-semibold tracking-widest uppercase text-slate-400">Background</p>
        </div>
        <h1 class="font-display text-5xl md:text-6xl font-semibold text-slate-900 leading-tight mb-4">Experience</h1>
        <p class="text-slate-500 text-lg max-w-lg leading-relaxed">My professional background in UX design and the skills I bring to every project.</p>
      </div>

      <!-- Experience -->
      <div class="mb-20">
        <p class="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-10">Work History</p>
        <div class="divide-y divide-slate-100">
          <div
            v-for="role in roles"
            :key="role.company + role.startDate"
            class="flex flex-col sm:flex-row gap-4 sm:gap-16 py-10 first:pt-0"
          >
            <div class="shrink-0 sm:w-40">
              <p class="text-xs text-slate-400 leading-relaxed">{{ role.startDate }} – {{ role.endDate }}</p>
              <p class="text-xs text-slate-400 mt-1">{{ role.location }}</p>
            </div>
            <div class="flex-1">
              <p class="font-display text-xl font-semibold text-slate-900 mb-1">{{ role.title }}</p>
              <p class="text-sm text-purple-600 font-medium mb-5">{{ role.company }} · {{ role.type }}</p>
              <ul class="text-sm text-slate-500 leading-relaxed space-y-2">
                <li v-for="(bullet, i) in role.bullets" :key="i" class="flex gap-2">
                  <span class="text-purple-300 mt-1.5 shrink-0">—</span>{{ bullet }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div class="border-t border-slate-100 pt-16">
        <p class="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-8">Skills &amp; Tools</p>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="skill in skills"
            :key="skill"
            class="px-4 py-2 rounded-full border border-slate-200 text-sm text-slate-700 font-medium hover:border-purple-300 hover:text-purple-700 transition-colors"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      <!-- Resume CTA -->
      <div class="border-t border-slate-100 pt-12 mt-16 flex items-center gap-6">
        <a
          href="/resume.pdf"
          target="_blank"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Resume
        </a>
        <p class="text-xs text-slate-400">Full work history available on request</p>
      </div>

    </div>
  </div>
</template>
