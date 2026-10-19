<script setup lang="ts">
defineProps<{
  block: { items: { count: string; decimals?: number; suffix: string; label: string; basis?: string }[]; after?: string }
}>()
</script>

<template>
  <div>
    <div data-reveal="up" class="mt-7 rounded-[22px] bg-butter p-[clamp(22px,3vw,40px)] shadow-note">
      <div class="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))]">
        <div v-for="r in block.items" :key="r.label" class="border-t-2 border-ink pt-4">
          <p class="font-serif text-stat-result font-black italic leading-none text-ink">
            <span :data-count="r.count" :data-decimals="r.decimals ?? 0">{{ r.count }}</span><span class="text-[0.45em]">{{ r.suffix }}</span>
          </p>
          <p class="mt-[10px] text-[15px] leading-[1.45] text-text">{{ r.label }}</p>
          <!-- How the number was measured, so it never stands alone. -->
          <p v-if="r.basis" class="mt-2 text-[13px] leading-[1.45] text-muted">{{ r.basis }}</p>
        </div>
      </div>
    </div>
    <p v-if="block.after" class="mt-[22px] max-w-[680px] text-[17px] leading-[1.55] text-text">{{ block.after }}</p>
  </div>
</template>
