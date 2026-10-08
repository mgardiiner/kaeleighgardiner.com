// Prerendered at build time (see nitro.prerender.routes in nuxt.config.ts),
// so GitHub Pages serves it as a static file.
import projectsData from '../../app/data/projects.json'

const SITE = 'https://kaeleighgardiner.com'

const staticPaths = ['/', '/about', '/experience', '/projects']

export default defineEventHandler((event) => {
  const projectPaths = (projectsData as { slug?: string }[])
    .map((p) => p.slug)
    .filter(Boolean)
    .map((slug) => `/projects/${slug}`)

  const urls = [...staticPaths, ...projectPaths]
    .map((path) => `  <url><loc>${SITE}${path}</loc></url>`)
    .join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
})
