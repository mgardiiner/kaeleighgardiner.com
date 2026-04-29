<script setup lang="ts">
interface Prototype {
  title: string
  caption: string
  image: string
}

const props = defineProps<{ prototypes: Prototype[] }>()

const items = computed(() => props.prototypes.slice(0, 3))
</script>

<template>
  <section v-if="items.length" class="bg-white px-6 py-[100px]">
    <div class="max-w-5xl mx-auto">
      <h2 class="font-display font-bold text-plum-900 mb-[60px]" style="font-size: 32px; line-height: 1.25;">
        Prototypes
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="(proto, i) in items" :key="i">
          <!-- Card -->
          <div
            class="rounded-3xl overflow-hidden shadow-card-proto mb-6"
            style="height: 280px;"
          >
            <img
              v-if="proto.image"
              :src="proto.image"
              :alt="proto.title"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full bg-plum-50 flex items-center justify-center"
            >
              <span class="text-plum-500 text-sm font-medium">screenshot</span>
            </div>
          </div>
          <!-- Title + caption -->
          <p class="font-display font-bold text-plum-900 text-[16px] leading-tight mb-3">{{ proto.title }}</p>
          <p class="text-slate-500 text-[16px] leading-[1.5]">{{ proto.caption }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
