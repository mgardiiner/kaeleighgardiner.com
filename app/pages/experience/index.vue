<script setup lang="ts">
import experienceData from '~/data/experience.json'
import aboutData from '~/data/about.json'

const { roles } = experienceData
const skills = aboutData.skills
</script>

<template>
  <div class="bg-white">

    <!-- Header -->
    <div class="pt-[160px] px-8 md:px-16 lg:px-32 pb-16">
      <p class="font-display font-bold text-plum-700 uppercase mb-4" style="font-size: 13px; letter-spacing: 0.18em;">Résumé</p>
      <div class="flex flex-wrap items-end justify-between gap-6">
        <h1 class="font-serif font-bold text-plum-900" style="font-size: clamp(52px, 6.4vw, 80px); font-weight: 700; letter-spacing: -0.02em; line-height: 1;">
          Experience
        </h1>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener"
          class="inline-block font-display font-semibold px-[26px] py-[13px] rounded-full bg-plum-700 text-white hover:bg-plum-900 transition-colors"
          style="font-size: 15px;"
        >
          Download Résumé (PDF)
        </a>
      </div>
      <p class="text-plum-900/70 mt-5" style="font-size: 18px; line-height: 1.6; max-width: 640px;">
        A condensed timeline of my work, education, and ongoing learning.
      </p>
    </div>

    <!-- Roles -->
    <div class="px-8 md:px-16 lg:px-32">
      <div
        v-for="(role, i) in roles"
        :key="role.company + role.startDate"
        class="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-14 py-9"
        :style="i === 0 ? 'border-top: 1px solid #0A0414;' : 'border-top: 1px solid rgba(194,181,214,0.8);'"
      >
        <!-- Left: date + meta -->
        <div>
          <p class="font-display font-bold text-plum-900" style="font-size: 14px;">
            {{ role.startDate }} – {{ role.endDate }}
          </p>
          <p class="text-plum-700 mt-1" style="font-size: 13px;">{{ role.type }}</p>
          <p class="text-plum-900/60 mt-1" style="font-size: 13px;">{{ role.location }}</p>
        </div>

        <!-- Right: title + bullets -->
        <div>
          <h3 class="font-serif font-bold text-plum-900" style="font-size: 30px; font-weight: 700;">{{ role.title }}</h3>
          <p class="font-display font-medium text-plum-700 mt-1.5 mb-4" style="font-size: 16px;">{{ role.company }}</p>
          <ul class="space-y-2">
            <li
              v-for="(bullet, bi) in role.bullets"
              :key="bi"
              class="relative text-plum-900/80"
              style="font-size: 15px; line-height: 1.7; padding-left: 18px;"
            >
              <span class="absolute left-0 bg-plum-700" style="top: 11px; width: 8px; height: 1px;" />
              {{ bullet }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Education -->
    <div class="px-8 md:px-16 lg:px-32">
      <h2 class="font-serif font-bold text-plum-900 mt-20 mb-6" style="font-size: 36px; font-weight: 700;">Education</h2>
      <div
        class="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-14 py-9"
        style="border-top: 1px solid #0A0414;"
      >
        <!-- Left -->
        <div>
          <p class="font-display font-bold text-plum-900" style="font-size: 14px;">Sept 2021 – Apr 2026</p>
          <p class="text-plum-700 mt-1" style="font-size: 13px;">BDes · UX Design</p>
          <p class="text-plum-900/60 mt-1" style="font-size: 13px;">Brantford, ON</p>
        </div>

        <!-- Right -->
        <div>
          <h3 class="font-serif font-bold text-plum-900" style="font-size: 26px; font-weight: 700;">Wilfrid Laurier University</h3>
          <p class="font-display font-medium text-plum-700 mt-1.5" style="font-size: 16px;">Bachelor of Design, Co-op Option</p>
          <p class="text-plum-900/75 mt-3" style="font-size: 15px; line-height: 1.6; max-width: 640px;">
            User Experience Design — coursework in research methods, interaction design, accessibility, and design systems.
          </p>
          <ul class="space-y-2 mt-4">
            <li class="relative text-plum-900/80" style="font-size: 15px; line-height: 1.7; padding-left: 18px;">
              <span class="absolute left-0 bg-plum-700" style="top: 11px; width: 8px; height: 1px;" />
              Graduated with a 3.9/4.0 GPA
            </li>
            <li class="relative text-plum-900/80" style="font-size: 15px; line-height: 1.7; padding-left: 18px;">
              <span class="absolute left-0 bg-plum-700" style="top: 11px; width: 8px; height: 1px;" />
              Minor in Game Design and Development
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Skills -->
    <div class="px-8 md:px-16 lg:px-32 pb-16 md:pb-[100px]">
      <h2 class="font-serif font-bold text-plum-900 mt-20 mb-6" style="font-size: 36px; font-weight: 700;">Skills</h2>
      <div class="pt-8 flex flex-wrap gap-3" style="border-top: 1px solid #0A0414;">
        <span
          v-for="skill in skills"
          :key="skill"
          class="font-display font-medium text-plum-900 rounded-full hover:bg-plum-50 transition-colors"
          style="font-size: 15px; padding: 10px 20px; border: 1px solid #C2B5D6;"
        >
          {{ skill }}
        </span>
      </div>
    </div>

    <!-- CTA band -->
    <CtaBand
      heading="Want the full story?"
      subline="Grab the résumé, or reach out — I'm happy to walk through any of these projects."
    >
      <template #actions>
        <a
          href="mailto:kaeleigh.gardiner@yahoo.ca"
          class="inline-block font-display font-semibold px-[30px] py-4 rounded-full bg-white text-plum-900 hover:bg-plum-50 transition-colors"
          style="font-size: 15px;"
        >
          Get in Touch
        </a>
        <NuxtLink
          to="/projects"
          class="inline-block font-display font-semibold px-[30px] py-4 rounded-full text-plum-50 hover:bg-white/10 transition-colors"
          style="font-size: 15px; border: 1.5px solid rgba(194,181,214,0.5);"
        >
          View My Work →
        </NuxtLink>
      </template>
    </CtaBand>

  </div>
</template>
