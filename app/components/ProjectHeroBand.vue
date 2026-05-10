<script setup lang="ts">
defineProps<{
  title: string
  year?: string | number
  stripeColor?: string
}>()

const stripeCount = 3
const W = 1917
const H = 862
const stripeBand = H / stripeCount
const scaleY = (W * 1.1) / 686
</script>

<template>
  <section class="relative bg-white overflow-hidden" style="min-height: 380px;">
    <!-- Stripe field — 3 horizontal parallelograms, tilt 30°, opacity 0.5 -->
    <svg
      class="absolute pointer-events-none"
      style="left: -217px; top: -168px; width: 1917px; height: 862px; opacity: 0.10;"
      viewBox="0 0 1917 862"
      preserveAspectRatio="none"
    >
      <path
        v-for="i in [0, 1, 2]"
        :key="i"
        d="M 9.999 45.917 L 142.065 0 L 141.891 686.423 L 0 771.235 L 9.999 45.917 Z"
        :fill="stripeColor ?? '#FDF3FF'"
        :transform="`translate(95.85, ${i * stripeBand + 40}) rotate(-60) scale(1, ${scaleY})`"
      />
    </svg>

    <!-- Content -->
    <div class="relative z-10 px-6 md:px-16 lg:px-[163px] pt-[110px] md:pt-[150px] lg:pt-[170px] pb-12 md:pb-16 lg:pb-[180px]">
      <!-- Breadcrumb -->
      <div
        class="hero-enter d1 flex items-center font-display font-medium text-plum-700 mb-4"
        style="gap: 10px; font-size: 14px; letter-spacing: 0.04em;"
      >
        <NuxtLink
          to="/projects"
          class="hover:text-plum-900 transition-colors"
          style="text-decoration: underline; text-underline-offset: 4px;"
        >Work</NuxtLink>
        <span>/</span>
        <span v-if="year">{{ year }}</span>
      </div>

      <!-- Project title -->
      <h1
        class="hero-enter d2 font-display font-bold text-plum-900 leading-none m-0 max-w-[1100px]"
        style="font-size: clamp(36px, 7vw, 96px); letter-spacing: -0.02em;"
      >
        {{ title }}
      </h1>
    </div>
  </section>
</template>
