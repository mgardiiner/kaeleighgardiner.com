export default defineNuxtConfig({
  srcDir: 'app/',
  // Prerender to real HTML. With ssr:false the deploy served an empty
  // <div id="__nuxt"></div>, so crawlers saw no title, copy or headings.
  ssr: true,
  nitro: {
    preset: 'github-pages',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/404.html', '/sitemap.xml', '/admin'],
      failOnError: true,
    },
  },
  routeRules: {
    // The editor is browser-only (localStorage + GitHub API from the client).
    '/admin': { ssr: false, index: false },
    '/admin/**': { ssr: false, index: false },
  },
  compatibilityDate: '2025-07-15',
  app: {
    baseURL: '/',
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Kaeleigh Gardiner — UX Designer',
      meta: [
        {
          name: 'description',
          content:
            'Entry-level UX designer with 16 months of co-op at the Ontario Ministry of Transportation. Case studies in service design, research and accessible interfaces.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Kaeleigh Gardiner' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Arizonia&family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700;1,900&family=Roboto:wght@300;400;500;700;900&display=swap',
        },
      ],
    },
  },
  css: ['~/assets/css/base.css'],
  modules: ['@nuxtjs/tailwindcss'],
  components: [{ path: '~/components', pathPrefix: false }],
})
