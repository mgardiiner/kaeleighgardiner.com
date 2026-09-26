// Cloudflare Web Analytics: cookie-free visit counts, including the router's page changes.
// The token isn't secret; it ends up in the page either way.
const TOKEN = 'f38a6a95d0b04d038ae29f65d423be4d'

// Leave out local dev, the admin page, and a tab signed in to admin, so the owner's own visits
// don't count.
export default defineNuxtPlugin(() => {
  if (import.meta.dev || location.pathname.startsWith('/admin')) return
  if (sessionStorage.getItem('admin_token')) return

  const script = document.createElement('script')
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js'
  script.dataset.cfBeacon = JSON.stringify({ token: TOKEN, spa: true })
  document.head.append(script)
})
