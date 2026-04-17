export default defineNuxtConfig({
  srcDir: 'app/',
  ssr: false,
  nitro: { preset: 'github-pages' },
  compatibilityDate: '2025-07-15',
  app: {
    baseURL: '/',
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600&display=swap',
        },
      ],
    },
  },
  css: ['~/assets/css/base.css'],
  modules: ['@nuxtjs/tailwindcss'],
  components: [{ path: '~/components', pathPrefix: false }],
})
