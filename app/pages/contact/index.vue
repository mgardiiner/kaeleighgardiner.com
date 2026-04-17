<script setup lang="ts">
import contactData from '~/data/contact.json'

const contact = contactData
</script>

<template>
  <div class="pt-28 pb-24 px-6">
    <div class="max-w-2xl mx-auto text-center">
      <h1 class="font-display text-5xl font-semibold text-slate-900 mb-4">{{ contact.heading }}</h1>
      <p class="text-slate-500 text-lg mb-12 leading-relaxed">{{ contact.subheading }}</p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <a
          :href="`mailto:${contact.email}`"
          class="w-full sm:w-auto px-8 py-4 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors text-center"
        >
          {{ contact.email }}
        </a>
        <a
          v-if="contact.linkedin"
          :href="contact.linkedin"
          target="_blank"
          rel="noopener"
          class="w-full sm:w-auto px-8 py-4 rounded-full border border-purple-200 text-purple-700 font-medium hover:bg-purple-50 transition-colors text-center"
        >
          LinkedIn
        </a>
      </div>

      <p v-if="contact.footnote" class="text-slate-400 text-sm">{{ contact.footnote }}</p>
    </div>
  </div>
</template>
