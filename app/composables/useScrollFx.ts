import type { Ref } from 'vue'

// Scroll-driven motion, ported from the design handoff's scroll-fx.js.
// Everything is declared in markup with data attributes under `root`:
//  data-reveal="up|fade|left|right|scale|mask|blur|bar" data-delay="ms" data-dur="ms"
//      one-shot reveal when the element's top passes 94% of the viewport
//  data-progress (tall wrapper around a [data-sticky] child)
//      sets --p 0..1 while pinned; with data-steps="n" also sets --on / --past
//      on [data-step="i"] children. If [data-fit] is taller than the viewport
//      the section unpins and flows normally ([data-pin-only] is hidden and
//      [data-step-expand] steps all open).
//  data-enter            sets --e 0..1 (enter bottom → leave top) and --c -1..1 (offset from centre)
//  data-stack + [data-stack-card]  sets --x 0..1 on a card as the next one covers it
//  data-count="91.9" data-decimals="1"  counts up when revealed
//  data-page-progress    scaleX(page scroll progress)
//  data-section="id"     opts.onSection(id) for the last section above 40% of the viewport

const HIDE: Record<string, string> = {
  up: 'translateY(48px)', left: 'translateX(-56px)', right: 'translateX(56px)',
  scale: 'scale(0.92)', mask: 'translateY(108%)', fade: '', blur: 'translateY(16px)', bar: 'scaleX(0)',
}
const EASE = 'cubic-bezier(.16,.84,.24,1)'
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))

// The engine keeps its bookkeeping on the elements themselves.
type FxEl = HTMLElement & Record<string, any>

interface ScrollFxOptions {
  onSection?: (id: string | null) => void
}

