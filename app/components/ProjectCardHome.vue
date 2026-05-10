<script setup lang="ts">
const props = defineProps<{
  project: {
    title: string
    slug: string
    description: string
    thumbnail?: string
    tag?: string
    stat?: string
    statLabel?: string
    meta?: string
    bg?: string
    cardStyle?: string
  }
  index: number
}>()

const PANEL_PALETTE = ['bg-plum-25', 'bg-plum-400/20']
const panelClass = computed(() => PANEL_PALETTE[props.index % PANEL_PALETTE.length])
</script>

<template>
  <NuxtLink
    :to="`/projects/${project.slug}`"
    class="block rounded-3xl overflow-hidden shadow-card-home hover:shadow-[0_16px_80px_rgba(112,144,176,0.18)] transition-all duration-200 group min-h-[400px] md:min-h-[524px]"
  >
    <div
      class="grid min-h-[400px] md:min-h-[524px]"
      :class="index % 2 === 0 ? 'md:grid-cols-[1.2fr_1fr]' : 'md:grid-cols-[1fr_1.2fr]'"
    >
      <!-- Copy side -->
      <div
        class="flex flex-col justify-center bg-white order-2 p-6 md:p-10 lg:p-[56px]"
        :class="index % 2 === 0 ? 'md:order-1' : 'md:order-2'"
      >
        <p v-if="project.tag" class="font-bold text-plum-700 mb-3.5" style="font-size: 11px; letter-spacing: 0.16em;">
          {{ project.tag }}
        </p>
        <h3 class="font-serif font-bold text-plum-900 mb-4" style="font-size: 36px; line-height: 1.2;">
          {{ project.title }}
        </h3>
        <p v-if="project.description" class="text-plum-900/70 mb-6" style="font-size: 16px; line-height: 1.6; max-width: 460px;">
          {{ project.description }}
        </p>
        <div
          v-if="project.stat"
          class="flex items-end gap-9 pt-5 mt-auto"
          style="border-top: 1px solid rgba(194,181,214,0.6);"
        >
          <div>
            <p class="font-display font-extrabold text-plum-900 leading-none" style="font-size: 32px;">{{ project.stat }}</p>
            <p class="text-plum-700 mt-1" style="font-size: 12px;">{{ project.statLabel }}</p>
          </div>
          <p v-if="project.meta" class="text-plum-700 self-end" style="font-size: 12px; letter-spacing: 0.12em;">{{ project.meta }}</p>
          <span class="ml-auto self-end font-semibold text-plum-900 group-hover:text-plum-700 transition-colors whitespace-nowrap" style="font-size: 14px;">
            Read case study →
          </span>
        </div>
        <span v-else class="inline-flex self-start px-6 py-3 rounded-full border border-plum-400 text-sm font-medium text-plum-700 group-hover:bg-plum-50 transition-colors mt-2">
          View Project →
        </span>
      </div>

      <!-- Image side -->
      <div
        class="flex items-center justify-center order-1 p-5 md:p-8 lg:p-[40px]"
        :class="[
          index % 2 === 0 ? 'md:order-2' : 'md:order-1',
          panelClass
        ]"
      >
        <div class="w-full bg-white rounded-[8px] shadow-card-img overflow-hidden flex items-center justify-center h-[200px] md:h-[280px]">
          <img
            v-if="project.thumbnail"
            :src="project.thumbnail"
            :alt="project.title"
            class="w-full h-full object-contain"
          />
          <span v-else class="font-serif text-3xl font-bold text-plum-400">KG</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
