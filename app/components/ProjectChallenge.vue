<script setup lang="ts">
import { renderHtml } from '~/utils/renderHtml'
const props = defineProps<{ challenge: string }>()
</script>

<template>
  <section v-if="challenge" class="bg-plum-50 px-6 py-16 md:py-24 lg:py-[150px]">
    <div class="max-w-5xl mx-auto text-center">
      <div
        class="prose-content font-display font-bold text-plum-900"
        style="font-size: clamp(28px, 4vw, 50px); line-height: 1.1;"
        v-html="renderHtml(challenge)"
      />
    </div>
  </section>
</template>
