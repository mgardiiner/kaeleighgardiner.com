export default defineNuxtConfig({
  srcDir: 'app/',
  // Prerender to real HTML. With ssr:false the deploy served an empty
  // <div id="__nuxt"></div>, so crawlers saw no title, copy or headings.
  ssr: true,
  nitro: {
    preset: 'github-pages',
    prerender: {
      crawlLinks: true,
      // The old standalone pages are listed so their redirect stubs get written.
      routes: ['/', '/404.html', '/sitemap.xml', '/admin', '/about', '/experience', '/projects'],
      failOnError: true,
    },
  },
  routeRules: {
    // The editor is browser-only (localStorage + GitHub API from the client).
    '/admin': { ssr: false, index: false },
    '/admin/**': { ssr: false, index: false },
    // About, Experience and the project index now live as sections on Home.
    '/about': { redirect: '/#about' },
    '/experience': { redirect: '/#experience' },
    '/projects': { redirect: '/#work' },
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
          href: 'https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@1,500;1,700;1,900&family=Arizonia&display=swap',
        },
      ],
      script: [
        {
          // Hide [data-reveal] elements until useScrollFx has set their start
          // state, so prerendered content doesn't flash before animating in.
          // The timeout is a safety net if the app never hydrates.
          innerHTML:
            "(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('fx-pending');setTimeout(function(){d.classList.remove('fx-pending')},3000)})()",
          tagPosition: 'head',
        },
      ],
    },
  },
  css: ['~/assets/css/base.css'],
  modules: ['@nuxtjs/tailwindcss'],
  components: [{ path: '~/components', pathPrefix: false }],
})
