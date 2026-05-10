<script setup lang="ts">
const links = [
  { label: 'Work',       to: '/projects' },
  { label: 'Experience', to: '/experience' },
  { label: 'About',      to: '/about' },
]

const menuOpen = ref(false)
</script>

<template>
  <header class="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur">
    <div class="px-8 md:px-16 h-20 flex items-center justify-between max-w-[1440px] mx-auto">
      <NuxtLink to="/" class="font-script text-[30px] leading-none text-plum-900">
        Kaeleigh Gardiner
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-[15px] font-bold text-plum-900 hover:text-plum-700 transition-colors"
          active-class="text-plum-700"
        >
          {{ link.label }}
        </NuxtLink>
        <a
          href="mailto:kaeleigh.gardiner@yahoo.ca"
          class="text-[15px] font-bold px-[26px] py-[13px] rounded-full bg-plum-700 text-white hover:bg-plum-900 transition-colors"
        >
          Get in Touch
        </a>
      </nav>

      <button class="md:hidden p-2 text-plum-900" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
        <svg v-if="!menuOpen" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div v-if="menuOpen" class="md:hidden px-8 py-4 flex flex-col gap-4 bg-white border-t border-plum-400/30">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="text-sm font-bold text-plum-900 hover:text-plum-700 transition-colors"
        @click="menuOpen = false"
      >
        {{ link.label }}
      </NuxtLink>
      <a href="mailto:kaeleigh.gardiner@yahoo.ca" class="text-sm font-bold text-plum-700">
        kaeleigh.gardiner@yahoo.ca
      </a>
    </div>
  </header>
</template>