export function initScrollFx(root: HTMLElement, opts: ScrollFxOptions = {}) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  let list: Record<string, FxEl[]> = { progress: [], enter: [], stack: [], bars: [], sections: [] }
  let curSection: string | null | undefined
  let dead = false
  let pending: FxEl[] = []

  function checkPending(vh: number) {
    if (!pending.length) return
    pending = pending.filter((el) => {
      if (!el.isConnected) return false
      const r = el.getBoundingClientRect()
      if (r.top < vh * 0.94 && r.bottom > 0) {
        if (el.hasAttribute('data-count')) runCount(el)
        if (el.__fxHidden) show(el)
        return false
      }
      return true
    })
  }

  function hide(el: FxEl) {
    const type = el.getAttribute('data-reveal') || 'up'
    const o = (el.__orig = { t: el.style.transform, o: el.style.opacity, tr: el.style.transition, f: el.style.filter })
    el.style.transition = 'none'
    el.style.transform = `${o.t || ''} ${HIDE[type] || ''}`.trim()
    if (type !== 'mask' && type !== 'bar') el.style.opacity = '0'
    if (type === 'blur') el.style.filter = 'blur(14px)'
    el.__fxHidden = true
  }

  function show(el: FxEl) {
    const o = el.__orig || {}
    const d = +(el.getAttribute('data-delay') ?? 0) || 0
    const dur = +(el.getAttribute('data-dur') ?? 0) || 1000
    el.style.transition = `transform ${dur}ms ${EASE} ${d}ms, opacity ${dur * 0.8}ms ease ${d}ms, filter ${dur}ms ${EASE} ${d}ms`
    void el.offsetWidth
    el.style.transform = o.t || ''
    el.style.opacity = o.o || ''
    el.style.filter = o.f || ''
    setTimeout(() => { if (!dead) el.style.transition = o.tr || '' }, d + dur + 50)
    el.__fxHidden = false
  }

  function runCount(el: FxEl) {
    if (el.__counted) return
    el.__counted = true
    const node = [...el.childNodes].find((n) => n.nodeType === 3)
    if (!node) return
    const final = node.nodeValue
    const target = parseFloat(el.getAttribute('data-count') ?? '')
    const dec = +(el.getAttribute('data-decimals') ?? 0) || 0
    const t0 = performance.now()
    const dur = 1600
    if (reduce || isNaN(target)) return
    const tick = () => {
      if (dead) { node.nodeValue = final; return }
      const k = clamp((performance.now() - t0) / dur)
      const e = 1 - Math.pow(2, -10 * k)
      node.nodeValue = (target * e).toFixed(dec)
      if (k < 1) setTimeout(tick, 16)
      else node.nodeValue = final
    }
    tick()
  }

  function scan() {
    const all = (sel: string) => [...root.querySelectorAll<FxEl>(sel)]
    list = {
      progress: all('[data-progress]'),
      enter: all('[data-enter]'),
      stack: all('[data-stack]'),
      bars: all('[data-page-progress]'),
      sections: all('[data-section]'),
    }
    all('[data-reveal]').forEach((el) => {
      if (el.__fx) return
      el.__fx = true
      if (!reduce) hide(el)
      pending.push(el)
    })
    all('[data-count]').forEach((el) => {
      if (!el.__fxc) { el.__fxc = true; pending.push(el) }
    })
    layout(true)
    update()
  }

  // Unpin sections whose content can't fit the viewport; keep sticky cards fully visible.
  let lw = 0
  let lh = 0
  function layout(force: boolean) {
    const vw = innerWidth
    const vh = innerHeight
    if (!force && vw === lw && vh === lh) return
    lw = vw
    lh = vh
    list.progress!.forEach((el) => {
      const st = el.querySelector<FxEl>('[data-sticky]')
      const fit = el.querySelector<FxEl>('[data-fit]')
      if (!st || !fit) return
      if (!st.__o) st.__o = { pos: st.style.position, h: st.style.height, mh: st.style.minHeight, eh: el.style.height }
      const tall = fit.offsetHeight > vh - 8
      if (tall === !!el.__unpinned) return
      el.__unpinned = tall
      el.__a = undefined
      el.querySelectorAll<HTMLElement>('[data-pin-only]').forEach((x) => { x.style.display = tall ? 'none' : '' })
      if (tall) {
        el.style.height = 'auto'
        st.style.position = 'relative'
        st.style.height = 'auto'
        st.style.minHeight = '0'
      } else {
        el.style.height = st.__o.eh
        st.style.position = st.__o.pos
        st.style.height = st.__o.h
        st.style.minHeight = st.__o.mh
      }
    })
    list.stack!.forEach((stk) => {
      stk.querySelectorAll<FxEl>('[data-stack-card]').forEach((c) => {
        if (c.__base == null) c.__base = parseFloat(c.style.top) || 0
        c.__top = Math.min(c.__base, vh - c.offsetHeight - 24)
        c.style.top = `${c.__top}px`
      })
    })
  }

  function update() {
    if (dead) return
    const vh = innerHeight
    layout(false)
    checkPending(vh)
    list.progress!.forEach((el) => {
      const r = el.getBoundingClientRect()
      const p = el.__unpinned
        ? clamp((vh * 0.6 - r.top) / Math.max(1, r.height - vh * 0.3))
        : clamp(-r.top / Math.max(1, r.height - vh))
      el.style.setProperty('--p', p.toFixed(4))
      const n = +(el.getAttribute('data-steps') ?? 0)
      if (n) {
        const a = Math.min(n - 1, Math.floor(p * n))
        if (el.__a !== a) {
          el.__a = a
          el.querySelectorAll<HTMLElement>('[data-step]').forEach((s) => {
            const i = +(s.getAttribute('data-step') ?? 0)
            const all = el.__unpinned && s.hasAttribute('data-step-expand')
            s.style.setProperty('--on', all || i === a ? '1' : '0')
            s.style.setProperty('--past', all || i <= a ? '1' : '0')
          })
        }
      }
    })
    list.enter!.forEach((el) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--e', clamp((vh - r.top) / (vh + r.height)).toFixed(4))
      el.style.setProperty('--c', clamp((r.top + r.height / 2 - vh / 2) / vh, -1, 1).toFixed(4))
    })
    list.stack!.forEach((st) => {
      const cards = [...st.querySelectorAll<FxEl>('[data-stack-card]')]
      cards.forEach((c, i) => {
        const next = cards[i + 1]
        if (!next) { c.style.setProperty('--x', '0'); return }
        const top = c.__top ?? (parseFloat(c.style.top) || 0)
        const ntop = next.__top ?? top
        c.style.setProperty('--x', clamp((vh - next.getBoundingClientRect().top) / Math.max(1, vh - ntop)).toFixed(4))
      })
    })
    const se = document.scrollingElement || document.documentElement
    const pp = clamp(se.scrollTop / Math.max(1, se.scrollHeight - vh))
    list.bars!.forEach((b) => { b.style.transform = `scaleX(${pp.toFixed(4)})` })
    if (opts.onSection && list.sections!.length) {
      let cur: string | null = null
      list.sections!.forEach((s) => {
        if (s.getBoundingClientRect().top < vh * 0.4) cur = s.getAttribute('data-section')
      })
      if (cur !== curSection) {
        curSection = cur
        opts.onSection(cur)
      }
    }
  }

  const onScroll = () => update()
  // Catches scroll changes that don't fire events (e.g. restored positions).
  let lastY = -1
  const poll = setInterval(() => {
    const y = (document.scrollingElement || document.documentElement).scrollTop
    if (y !== lastY) { lastY = y; update() }
  }, 200)
  addEventListener('scroll', onScroll, { passive: true })
  addEventListener('resize', onScroll)
  let mt: ReturnType<typeof setTimeout> | undefined
  const mo = new MutationObserver(() => { clearTimeout(mt); mt = setTimeout(scan, 80) })
  mo.observe(root, { childList: true, subtree: true })
  scan()
  // Start states are set, so the prerender guard can come off.
  document.documentElement.classList.remove('fx-pending')
  // Images and fonts change heights after first layout.
  const relayout = [400, 1200, 2500].map((t) => setTimeout(() => { layout(true); update() }, t))

  return () => {
    relayout.forEach(clearTimeout)
    clearTimeout(mt)
    dead = true
    clearInterval(poll)
    removeEventListener('scroll', onScroll)
    removeEventListener('resize', onScroll)
    mo.disconnect()
    root.querySelectorAll<FxEl>('[data-reveal],[data-count]').forEach((el) => {
      if (el.__fxHidden) {
        const o = el.__orig || {}
        el.style.transition = o.tr || ''
        el.style.transform = o.t || ''
        el.style.opacity = o.o || ''
        el.style.filter = o.f || ''
        el.__fxHidden = false
      }
      el.__fx = false
      el.__fxc = false
    })
  }
}

/** Runs the scroll engine over `root` for the lifetime of the calling component. */
export function useScrollFx(root: Ref<HTMLElement | null>, opts: ScrollFxOptions = {}) {
  let stop: (() => void) | undefined
  onMounted(() => {
    if (root.value) stop = initScrollFx(root.value, opts)
  })
  onBeforeUnmount(() => stop?.())
}
