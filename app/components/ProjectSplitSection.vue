<script setup lang="ts">
import { renderHtml } from '~/utils/renderHtml'
defineProps<{
  heading: string
  body: string
  image: string
  imageRight?: boolean
  alt?: string
}>()
</script>

<template>
  <section class="px-6 py-16 md:py-[100px]" style="background: #FCFBFB;">
    <div class="max-w-5xl mx-auto">
      <div :class="['flex flex-col gap-12', imageRight ? 'md:flex-row' : 'md:flex-row-reverse']">
        <!-- Text -->
        <div class="w-full md:w-1/2 flex flex-col justify-center">
          <h2 class="font-display font-bold text-plum-900 mb-6" style="font-size: 32px; line-height: 1.25;">{{ heading }}</h2>
          <div class="prose-content text-slate-600 text-[17px] leading-[1.75]" v-html="renderHtml(body)" />
        </div>
        <!-- Image -->
        <div class="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-card-proto shrink-0 min-h-[200px] md:min-h-[340px]">
          <img
            v-if="image"
            :src="image"
            :alt="alt ?? heading"
            class="w-full h-full object-cover min-h-[200px] md:min-h-[340px]"
          />
          <div v-else class="w-full bg-slate-200 flex items-center justify-center min-h-[200px] md:min-h-[340px]">
            <span class="text-slate-400 text-sm font-medium">No image yet</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
