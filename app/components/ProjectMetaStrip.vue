<script setup lang="ts">
interface Tool {
  name: string
  icon: string
  colorKey: string
}

defineProps<{
  company: string
  dateRange: string
  tools: Tool[]
  description: string
  role: string
}>()
</script>

<template>
  <section class="bg-white px-6 py-[100px]">
    <div class="max-w-5xl mx-auto">
      <div class="grid md:grid-cols-[290px_1fr] gap-x-[100px] gap-y-12">

        <!-- Left rail -->
        <div class="flex flex-col gap-[50px]">
          <div v-if="company">
            <p class="font-display font-bold text-[16px] text-plum-900 mb-2 leading-none">Company</p>
            <p class="text-slate-600 text-[18px] leading-[35px]">{{ company }}</p>
          </div>
          <div v-if="dateRange">
            <p class="font-display font-bold text-[16px] text-plum-900 mb-2 leading-none">Date</p>
            <p class="text-slate-600 text-[18px] leading-[35px]">{{ dateRange }}</p>
          </div>
          <div v-if="tools.length">
            <p class="font-display font-bold text-[16px] text-plum-900 mb-3 leading-none">Tools used</p>
            <div class="flex flex-wrap gap-[13px]">
              <ToolChip
                v-for="tool in tools"
                :key="tool.name"
                :name="tool.name"
                :icon="tool.icon"
                :colorKey="tool.colorKey"
              />
            </div>
          </div>
        </div>

        <!-- Right body -->
        <div>
          <div v-if="description">
            <p class="font-display font-bold text-[16px] text-plum-900 mb-3 leading-none">Overview</p>
            <p class="text-slate-600 text-[18px] leading-[35px] max-w-[728px]">{{ description }}</p>
          </div>
          <div v-if="role" class="mt-[50px]">
            <p class="font-display font-bold text-[16px] text-plum-900 mb-3 leading-none">My Role</p>
            <p class="text-slate-600 text-[18px] leading-[35px] max-w-[859px] whitespace-pre-line">{{ role }}</p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
