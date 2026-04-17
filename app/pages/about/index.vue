<script setup lang="ts">
const skills = [
  'User Research', 'Wireframing', 'Prototyping', 'Usability Testing',
  'Information Architecture', 'Interaction Design', 'Visual Design',
  'Figma', 'Service Design', 'Accessibility',
]
</script>

<template>
  <div class="pt-28 pb-24 px-6">
    <div class="max-w-5xl mx-auto">
      <div class="grid md:grid-cols-2 gap-16 items-start">
        <!-- Text -->
        <div>
          <h1 class="font-display text-5xl font-semibold text-slate-900 mb-6">About Me</h1>
          <p class="text-slate-600 text-lg leading-relaxed mb-5">
            I'm Kaeleigh, a UX Designer passionate about creating experiences that are both intuitive and meaningful. I believe great design starts with deeply understanding the people you're designing for.
          </p>
          <p class="text-slate-600 leading-relaxed mb-5">
            My work spans government services, enterprise systems, and consumer products — with a consistent focus on clarity, accessibility, and human-centred thinking.
          </p>
          <p class="text-slate-600 leading-relaxed mb-10">
            When I'm not designing, you'll find me illustrating, exploring new tools, or hunting for the perfect coffee shop.
          </p>

          <a
            href="/resume.pdf"
            target="_blank"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-purple-200 text-purple-700 font-medium hover:bg-purple-50 transition-colors"
          >
            View Resume
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <!-- Skills -->
        <div>
          <div class="rounded-2xl bg-purple-50 p-8">
            <h2 class="font-display text-2xl font-semibold text-slate-900 mb-6">Skills & Tools</h2>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="skill in skills"
                :key="skill"
                class="px-4 py-2 rounded-full bg-white border border-purple-100 text-sm text-slate-700 font-medium"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
