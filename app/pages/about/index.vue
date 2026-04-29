<script setup lang="ts">
import aboutData from '~/data/about.json'
</script>

<template>
  <div class="bg-paper">

    <!-- Hero -->
    <div class="pt-[160px] px-8 md:px-16 lg:px-32 pb-0">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-20">

        <!-- Left: copy -->
        <div>
          <p class="font-display font-bold text-plum-700 mb-4 uppercase" style="font-size: 13px; letter-spacing: 0.18em;">About</p>
          <h1 class="font-serif font-bold text-plum-900" style="font-size: clamp(48px, 5.5vw, 80px); font-weight: 700; letter-spacing: -0.02em; line-height: 1.05;">
            {{ aboutData.aboutHeadline }}
          </h1>
          <p class="text-plum-900/75 mt-8" style="font-size: 18px; line-height: 1.6; max-width: 480px;">
            {{ aboutData.aboutCopy }}
          </p>
        </div>

        <!-- Right: headshot -->
        <div class="flex justify-center lg:justify-end">
          <div class="relative shrink-0" style="width: 320px; height: 400px; max-width: 100%;">
            <!-- Decorative polygon -->
            <div
              class="absolute inset-0 pointer-events-none hidden sm:block"
              style="
                background: #533A71;
                opacity: 0.15;
                clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
                transform: translate(18px, 18px);
                border-radius: 16px;
                z-index: 0;
              "
            ></div>
            <div
              class="rounded-2xl overflow-hidden bg-plum-25 w-full h-full relative"
              style="box-shadow: 0 24px 48px rgba(83,58,113,0.15); z-index: 1;"
            >
              <img
                :src="aboutData.photo"
                alt="Kaeleigh Gardiner"
                class="w-full h-full object-cover"
                style="object-position: center 22%;"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick facts -->
    <div class="px-8 md:px-16 lg:px-32 mt-[100px] pt-10" style="border-top: 1px solid #0A0414;">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <p class="font-display font-bold text-plum-700 uppercase mb-2" style="font-size: 11px; letter-spacing: 0.18em;">Based In</p>
          <p class="font-display text-plum-900" style="font-size: 18px; font-weight: 500;">{{ aboutData.location }}</p>
        </div>
        <div>
          <p class="font-display font-bold text-plum-700 uppercase mb-2" style="font-size: 11px; letter-spacing: 0.18em;">Studying</p>
          <p class="font-display text-plum-900" style="font-size: 18px; font-weight: 500;">{{ aboutData.studyingLabel }}</p>
        </div>
        <div>
          <p class="font-display font-bold text-plum-700 uppercase mb-2" style="font-size: 11px; letter-spacing: 0.18em;">Currently</p>
          <p class="font-display text-plum-900" style="font-size: 18px; font-weight: 500;">{{ aboutData.availability }}</p>
        </div>
        <div>
          <p class="font-display font-bold text-plum-700 uppercase mb-2" style="font-size: 11px; letter-spacing: 0.18em;">Contact</p>
          <a
            :href="`mailto:${aboutData.email}`"
            class="font-display text-plum-900 hover:text-plum-700 transition-colors break-all"
            style="font-size: 18px; font-weight: 500;"
          >
            {{ aboutData.email }}
          </a>
        </div>
      </div>
    </div>

    <!-- Bio -->
    <div class="px-8 md:px-16 lg:px-32 mt-[100px] grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
      <div>
        <p class="font-display font-bold text-plum-700 uppercase mb-4" style="font-size: 13px; letter-spacing: 0.18em;">About Me</p>
        <h2 class="font-serif font-bold text-plum-900" style="font-size: 36px; font-weight: 700; line-height: 1.15;">A little more about who I am.</h2>
      </div>
      <div class="space-y-5">
        <p
          v-for="(para, i) in aboutData.bio"
          :key="i"
          class="text-plum-900/75"
          style="font-size: 17px; line-height: 1.75;"
        >{{ para }}</p>
      </div>
    </div>

    <!-- What I do -->
    <div class="px-8 md:px-16 lg:px-32 mt-[100px]">
      <h2 class="font-serif font-bold text-plum-900 mb-10" style="font-size: 44px; font-weight: 700;">What I do</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="skill in aboutData.whatIDo"
          :key="skill.title"
          :class="['rounded-xl', skill.bg]"
          style="padding: 32px; border-radius: 12px;"
        >
          <h3 class="font-display font-bold text-plum-900 mb-3" style="font-size: 22px;">{{ skill.title }}</h3>
          <p class="text-plum-900/70" style="font-size: 15px; line-height: 1.6;">{{ skill.desc }}</p>
        </div>
      </div>
    </div>

    <!-- Tools -->
    <div
      class="px-8 md:px-16 lg:px-32 mt-20 pt-10 pb-[100px]"
      style="border-top: 1px solid rgba(194,181,214,0.8);"
    >
      <p class="font-display font-bold text-plum-700 uppercase mb-5" style="font-size: 13px; letter-spacing: 0.18em;">Tools</p>
      <div class="flex flex-wrap gap-9">
        <span
          v-for="tool in aboutData.toolsList"
          :key="tool"
          class="font-display font-semibold text-plum-900"
          style="font-size: 18px;"
        >
          {{ tool }}
        </span>
      </div>
    </div>

  </div>
</template>
