<script setup lang="ts">
import aboutData from '~/data/about.json'
</script>

<template>
  <div class="bg-paper">

    <!-- Hero -->
    <div class="pt-[160px] px-8 md:px-16 lg:px-32 pb-0">
      <div class="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-16 lg:gap-20 items-center">

        <!-- Left: copy -->
        <div>
          <p class="font-display font-bold text-plum-700 mb-4 uppercase" style="font-size: 13px; letter-spacing: 0.18em;">About</p>
          <h1 class="font-serif font-bold text-plum-900" style="font-size: clamp(44px, 5.2vw, 72px); font-weight: 700; letter-spacing: -0.02em; line-height: 1.05;">
            Designer, researcher, <span class="italic text-plum-700">learner.</span>
          </h1>
          <p class="text-plum-900/75 mt-8" style="font-size: 18px; line-height: 1.65; max-width: 520px;">
            {{ aboutData.aboutCopy }}
          </p>

          <!-- Availability -->
          <div class="mt-9">
            <AvailabilityPill :label="aboutData.heroStatusLine" />
            <p class="text-plum-900/70 mt-4" style="font-size: 15px; line-height: 1.6; max-width: 520px;">
              <span class="font-semibold text-plum-900">Looking for:</span> {{ aboutData.lookingFor }}
            </p>
          </div>
        </div>

        <!-- Right: headshot -->
        <div class="flex justify-center lg:justify-end">
          <div class="relative shrink-0" style="width: 320px; height: 400px; max-width: 100%;">
            <!-- Decorative polygon -->
            <div
              class="absolute inset-0 pointer-events-none hidden sm:block"
              style="
                background: #533A71;
                opacity: 0.14;
                clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
                transform: translate(20px, 20px);
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
          <p class="font-display font-bold text-plum-700 uppercase mb-2" style="font-size: 11px; letter-spacing: 0.18em;">Education</p>
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

    <!-- Skills -->
    <div class="px-8 md:px-16 lg:px-32 mt-[100px]">
      <p class="font-display font-bold text-plum-700 uppercase mb-4" style="font-size: 13px; letter-spacing: 0.18em;">Expertise</p>
      <h2 class="font-serif font-bold text-plum-900 mb-10" style="font-size: clamp(30px, 4vw, 44px);">Skills</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div
          v-for="skill in aboutData.skillsSection"
          :key="skill.title"
          :class="['rounded-2xl transition-shadow duration-200 hover:shadow-card-proto', skill.bg]"
          style="padding: 30px;"
        >
          <SkillIcon :name="skill.icon" class="w-9 h-9 text-plum-700 mb-5" />
          <h3 class="font-display font-bold text-plum-900 mb-2.5" style="font-size: 20px;">{{ skill.title }}</h3>
          <p class="text-plum-900/70" style="font-size: 15px; line-height: 1.6;">{{ skill.desc }}</p>
        </div>
      </div>
    </div>

    <!-- Tools -->
    <div
      class="px-8 md:px-16 lg:px-32 mt-20 pt-10 pb-[100px]"
      style="border-top: 1px solid rgba(194,181,214,0.8);"
    >
      <p class="font-display font-bold text-plum-700 uppercase mb-6" style="font-size: 13px; letter-spacing: 0.18em;">Tools</p>
      <div class="flex flex-wrap gap-3">
        <span
          v-for="tool in aboutData.toolsList"
          :key="tool"
          class="font-display font-medium text-plum-900 rounded-full hover:bg-plum-50 transition-colors"
          style="font-size: 15px; padding: 10px 20px; border: 1px solid #C2B5D6;"
        >
          {{ tool }}
        </span>
      </div>
    </div>

    <!-- CTA band -->
    <CtaBand
      heading="Let's work together."
      subline="Have a role or project in mind? I'd love to hear about it."
    />

  </div>
</template>
