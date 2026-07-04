<script setup lang="ts">
const props = withDefaults(defineProps<{
  project: {
    title: string
    slug: string
    description?: string
    thumbnail?: string
    company?: string
    year?: string
    tags?: string[]
  }
  variant?: 'grid' | 'row' | 'mini'
}>(), {
  variant: 'grid',
})

// "UX DESIGN · 2024" — primary tag + year
const eyebrow = computed(() => {
  const tag = props.project.tags?.[0]
  return [tag, props.project.year].filter(Boolean).join(' · ')
})
</script>

<template>
  <NuxtLink
    :to="`/projects/${project.slug}`"
    class="group block bg-white rounded-2xl overflow-hidden shadow-card-home transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(83,58,113,0.14)]"
    :class="variant === 'row' ? 'flex flex-col sm:flex-row' : ''"
  >
    <!-- Image panel -->
    <div
      class="bg-plum-25 flex items-center justify-center shrink-0"
      :class="{
        'h-[180px] p-6': variant === 'grid',
        'h-[130px] p-4': variant === 'mini',
        'h-[180px] p-6 sm:h-auto sm:w-[190px] sm:self-stretch': variant === 'row',
      }"
    >
      <img
        v-if="project.thumbnail"
        :src="project.thumbnail"
        :alt="project.title"
        class="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
      />
      <span v-else class="font-serif text-2xl font-bold text-plum-400">KG</span>
    </div>

    <!-- Copy -->
    <div
      class="flex flex-col"
      :class="{
        'p-6': variant === 'grid',
        'p-4': variant === 'mini',
        'p-6 md:p-7 justify-center flex-1': variant === 'row',
      }"
    >
      <p
        v-if="eyebrow"
        class="font-display font-bold text-plum-500 uppercase"
        :class="variant === 'mini' ? 'mb-1' : 'mb-2'"
        :style="`font-size: ${variant === 'mini' ? '11px' : '12px'}; letter-spacing: 0.12em;`"
      >
        {{ eyebrow }}
      </p>

      <h3
        class="text-plum-900 group-hover:text-plum-700 transition-colors"
        :class="variant === 'mini' ? 'font-display font-bold' : 'font-serif font-bold'"
        :style="variant === 'mini'
          ? 'font-size: 15px; line-height: 1.3;'
          : 'font-size: 20px; line-height: 1.25;'"
      >
        {{ project.title }}
      </h3>

      <template v-if="variant !== 'mini'">
        <p
          v-if="project.description"
          class="text-plum-900/65 mt-2.5"
          style="font-size: 15px; line-height: 1.6;"
        >
          {{ project.description }}
        </p>
        <p
          v-if="project.company"
          class="text-plum-500 mt-auto pt-4"
          style="font-size: 13px; letter-spacing: 0.04em;"
        >
          {{ project.company }}
        </p>
      </template>
    </div>
  </NuxtLink>
</template>
