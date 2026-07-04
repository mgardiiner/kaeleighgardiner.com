<script setup lang="ts">
defineProps<{
  heading: string
  subline?: string
}>()
</script>

<template>
  <section class="px-8 md:px-16 lg:px-32 py-16 md:py-[100px]">
    <div class="bg-plum-900 rounded-[20px] px-8 md:px-16 py-14 md:py-[80px] text-center">
      <h2
        class="font-serif font-bold text-plum-50 mx-auto"
        style="font-size: clamp(28px, 4vw, 44px); line-height: 1.15; max-width: 760px;"
      >
        {{ heading }}
      </h2>
      <p
        v-if="subline"
        class="text-plum-400 mt-4 mx-auto"
        style="font-size: 17px; line-height: 1.6; max-width: 560px;"
      >
        {{ subline }}
      </p>
      <div class="flex flex-wrap gap-3.5 justify-center mt-9">
        <slot name="actions">
          <a
            href="mailto:kaeleigh.gardiner@yahoo.ca"
            class="inline-block font-display font-semibold px-[30px] py-4 rounded-full bg-white text-plum-900 hover:bg-plum-50 transition-colors"
            style="font-size: 15px;"
          >
            Get in Touch
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            class="inline-block font-display font-semibold px-[30px] py-4 rounded-full text-plum-50 hover:bg-white/10 transition-colors"
            style="font-size: 15px; border: 1.5px solid rgba(194,181,214,0.5);"
          >
            Download Résumé
          </a>
        </slot>
      </div>
    </div>
  </section>
</template>
