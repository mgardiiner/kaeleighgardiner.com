<script setup lang="ts">
import projectsData from '~/data/projects.json'
import aboutData from '~/data/about.json'

const capstone = projectsData.find((p: any) => p.featured && p.capstone)
const caseStudies = projectsData.filter((p: any) => p.featured && !p.capstone)
const testimonial = aboutData.testimonials?.[0]
</script>

<template>
  <div>

    <!-- Hero -->
    <section class="pt-[120px] md:pt-[160px] lg:pt-[180px] pb-16 md:pb-24 px-8 md:px-16 lg:px-32 bg-white relative overflow-hidden">
      <!-- Lavender ambient glow -->
      <div
        class="absolute pointer-events-none"
        style="right: -120px; top: -80px; width: 720px; height: 720px; background: radial-gradient(ellipse at center, rgba(194,181,214,0.4) 0%, transparent 68%); z-index: 0;"
      ></div>

      <div class="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-20 items-center relative z-10">

        <!-- Copy -->
        <div>
          <!-- Availability pill -->
          <AvailabilityPill :label="aboutData.heroStatusLine" class="mb-7" />

          <h1
            class="font-serif font-black text-plum-900 mb-9"
            style="font-size: clamp(40px, 6.6vw, 76px); font-weight: 900; letter-spacing: -0.02em; line-height: 1.03;"
          >
            Hi, I'm Kaeleigh
            <span class="italic text-plum-700 block">UX Designer</span>
          </h1>
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
        </div>

        <!-- Headshot -->
        <div class="flex justify-center lg:justify-end">
          <div class="relative w-full" style="max-width: 360px; aspect-ratio: 360 / 460;">
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
    </section>

    <!-- Credibility bar -->
    <section class="px-8 md:px-16 lg:px-32 bg-white">
      <div
        class="grid grid-cols-2 md:grid-cols-4 gap-px bg-plum-400/40 border-y"
        style="border-color: rgba(194,181,214,0.4);"
      >
        <div
          v-for="cell in aboutData.credibility"
          :key="cell.label"
          class="bg-white py-8 md:py-10 px-4 md:px-6"
        >
          <p class="font-serif font-bold text-plum-700 leading-none mb-2.5" style="font-size: 30px;">
            {{ cell.stat }}
          </p>
          <p class="text-plum-900/60" style="font-size: 13px; line-height: 1.4;">
            {{ cell.label }}
          </p>
        </div>
      </div>
    </section>

    <!-- What I do -->
    <section class="px-8 md:px-16 lg:px-32 py-16 md:py-[100px] bg-white">
      <p class="font-display font-bold text-plum-700 mb-8 uppercase" style="font-size: 13px; letter-spacing: 0.18em;">What I do</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div
          v-for="skill in aboutData.whatIDo"
          :key="skill.title"
          :class="['rounded-2xl', skill.bg]"
          style="padding: 30px;"
        >
          <h3 class="font-display font-bold text-plum-900 mb-3" style="font-size: 22px;">{{ skill.title }}</h3>
          <p class="text-plum-900/70" style="font-size: 15px; line-height: 1.6;">{{ skill.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Selected work -->
    <section class="px-8 md:px-16 lg:px-32 pb-16 md:pb-[120px] bg-white">
      <div class="flex justify-between items-end mb-10 md:mb-14">
        <h2 class="font-serif font-bold text-plum-900" style="font-size: clamp(28px, 4.5vw, 44px);">Selected work</h2>
        <NuxtLink to="/projects" class="text-plum-700 hover:text-plum-900 transition-colors font-medium shrink-0 ml-4" style="font-size: 14px;">
          View all projects →
        </NuxtLink>
      </div>

      <!-- Capstone hero card -->
      <ProjectFeaturedCard v-if="capstone" :project="capstone" class="mb-8" />

      <!-- Case-study grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProjectCard
          v-for="p in caseStudies"
          :key="p.slug"
          :project="p"
          variant="grid"
        />
      </div>
    </section>

    <!-- How I work -->
    <section class="px-8 md:px-16 lg:px-32 pb-16 md:pb-[100px] bg-white">
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

    <!-- Testimonial -->
    <section v-if="testimonial" class="px-8 md:px-16 lg:px-32 pb-16 md:pb-[100px] bg-white">
      <div class="max-w-[880px] mx-auto text-center">
        <p class="font-serif italic text-plum-700" style="font-size: clamp(21px, 2.6vw, 26px); line-height: 1.5;">
          “{{ testimonial.quote }}”
        </p>
        <p class="font-display font-bold text-plum-900 mt-8" style="font-size: 15px;">{{ testimonial.name }}</p>
        <p class="text-plum-500 mt-1" style="font-size: 14px;">{{ testimonial.title }}</p>
      </div>
    </section>

    <!-- CTA band -->
    <CtaBand
      heading="Looking for a research-led UX designer?"
      subline="I'm open to entry-level UX and product design roles starting in 2026 — in Toronto or hybrid."
    />

  </div>
</template>
