<script setup lang="ts">
const props = defineProps<{
  project: {
    title: string
    slug: string
    description: string
    thumbnail?: string
    heroImage?: string
    dateRange?: string
    year?: string
    tag?: string
    tags?: string[]
    capstone?: boolean
  }
}>()

const cover = computed(() => props.project.heroImage || props.project.thumbnail)
const chips = computed(() => props.project.tags?.slice(0, 3) ?? [])
</script>

<template>
  <NuxtLink
    :to="`/projects/${project.slug}`"
    class="group block rounded-[20px] overflow-hidden bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(83,58,113,0.16)]"
    style="border: 2px solid #C2B5D6;"
  >
    <div class="grid md:grid-cols-[1.15fr_1fr]">

      <!-- Copy -->
      <div class="flex flex-col justify-center p-8 md:p-12 lg:p-[56px] order-2 md:order-1">
        <div class="flex flex-wrap items-center gap-3 mb-5">
          <span
            v-if="project.capstone"
            class="inline-flex items-center gap-1.5 font-display font-bold text-white bg-plum-700 rounded-full"
            style="font-size: 11px; letter-spacing: 0.14em; padding: 6px 14px;"
          >
            <span aria-hidden="true">★</span> CAPSTONE PROJECT
          </span>
          <span
            v-else-if="project.tag"
            class="inline-flex items-center font-display font-bold text-white bg-plum-700 rounded-full"
            style="font-size: 11px; letter-spacing: 0.14em; padding: 6px 14px;"
          >{{ project.tag }}</span>
          <span class="font-display font-medium text-plum-500" style="font-size: 13px;">
            {{ project.dateRange || project.year }}
          </span>
        </div>

        <h3 class="font-serif font-bold text-plum-900 mb-4" style="font-size: clamp(26px, 3.2vw, 34px); line-height: 1.15;">
          {{ project.title }}
        </h3>
        <p class="text-plum-900/70 mb-6" style="font-size: 16px; line-height: 1.65; max-width: 520px;">
          {{ project.description }}
        </p>

        <div class="flex flex-wrap gap-2 mb-7">
          <span
            v-for="tag in chips"
            :key="tag"
            class="font-display font-semibold text-plum-700 rounded-full"
            style="font-size: 12px; letter-spacing: 0.04em; padding: 6px 14px; border: 1px solid rgba(194,181,214,0.7);"
          >{{ tag }}</span>
        </div>

        <span class="font-display font-semibold text-plum-900 group-hover:text-plum-700 transition-colors" style="font-size: 15px;">
          Read case study →
        </span>
      </div>

      <!-- Image panel -->
      <div class="flex items-center justify-center bg-plum-25 p-6 md:p-10 lg:p-12 order-1 md:order-2">
        <img
          v-if="cover"
          :src="cover"
          :alt="project.title"
          class="w-full object-contain rounded-lg"
          style="max-height: 340px;"
        />
        <span v-else class="font-serif text-3xl font-bold text-plum-400">KG</span>
      </div>

    </div>
  </NuxtLink>
</template>
