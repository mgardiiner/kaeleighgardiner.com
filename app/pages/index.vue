<script setup lang="ts">
import projectsData from '~/data/projects.json'
import aboutData from '~/data/about.json'

const featured = projectsData.filter((p: any) => p.featured)
</script>

<template>
  <div>

    <!-- Hero -->
    <section class="pt-[120px] md:pt-[160px] lg:pt-[180px] pb-16 md:pb-20 px-8 md:px-16 lg:px-32 bg-white relative overflow-hidden">
      <!-- Purple ambient glow -->
      <div
        class="absolute pointer-events-none"
        style="right: -120px; top: -80px; width: 720px; height: 720px; background: radial-gradient(ellipse at center, rgba(194,181,214,0.38) 0%, transparent 68%); z-index: 0;"
      ></div>
      <p class="font-display font-bold text-plum-700 mb-6 uppercase relative z-10" style="font-size: 13px; letter-spacing: 0.18em;">
        {{ aboutData.heroEyebrow }}
      </p>
      <div class="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-center relative z-10">

        <!-- Copy -->
        <div>
          <h1
            class="font-display font-black text-plum-900 mb-7"
            style="font-size: clamp(44px, 7.8vw, 112px); font-weight: 900; letter-spacing: -0.03em; line-height: 0.95;"
          >
            {{ aboutData.heroHeading }}
          </h1>
          <p class="text-plum-900/70 mb-9" style="font-size: clamp(16px, 2vw, 19px); line-height: 1.55; max-width: 560px;">
            {{ aboutData.heroCopy }}
          </p>
          <div class="flex flex-wrap gap-3.5">
            <NuxtLink
              to="/projects"
              class="inline-block font-display font-semibold px-[30px] py-4 rounded-full bg-plum-700 text-white hover:bg-plum-900 transition-colors"
              style="font-size: 15px;"
            >
              View My Work →
            </NuxtLink>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener"
              class="inline-block font-display font-semibold px-[30px] py-4 rounded-full text-plum-900 hover:bg-plum-50 transition-colors"
              style="font-size: 15px; border: 1.5px solid #C2B5D6;"
            >
              Download Résumé
            </a>
          </div>
          <div class="flex items-center gap-2.5" style="margin-top: 40px;">
            <span
              class="inline-block rounded-full shrink-0"
              style="width: 8px; height: 8px; background: #22C55E; box-shadow: 0 0 0 4px rgba(34,197,94,0.18);"
            ></span>
            <span class="font-display font-semibold text-plum-900" style="font-size: 13px; letter-spacing: 0.04em;">
              {{ aboutData.heroStatusLine }}
            </span>
          </div>
        </div>

        <!-- Headshot -->
        <div class="flex justify-center lg:justify-end">
          <div class="relative w-full" style="max-width: 380px; aspect-ratio: 380 / 480;">
            <!-- Decorative polygon -->
            <div
              class="absolute inset-0 pointer-events-none hidden sm:block"
              style="
                background: #533A71;
                opacity: 0.15;
                clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
                transform: translate(22px, 22px);
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
    </section>

    <!-- Trust strip -->
    <div class="bg-plum-700 flex items-center justify-between flex-wrap gap-4 px-8 md:px-16 lg:px-32" style="padding-top: 18px; padding-bottom: 18px;">
      <span
        v-for="(client, i) in aboutData.trustClients"
        :key="client"
        :class="['font-display font-semibold text-plum-50 uppercase', i >= 2 ? 'hidden md:inline' : 'hidden sm:inline']"
        style="font-size: 13px; letter-spacing: 0.12em;"
      >{{ client }}</span>
    </div>

    <!-- Selected work -->
    <section class="px-8 md:px-16 lg:px-32 py-16 md:py-[120px] bg-white">
      <div class="flex justify-between items-end mb-10 md:mb-14">
        <div>
          <p class="font-display font-bold text-plum-700 mb-3 uppercase" style="font-size: 13px; letter-spacing: 0.18em;">
            SELECTED WORK · 2023–2025
          </p>
          <h2 class="font-serif font-bold text-plum-900" style="font-size: clamp(28px, 4.5vw, 56px);">Recent Projects</h2>
        </div>
        <NuxtLink to="/projects" class="text-plum-700 hover:text-plum-900 transition-colors font-medium shrink-0 ml-4" style="font-size: 14px;">
          View all →
        </NuxtLink>
      </div>

      <div class="flex flex-col gap-8">
        <ProjectCardHome
          v-for="(project, i) in featured"
          :key="project.slug"
          :project="project"
          :index="i"
        />
      </div>
    </section>

    <!-- How I work -->
    <section class="px-8 md:px-16 lg:px-32 py-16 md:py-[100px] bg-white">
      <div class="bg-paper rounded-3xl p-8 md:p-16">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">

          <!-- Heading -->
          <div>
            <p class="font-display font-bold text-plum-700 uppercase mb-3.5" style="font-size: 13px; letter-spacing: 0.18em;">HOW I WORK</p>
            <h3
              class="font-serif font-bold text-plum-900"
              style="font-size: clamp(26px, 3vw, 36px); font-weight: 700; line-height: 1.15; white-space: pre-line;"
            >{{ aboutData.howIWorkHeadline }}</h3>
          </div>

          <!-- Steps -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div v-for="step in aboutData.howIWorkSteps" :key="step.n">
              <p class="font-serif italic text-plum-400 mb-2" style="font-size: 28px; font-weight: 400; line-height: 1;">{{ step.n }}</p>
              <p class="font-display font-bold text-plum-900 mb-2" style="font-size: 17px;">{{ step.title }}</p>
              <p class="text-plum-900/70" style="font-size: 14px; line-height: 1.6;">{{ step.desc }}</p>
            </div>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>
