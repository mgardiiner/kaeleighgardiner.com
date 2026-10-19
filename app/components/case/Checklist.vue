<script setup lang="ts">
defineProps<{ block: { label: string; items: string[] } }>()
</script>

<template>
  <div class="mt-[22px] rounded-lg bg-sky p-[22px] shadow-note">
    <span class="mono-label text-plum">{{ block.label }}</span>
    <ul>
      <li
        v-for="(item, i) in block.items"
        :key="item"
        data-reveal="up"
        :data-delay="i * 70"
        class="flex items-start gap-[14px] py-[14px]"
        :class="i === 0 ? 'mt-[6px]' : 'border-t border-ink/[0.12]'"
      >
        <span class="mt-[3px] h-[18px] flex-[0_0_18px] rounded-[5px] border-2 border-plum" aria-hidden="true" />
        <p class="text-[16px] leading-[1.5] text-ink">{{ item }}</p>
      </li>
    </ul>
  </div>
</template>
