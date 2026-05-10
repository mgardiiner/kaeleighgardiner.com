<script setup lang="ts">
interface Wireframe {
  title: string
  image: string
}
defineProps<{ wireframes: Wireframe[], body?: string }>()
import { renderHtml } from '~/utils/renderHtml'
const lightboxSrc = ref<string | null>(null)
</script>

<template>
  <section v-if="wireframes.length" class="bg-white px-6 py-16 md:py-[100px]">
    <div class="max-w-5xl mx-auto">
      <h2 class="font-display font-bold text-plum-900 mb-6" style="font-size: 32px; line-height: 1.25;">
        Wireframes and Prototypes
      </h2>
      <div v-if="body" class="prose-content text-slate-600 text-[17px] leading-[1.75] mb-[50px]" v-html="renderHtml(body)" />
      <div v-else class="mb-[50px]" />
      <div class="flex flex-col gap-16">
        <div
          v-for="(wf, i) in wireframes"
          :key="i"
          :class="['flex flex-col md:flex-row items-center gap-10', i % 2 === 1 ? 'md:flex-row-reverse' : '']"
        >
          <div
            class="w-full md:w-3/5 shrink-0 rounded-2xl overflow-hidden shadow-card-proto bg-slate-100 group relative cursor-zoom-in min-h-[200px] md:min-h-[320px]"
            @click="wf.image && (lightboxSrc = wf.image)"
          >
            <img
              v-if="wf.image"
              :src="wf.image"
              :alt="wf.title"
              class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 min-h-[200px] md:min-h-[320px]"
            />
            <div v-else class="w-full flex items-center justify-center min-h-[200px] md:min-h-[320px]">
              <span class="text-slate-400 text-sm">screenshot</span>
            </div>
            <div v-if="wf.image" class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
              <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0zm-3-3v6m-3-3h6" />
              </svg>
            </div>
          </div>
          <div class="w-full md:w-2/5">
            <p class="font-display font-bold text-plum-900 text-[22px] leading-snug">{{ wf.title }}</p>
          </div>
        </div>
      </div>

      <ImageLightbox v-if="lightboxSrc" :src="lightboxSrc" @close="lightboxSrc = null" />
    </div>
  </section>
</template>
