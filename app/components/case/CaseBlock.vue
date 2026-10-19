<script setup lang="ts">
import aboutData from '~/data/about.json'
import type { CaseBlock } from '~/utils/caseStudy'

// One content block inside a case-study section. Bigger blocks have their own
// component; one-element blocks render inline here.
defineProps<{ block: CaseBlock }>()
</script>

<template>
  <NoteCards v-if="block.type === 'notes'" :block="block" />
  <StatNotes v-else-if="block.type === 'statNotes'" :items="block.items" />
  <ArchetypeCards v-else-if="block.type === 'archetypes'" :items="block.items" />
  <NumberedNotes v-else-if="block.type === 'numbered'" :items="block.items" :offset="block.offset ?? 0" />
  <ChipList v-else-if="block.type === 'chips'" :block="block" />
  <RoleRows v-else-if="block.type === 'rows'" :block="block" />
  <ProcessTimeline v-else-if="block.type === 'process'" :steps="block.steps" />
  <TapedFigure
    v-else-if="block.type === 'figure'"
    :figure="block"
    :tilt="block.tilt"
    :max-width="block.maxWidth"
    :class="block.compact ? 'mt-6' : 'mt-8'"
  />
  <FigureList v-else-if="block.type === 'figures'" :block="block" />
  <NavChips v-else-if="block.type === 'navChips'" :block="block" />
  <ResultsBlock v-else-if="block.type === 'results'" :block="block" />
  <Checklist v-else-if="block.type === 'checklist'" :block="block" />
  <GalleryGrid v-else-if="block.type === 'gallery'" :block="block" />

  <div v-else-if="block.type === 'challenge'" data-reveal="up" class="relative mt-11 rounded-[22px] bg-lavender-bg p-[clamp(26px,3.6vw,48px)]">
    <span class="absolute left-6 top-[-26px] -rotate-[4deg] font-script text-[32px] leading-none text-plum">the brief</span>
    <p class="font-serif text-[clamp(19px,1.7vw,24px)] font-bold italic leading-[1.45] text-ink [text-wrap:pretty]">{{ block.text }}</p>
  </div>

  <p
    v-else-if="block.type === 'script'"
    :data-reveal="block.size === 'lg' ? 'up' : undefined"
    class="font-script text-plum"
    :class="block.size === 'lg' ? 'mt-[22px] max-w-[720px] text-[26px] leading-[1.3]' : 'mt-4 text-[24px] leading-[1.2]'"
  >{{ block.text }}</p>

  <p v-else-if="block.type === 'text'" class="mt-5 max-w-[700px] text-[17px] leading-[1.6] text-text">{{ block.text }}</p>

  <div v-else-if="block.type === 'standards'" class="mt-6 flex flex-wrap gap-2">
    <span
      v-for="s in block.items"
      :key="s"
      class="rounded-full border-[1.5px] border-ink px-[13px] py-[7px] font-mono text-[12px] tracking-[0.04em] text-ink"
    >{{ s }}</span>
  </div>

  <a
    v-else-if="block.type === 'cta'"
    :href="block.href"
    target="_blank"
    rel="noopener"
    class="mt-8 inline-flex items-center gap-[10px] rounded-xl bg-plum px-[22px] py-[15px] text-[15px] font-semibold text-white transition-colors hover:bg-ink"
  >{{ block.label }}</a>

  <div
    v-else-if="block.type === 'noteCard'"
    data-reveal="up"
    class="mt-7 flex -rotate-[0.6deg] items-start gap-4 rounded-[18px] bg-butter px-6 py-[22px] shadow-note"
  >
    <img :src="aboutData.photo" alt="" class="h-12 w-12 shrink-0 rounded-full border-2 border-white object-cover object-[center_28%]">
    <div>
      <p class="font-script text-[30px] leading-none text-plum">{{ block.heading }}</p>
      <p class="mt-[10px] text-[17px] leading-[1.6] text-ink">{{ block.text }}</p>
    </div>
  </div>
</template>
