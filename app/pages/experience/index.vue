<script setup lang="ts">
import experienceData from '~/data/experience.json'

const { roles } = experienceData
</script>

<template>
  <div class="bg-white">

    <!-- Header -->
    <div class="pt-[160px] px-8 md:px-16 lg:px-32 pb-16">
      <p class="font-display font-bold text-plum-700 uppercase mb-4" style="font-size: 13px; letter-spacing: 0.18em;">Résumé</p>
      <h1 class="font-serif font-bold text-plum-900" style="font-size: clamp(56px, 6.1vw, 88px); font-weight: 700; letter-spacing: -0.02em;">
        Experience
      </h1>
      <p class="text-plum-900/70 mt-4" style="font-size: 18px; line-height: 1.6; max-width: 640px;">
        A condensed timeline of my work, education, and ongoing learning.
      </p>
    </div>

    <!-- Roles -->
    <div class="px-8 md:px-16 lg:px-32">
      <div
        v-for="(role, i) in roles"
        :key="role.company + role.startDate"
        class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-14 py-9"
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
    <div class="px-8 md:px-16 lg:px-32 pb-16 md:pb-[100px]">
      <h2 class="font-serif font-bold text-plum-900 mt-20 mb-6" style="font-size: 36px; font-weight: 700;">Education</h2>
      <div
        class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-14 py-9"
        style="border-top: 1px solid #0A0414;"
      >
        <!-- Left -->
        <div>
          <p class="font-display font-bold text-plum-900" style="font-size: 14px;">2021 – 2026</p>
          <p class="text-plum-700 mt-1" style="font-size: 13px;">BA · UX Design</p>
        </div>

        <!-- Right -->
        <div>
          <h3 class="font-serif font-bold text-plum-900" style="font-size: 26px; font-weight: 700;">Wilfrid Laurier University</h3>
          <p class="text-plum-900/75 mt-3" style="font-size: 15px; line-height: 1.6; max-width: 640px;">
            User Experience Design — coursework in research methods, interaction design, accessibility, and design systems.
          </p>
        </div>
      </div>
    </div>

  </div>
</template>
