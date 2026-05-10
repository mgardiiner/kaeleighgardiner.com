<script setup lang="ts">
defineProps<{
  name: string
  icon: string
  colorKey: string
}>()

const bgMap: Record<string, string> = {
  orange: 'bg-chip-orange',
  purple: 'bg-chip-purple',
  blue:   'bg-chip-blue',
  green:  'bg-chip-green',
  yellow: 'bg-chip-yellow',
}

const isHex = (k: string) => /^#[0-9a-fA-F]{3,6}$/.test(k)
</script>

<template>
  <div
    :class="['w-[65px] h-[65px] rounded-[10px] flex items-center justify-center shrink-0', isHex(colorKey) ? '' : (bgMap[colorKey] ?? 'bg-chip-purple')]"
    :style="isHex(colorKey) ? { backgroundColor: colorKey } : {}"
    :title="name"
  >
    <img v-if="icon" :src="icon" :alt="name" class="w-9 h-9 object-contain" />
    <span v-else class="text-xs font-bold text-plum-700">{{ name.slice(0, 2) }}</span>
  </div>
</template>
