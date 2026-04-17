<script setup lang="ts">
const links = [
  { label: 'Work',       to: '/work' },
  { label: 'Experience', to: '/experience' },
  { label: 'About',      to: '/about' },
]

const menuOpen = ref(false)
</script>

<template>
  <header class="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-purple-100">
    <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <NuxtLink to="/" class="font-display text-xl font-semibold text-purple-700 tracking-tight">
        Kaeleigh Gardiner
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-sm font-medium text-slate-600 hover:text-purple-700 transition-colors"
          active-class="text-purple-700"
        >
          {{ link.label }}
        </NuxtLink>
        <a
          href="mailto:kaeleigh.gardiner@yahoo.ca"
          class="text-sm font-medium px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
        >
          Get in Touch
        </a>
      </nav>

      <button class="md:hidden p-2 text-slate-600" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
        <svg v-if="!menuOpen" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div v-if="menuOpen" class="md:hidden border-t border-purple-100 px-6 py-4 flex flex-col gap-4 bg-white">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="text-sm font-medium text-slate-600 hover:text-purple-700 transition-colors"
        @click="menuOpen = false"
      >
        {{ link.label }}
      </NuxtLink>
      <a href="mailto:kaeleigh.gardiner@yahoo.ca" class="text-sm font-medium text-purple-700">
        kaeleigh.gardiner@yahoo.ca
      </a>
    </div>
  </header>
</template>
