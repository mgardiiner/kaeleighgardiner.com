<script setup lang="ts">
const props = defineProps<{ challenge: string }>()
</script>

<template>
  <section v-if="challenge" class="bg-plum-50 px-6" style="padding-top: 150px; padding-bottom: 150px;">
    <div class="max-w-5xl mx-auto text-center">
      <p
        class="font-display font-bold text-plum-900"
        style="font-size: clamp(28px, 4vw, 50px); line-height: 1.1;"
      >
        {{ challenge }}
      </p>
    </div>
  </section>
</template>
