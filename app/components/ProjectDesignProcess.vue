<script setup lang="ts">
interface Step {
  n: string
  title: string
  desc: string
}
defineProps<{ steps: Step[] }>()
import { renderHtml } from '~/utils/renderHtml'
</script>

<template>
  <section v-if="steps.length" class="bg-white px-6 py-12 md:py-[80px] border-b border-slate-100">
    <div class="max-w-5xl mx-auto">
      <h2 class="font-display font-bold text-plum-900 text-center mb-[60px]" style="font-size: 32px; line-height: 1.25;">
        Design Process
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div v-for="(step, i) in steps" :key="i" class="flex flex-col items-center text-center">
          <div class="w-10 h-10 rounded-full bg-plum-50 border border-plum-200 flex items-center justify-center mb-4 shrink-0">
            <span class="text-plum-700 font-bold text-sm">{{ step.n }}</span>
          </div>
          <p class="font-display font-bold text-plum-900 text-[15px] mb-2">{{ step.title }}</p>
          <div class="prose-content text-slate-500 text-[14px] leading-[1.55]" v-html="renderHtml(step.desc)" />
        </div>
      </div>
    </div>
  </section>
</template>
