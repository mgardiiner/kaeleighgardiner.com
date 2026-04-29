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
  <section class="relative bg-white overflow-hidden" style="height: 600px; min-height: 480px;">
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

    <!-- Breadcrumb -->
    <div
      class="hero-enter d1 absolute flex items-center font-display font-medium text-plum-700"
      style="left: 163px; top: 170px; gap: 10px; font-size: 14px; letter-spacing: 0.04em;"
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
      class="hero-enter d2 absolute font-display font-bold text-plum-900 leading-none m-0"
      style="left: 163px; top: 211px; width: 1100px; font-size: clamp(48px, 7vw, 96px); letter-spacing: -0.02em;"
    >
      {{ title }}
    </h1>
  </section>
</template>
