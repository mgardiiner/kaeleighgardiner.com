<script setup lang="ts">
interface Prototype {
  title: string
  caption: string
  image: string
}

const props = defineProps<{
  prototypes: Prototype[]
  layout?: 'alternating' | 'grid' | 'stacked'
  heading?: string
}>()

import { renderHtml } from '~/utils/renderHtml'
const items = computed(() => props.prototypes.slice(0, 3))
const layout = computed(() => props.layout ?? 'alternating')
const sectionHeading = computed(() => props.heading ?? 'Prototypes')
const lightboxSrc = ref<string | null>(null)
</script>

<template>
  <section v-if="items.length" class="bg-white px-6 py-16 md:py-[100px]">
    <div class="max-w-5xl mx-auto">
      <h2 class="font-display font-bold text-plum-900 mb-[60px]" style="font-size: 32px; line-height: 1.25;">
        {{ sectionHeading }}
      </h2>

      <!-- Alternating layout -->
      <div v-if="layout === 'alternating'" class="flex flex-col gap-16">
        <div
          v-for="(proto, i) in items"
          :key="i"
          :class="['flex flex-col md:flex-row items-center gap-10', i % 2 === 1 ? 'md:flex-row-reverse' : '']"
        >
          <div class="w-full md:w-3/5 shrink-0 rounded-2xl overflow-hidden shadow-card-proto min-h-[200px] md:min-h-[320px]">
            <img v-if="proto.image" :src="proto.image" :alt="proto.title" class="w-full h-full object-cover min-h-[200px] md:min-h-[320px]" />
            <div v-else class="w-full bg-plum-50 flex items-center justify-center min-h-[200px] md:min-h-[320px]">
              <span class="text-plum-500 text-sm font-medium">screenshot</span>
            </div>
          </div>
          <div class="w-full md:w-2/5">
            <p class="font-display font-bold text-plum-900 text-[22px] leading-snug mb-4">{{ proto.title }}</p>
            <div class="prose-content text-slate-500 text-[16px] leading-[1.6]" v-html="renderHtml(proto.caption)" />
          </div>
        </div>
      </div>

      <!-- Grid layout -->
      <div v-else-if="layout === 'grid'" class="grid md:grid-cols-3 gap-8">
        <div v-for="(proto, i) in items" :key="i">
          <div
            class="rounded-2xl overflow-hidden shadow-card-proto mb-5 cursor-zoom-in group relative h-[200px] md:h-[280px]"
            @click="proto.image && (lightboxSrc = proto.image)"
          >
            <img v-if="proto.image" :src="proto.image" :alt="proto.title" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
            <div v-else class="w-full h-full bg-plum-50 flex items-center justify-center">
              <span class="text-plum-500 text-sm font-medium">screenshot</span>
            </div>
            <div v-if="proto.image" class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
              <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0zm-3-3v6m-3-3h6" />
              </svg>
            </div>
          </div>
          <p class="font-display font-bold text-plum-900 text-[16px] leading-tight mb-2">{{ proto.title }}</p>
          <div class="prose-content text-slate-500 text-[15px] leading-[1.5]" v-html="renderHtml(proto.caption)" />
        </div>
      </div>

      <ImageLightbox v-if="lightboxSrc" :src="lightboxSrc" @close="lightboxSrc = null" />

      <!-- Stacked layout -->
      <div v-else class="flex flex-col gap-16">
        <div v-for="(proto, i) in items" :key="i">
          <p class="font-display font-bold text-plum-900 text-[22px] leading-snug mb-2">{{ proto.title }}</p>
          <div v-if="proto.caption" class="prose-content text-slate-500 text-[16px] leading-[1.6] mb-6" v-html="renderHtml(proto.caption)" />
          <div class="w-full rounded-2xl overflow-hidden shadow-card-proto min-h-[200px] md:min-h-[360px]">
            <img v-if="proto.image" :src="proto.image" :alt="proto.title" class="w-full h-full object-cover min-h-[200px] md:min-h-[360px]" />
            <div v-else class="w-full bg-plum-50 flex items-center justify-center min-h-[200px] md:min-h-[360px]">
              <span class="text-plum-500 text-sm font-medium">screenshot</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
