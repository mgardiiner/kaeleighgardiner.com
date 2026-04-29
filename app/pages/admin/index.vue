<script setup lang="ts">
definePageMeta({ layout: 'admin' })

import projectsData from '~/data/projects.json'
import aboutData from '~/data/about.json'
import contactData from '~/data/contact.json'
import experienceData from '~/data/experience.json'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Section {
  heading: string
  body: string
}

interface Tool {
  name: string
  icon: string
  colorKey: string
}

interface Prototype {
  title: string
  caption: string
  image: string
}

interface Project {
  title: string
  slug: string
  year: string
  dateRange?: string
  company?: string
  tags: string[]
  tag?: string
  stat?: string
  statLabel?: string
  meta?: string
  bg?: string
  description: string
  featured: boolean
  cardStyle: 'plum' | 'white'
  thumbnail: string
  heroImage?: string
  heroGradient: { from: string; to: string }
  tools: Tool[]
  role: string
  challenge: string
  backgroundInfo: string
  insights: string
  prototypes: Prototype[]
  extraSections: Section[]
  prevSlug: string | null
  nextSlug: string | null
}

interface WorkStep {
  n: string
  title: string
  desc: string
}

interface WhatIDoItem {
  title: string
  desc: string
  bg: string
}

interface About {
  heroEyebrow: string
  heroHeading: string
  heroCopy: string
  heroStatusLine: string
  trustClients: string[]
  howIWorkHeadline: string
  howIWorkSteps: WorkStep[]
  aboutHeadline: string
  aboutCopy: string
  studyingLabel: string
  whatIDo: WhatIDoItem[]
  toolsList: string[]
  heroSkills: string[]
  heroCta: { label: string; href: string }
  marqueeItems: string[]
  photo: string
  bio: string[]
  location: string
  availability: string
  education: { degree: string; institution: string; years: string }
  email: string
  linkedin: string
  skills: string[]
  testimonials: { quote: string; name: string; title: string }[]
}

interface Role {
  title: string
  company: string
  type: string
  startDate: string
  endDate: string
  location: string
  bullets: string[]
}

interface Contact {
  heading: string
  subheading: string
  email: string
  linkedin: string
  footnote: string
}

// ── Auth ──────────────────────────────────────────────────────────────────────

const REPO_OWNER = 'mgardiiner'
const REPO_NAME  = 'kaeleighgardiner.com'

const tokenInput = ref('')
const token      = ref(sessionStorage.getItem('admin_token') || '')
const authed     = ref(!!sessionStorage.getItem('admin_token'))
const verifying  = ref(false)
const loginError = ref('')

async function saveCredentials() {
  verifying.value = true
  loginError.value = ''
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/app/data/projects.json`,
      { headers: { Authorization: `Bearer ${tokenInput.value}`, Accept: 'application/vnd.github+json' } },
    )
    if (res.status === 401 || res.status === 403) { loginError.value = 'Invalid token or missing permissions.'; return }
    if (!res.ok) { loginError.value = `Could not verify token (${res.status}).`; return }
    token.value = tokenInput.value
    sessionStorage.setItem('admin_token', token.value)
    authed.value = true
  } catch { loginError.value = 'Network error — check your connection.' }
  finally { verifying.value = false }
}

function logout() {
  sessionStorage.clear()
  token.value = ''
  tokenInput.value = ''
  authed.value = false
}

// ── Nav ───────────────────────────────────────────────────────────────────────

type AdminSection = 'homepage' | 'projects' | 'experience' | 'about' | 'testimonials' | 'contact' | 'resume'
const activeSection = ref<AdminSection>('homepage')

// ── Projects ──────────────────────────────────────────────────────────────────

const GRADIENT_PRESETS = [
  { label: 'Plum', from: '#A799B7', to: '#533A71' },
  { label: 'Rose', from: '#B96668', to: '#F8DCDD' },
  { label: 'Gold', from: '#FFF6D0', to: '#FFD04E' },
  { label: 'Sage', from: '#C8DDD4', to: '#5B8C75' },
]
const CHIP_COLORS = ['orange', 'purple', 'blue', 'green', 'yellow']
const BG_OPTIONS  = [
  { label: 'Tint (plum-25)', value: 'tint' },
  { label: 'Plum', value: 'plum' },
]

const projects    = ref<Project[]>(JSON.parse(JSON.stringify(projectsData)))
const activeSlug  = ref(projects.value[0]?.slug ?? '')
const activeProject = computed(() => projects.value.find(p => p.slug === activeSlug.value) ?? null)

function slugify(title: string) {
  return title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
}
function rebuildNav() {
  const ps = projects.value
  ps.forEach((p, i) => {
    p.prevSlug = ps[i - 1]?.slug ?? ps[ps.length - 1]?.slug ?? null
    p.nextSlug = ps[i + 1]?.slug ?? ps[0]?.slug ?? null
  })
}
function addProject() {
  const slug = slugify('New Project') + '-' + Date.now()
  projects.value.push({
    title: 'New Project', slug, year: String(new Date().getFullYear()),
    tags: [], description: '', featured: false, cardStyle: 'plum',
    thumbnail: '', heroGradient: { from: '#A799B7', to: '#533A71' },
    tools: [], role: '', challenge: '', backgroundInfo: '', insights: '',
    prototypes: [], extraSections: [{ heading: 'Overview', body: '' }],
    prevSlug: null, nextSlug: null,
  })
  rebuildNav()
  activeSection.value = 'projects'
  activeSlug.value = slug
}
function removeProject(slug: string) {
  const idx = projects.value.findIndex(p => p.slug === slug)
  if (idx === -1) return
  projects.value.splice(idx, 1)
  rebuildNav()
  activeSlug.value = projects.value[Math.max(0, idx - 1)]?.slug ?? ''
}
function tagsString(p: Project) { return p.tags.join(', ') }
function updateTags(p: Project, v: string) { p.tags = v.split(',').map(t => t.trim()).filter(Boolean) }
function addExtraSection(p: Project) { p.extraSections.push({ heading: 'New Section', body: '' }) }
function removeExtraSection(p: Project, i: number) { p.extraSections.splice(i, 1) }
function addTool(p: Project) { p.tools.push({ name: '', icon: '', colorKey: 'purple' }) }
function removeTool(p: Project, i: number) { p.tools.splice(i, 1) }
function ensurePrototypes(p: Project) { while (p.prototypes.length < 3) p.prototypes.push({ title: '', caption: '', image: '' }) }

// ── About ─────────────────────────────────────────────────────────────────────

const about = ref<About>(JSON.parse(JSON.stringify(aboutData)))

const bioText = computed({
  get: () => about.value.bio.join('\n\n'),
  set: (val: string) => { about.value.bio = val.split(/\n\n+/).map(s => s.trim()).filter(Boolean) },
})
const skillsText = computed({
  get: () => about.value.skills.join(', '),
  set: (val: string) => { about.value.skills = val.split(',').map(s => s.trim()).filter(Boolean) },
})
const toolsListText = computed({
  get: () => about.value.toolsList?.join(', ') ?? '',
  set: (val: string) => { about.value.toolsList = val.split(',').map(s => s.trim()).filter(Boolean) },
})

// ── Contact ───────────────────────────────────────────────────────────────────

const contact = ref<Contact>(JSON.parse(JSON.stringify(contactData)))

// ── Experience ────────────────────────────────────────────────────────────────

const roles = ref<Role[]>(JSON.parse(JSON.stringify(experienceData.roles)))

function addRole() { roles.value.push({ title: 'New Role', company: '', type: '', startDate: '', endDate: '', location: '', bullets: [''] }) }
function removeRole(i: number) { roles.value.splice(i, 1) }
function addBullet(r: Role) { r.bullets.push('') }
function removeBullet(r: Role, i: number) { r.bullets.splice(i, 1) }

// ── Save ──────────────────────────────────────────────────────────────────────

const saving     = ref(false)
const saveStatus = ref<'idle' | 'success' | 'error'>('idle')
const saveMessage = ref('')

async function githubPut(filePath: string, content: string, msg: string) {
  const base = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`
  const headers = { Authorization: `Bearer ${token.value}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' }
  const headRes = await fetch(base, { headers })
  const sha = headRes.ok ? (await headRes.json()).sha : undefined
  const encoded = btoa(unescape(encodeURIComponent(content)))
  const res = await fetch(base, { method: 'PUT', headers, body: JSON.stringify({ message: msg, content: encoded, sha }) })
  if (!res.ok) { const e = await res.json(); throw new Error(e.message || res.statusText) }
}

async function githubPutBinary(filePath: string, base64: string, msg: string) {
  const base = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`
  const headers = { Authorization: `Bearer ${token.value}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' }
  const headRes = await fetch(base, { headers })
  const sha = headRes.ok ? (await headRes.json()).sha : undefined
  const res = await fetch(base, { method: 'PUT', headers, body: JSON.stringify({ message: msg, content: base64, sha }) })
  if (!res.ok) { const e = await res.json(); throw new Error(e.message || res.statusText) }
}

async function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload  = () => resolve((reader.result as string).split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// ── Image uploads ─────────────────────────────────────────────────────────────

const uploadingPhoto    = ref(false)
const uploadingImage    = ref(false)
const uploadingHero     = ref(false)
const uploadingToolIcon: Record<number, boolean> = reactive({})
const uploadingProtoImg: Record<number, boolean> = reactive({})

async function uploadAboutPhoto(file: File) {
  uploadingPhoto.value = true
  try {
    const ext = file.name.split('.').pop() ?? 'jpg'
    const filename = `headshot-${Date.now()}.${ext}`
    await githubPutBinary(`public/images/${filename}`, await readFileAsBase64(file), 'chore: update about headshot via admin')
    about.value.photo = `/images/${filename}`
  } catch (err: any) { saveStatus.value = 'error'; saveMessage.value = `Photo upload failed: ${err.message}` }
  finally { uploadingPhoto.value = false }
}

async function uploadThumbnail(project: Project, file: File) {
  uploadingImage.value = true
  try {
    const ext = file.name.split('.').pop() ?? 'png'
    const filename = `${project.slug}-${Date.now()}.${ext}`
    await githubPutBinary(`public/images/projects/${filename}`, await readFileAsBase64(file), `chore: upload thumbnail for ${project.slug}`)
    project.thumbnail = `/images/projects/${filename}`
  } catch (err: any) { saveStatus.value = 'error'; saveMessage.value = `Upload failed: ${err.message}` }
  finally { uploadingImage.value = false }
}

async function uploadHeroImage(project: Project, file: File) {
  uploadingHero.value = true
  try {
    const ext = file.name.split('.').pop() ?? 'png'
    const filename = `${project.slug}-hero-${Date.now()}.${ext}`
    await githubPutBinary(`public/images/projects/${filename}`, await readFileAsBase64(file), `chore: upload hero image for ${project.slug}`)
    project.heroImage = `/images/projects/${filename}`
  } catch (err: any) { saveStatus.value = 'error'; saveMessage.value = `Upload failed: ${err.message}` }
  finally { uploadingHero.value = false }
}

async function uploadToolIcon(project: Project, ti: number, file: File) {
  uploadingToolIcon[ti] = true
  try {
    const ext = file.name.split('.').pop() ?? 'png'
    const name = project.tools[ti].name.toLowerCase().replace(/\s+/g, '-') || String(ti)
    const filename = `tool-${name}-${Date.now()}.${ext}`
    await githubPutBinary(`public/images/tools/${filename}`, await readFileAsBase64(file), 'chore: upload tool icon')
    project.tools[ti].icon = `/images/tools/${filename}`
  } catch (err: any) { saveStatus.value = 'error'; saveMessage.value = `Upload failed: ${err.message}` }
  finally { uploadingToolIcon[ti] = false }
}

async function uploadProtoImage(project: Project, pi: number, file: File) {
  uploadingProtoImg[pi] = true
  try {
    const ext = file.name.split('.').pop() ?? 'png'
    const filename = `${project.slug}-proto${pi + 1}-${Date.now()}.${ext}`
    await githubPutBinary(`public/images/projects/${filename}`, await readFileAsBase64(file), `chore: upload prototype image for ${project.slug}`)
    project.prototypes[pi].image = `/images/projects/${filename}`
  } catch (err: any) { saveStatus.value = 'error'; saveMessage.value = `Upload failed: ${err.message}` }
  finally { uploadingProtoImg[pi] = false }
}

// ── Resume ────────────────────────────────────────────────────────────────────

const uploadingResume = ref(false)
const resumeStatus    = ref<'idle' | 'success' | 'error'>('idle')
const resumeMessage   = ref('')

async function uploadResume(file: File) {
  uploadingResume.value = true; resumeStatus.value = 'idle'
  try {
    await githubPutBinary('public/resume.pdf', await readFileAsBase64(file), 'chore: update resume via admin')
    resumeStatus.value = 'success'; resumeMessage.value = 'Resume uploaded. Goes live after CI deploys.'
  } catch (err: any) { resumeStatus.value = 'error'; resumeMessage.value = err.message }
  finally { uploadingResume.value = false }
}

// ── Save functions ────────────────────────────────────────────────────────────

async function saveAbout() {
  saving.value = true; saveStatus.value = 'idle'
  try {
    await githubPut('app/data/about.json', JSON.stringify(about.value, null, 2), 'chore: update about content via admin')
    saveStatus.value = 'success'; saveMessage.value = 'Saved. Changes go live after CI deploys.'
  } catch (err: any) { saveStatus.value = 'error'; saveMessage.value = err.message }
  finally { saving.value = false }
}

async function saveProjects() {
  saving.value = true; saveStatus.value = 'idle'
  try {
    rebuildNav()
    await githubPut('app/data/projects.json', JSON.stringify(projects.value, null, 2), 'chore: update projects via admin')
    saveStatus.value = 'success'; saveMessage.value = 'Projects saved. Changes go live after CI deploys.'
  } catch (err: any) { saveStatus.value = 'error'; saveMessage.value = err.message }
  finally { saving.value = false }
}

async function saveContact() {
  saving.value = true; saveStatus.value = 'idle'
  try {
    await githubPut('app/data/contact.json', JSON.stringify(contact.value, null, 2), 'chore: update contact via admin')
    saveStatus.value = 'success'; saveMessage.value = 'Contact saved. Changes go live after CI deploys.'
  } catch (err: any) { saveStatus.value = 'error'; saveMessage.value = err.message }
  finally { saving.value = false }
}

async function saveExperience() {
  saving.value = true; saveStatus.value = 'idle'
  try {
    await Promise.all([
      githubPut('app/data/experience.json', JSON.stringify({ roles: roles.value }, null, 2), 'chore: update experience via admin'),
      githubPut('app/data/about.json', JSON.stringify(about.value, null, 2), 'chore: update skills via admin'),
    ])
    saveStatus.value = 'success'; saveMessage.value = 'Experience saved. Changes go live after CI deploys.'
  } catch (err: any) { saveStatus.value = 'error'; saveMessage.value = err.message }
  finally { saving.value = false }
}

function handleSave() {
  if      (activeSection.value === 'homepage')     saveAbout()
  else if (activeSection.value === 'projects')     saveProjects()
  else if (activeSection.value === 'experience')   saveExperience()
  else if (activeSection.value === 'about')        saveAbout()
  else if (activeSection.value === 'testimonials') saveAbout()
  else if (activeSection.value === 'contact')      saveContact()
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const inputCls = 'w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-plum-500'
const labelCls = 'block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5'
const cardCls  = 'rounded-xl border border-slate-200 bg-white p-6 space-y-4'
</script>

<template>
  <div class="min-h-screen bg-slate-50">

    <!-- Login -->
    <div v-if="!authed" class="flex items-center justify-center min-h-screen px-6">
      <div class="w-full max-w-sm bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h1 class="font-display font-bold text-2xl text-slate-900 mb-2">Admin</h1>
        <p class="text-slate-500 text-sm mb-6">
          Enter your GitHub Personal Access Token.<br>
          Needs <code class="text-plum-700">Contents: Read &amp; Write</code> permission.
        </p>
        <div class="space-y-4">
          <div>
            <label :class="labelCls">GitHub Token</label>
            <input v-model="tokenInput" type="password" placeholder="ghp_..." :class="inputCls" />
          </div>
          <p v-if="loginError" class="text-red-500 text-xs">{{ loginError }}</p>
          <button @click="saveCredentials" :disabled="!tokenInput || verifying" class="w-full px-4 py-2 rounded-full bg-plum-700 text-white text-sm font-medium hover:bg-plum-900 transition-colors disabled:opacity-40">
            {{ verifying ? 'Verifying…' : 'Enter Admin' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Admin UI -->
    <div v-else class="flex h-screen overflow-hidden">

      <!-- Sidebar -->
      <aside class="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col">
        <div class="px-4 py-4 border-b border-slate-100">
          <p class="text-xs font-bold text-plum-700 uppercase tracking-widest">Admin</p>
        </div>
        <nav class="flex-1 overflow-y-auto py-3">
          <p class="px-4 mb-1 text-xs font-semibold text-slate-400 uppercase tracking-widest">Pages</p>

          <button @click="activeSection = 'homepage'" :class="['w-full text-left px-4 py-2 text-sm font-medium transition-colors', activeSection === 'homepage' ? 'text-plum-700 bg-plum-50' : 'text-slate-600 hover:bg-slate-50']">Homepage</button>

          <!-- Projects group -->
          <div class="mb-1">
            <button @click="activeSection = 'projects'" :class="['w-full text-left px-4 py-2 text-sm font-medium transition-colors', activeSection === 'projects' ? 'text-plum-700 bg-plum-50' : 'text-slate-600 hover:bg-slate-50']">Projects</button>
            <div v-if="activeSection === 'projects'" class="ml-4 border-l border-slate-100 pl-2 py-1">
              <button
                v-for="p in projects" :key="p.slug"
                @click="activeSlug = p.slug"
                :class="['group flex w-full items-center justify-between pr-1 py-1 text-xs transition-colors rounded', activeSlug === p.slug ? 'text-plum-700 font-medium' : 'text-slate-500 hover:text-slate-800']"
              >
                <span class="truncate">{{ p.title }}</span>
                <span @click.stop="removeProject(p.slug)" class="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all ml-1 shrink-0">✕</span>
              </button>
              <button @click="addProject" class="mt-1 text-xs text-plum-700 hover:text-plum-900 font-medium">+ Add project</button>
            </div>
          </div>

          <button @click="activeSection = 'experience'"   :class="['w-full text-left px-4 py-2 text-sm font-medium transition-colors', activeSection === 'experience'   ? 'text-plum-700 bg-plum-50' : 'text-slate-600 hover:bg-slate-50']">Experience</button>
          <button @click="activeSection = 'about'"        :class="['w-full text-left px-4 py-2 text-sm font-medium transition-colors', activeSection === 'about'        ? 'text-plum-700 bg-plum-50' : 'text-slate-600 hover:bg-slate-50']">About</button>
          <button @click="activeSection = 'testimonials'" :class="['w-full text-left px-4 py-2 text-sm font-medium transition-colors', activeSection === 'testimonials' ? 'text-plum-700 bg-plum-50' : 'text-slate-600 hover:bg-slate-50']">Testimonials</button>
          <button @click="activeSection = 'contact'"      :class="['w-full text-left px-4 py-2 text-sm font-medium transition-colors', activeSection === 'contact'      ? 'text-plum-700 bg-plum-50' : 'text-slate-600 hover:bg-slate-50']">Contact</button>
          <button @click="activeSection = 'resume'"       :class="['w-full text-left px-4 py-2 text-sm font-medium transition-colors', activeSection === 'resume'       ? 'text-plum-700 bg-plum-50' : 'text-slate-600 hover:bg-slate-50']">Resume</button>
        </nav>

        <div class="px-4 py-4 border-t border-slate-100 space-y-2">
          <button v-if="activeSection !== 'resume'" @click="handleSave" :disabled="saving" class="w-full px-4 py-2 rounded-full bg-plum-700 text-white text-sm font-medium hover:bg-plum-900 transition-colors disabled:opacity-50">
            {{ saving ? 'Saving…' : 'Save to GitHub' }}
          </button>
          <a
            :href="activeSection === 'projects' && activeProject ? `/projects/${activeProject.slug}` : activeSection === 'about' || activeSection === 'testimonials' ? '/about' : activeSection === 'experience' ? '/experience' : activeSection === 'contact' ? '/contact' : '/'"
            target="_blank"
            rel="noopener"
            class="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 text-slate-500 text-sm hover:bg-slate-50 transition-colors"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            Preview page
          </a>
          <button @click="logout" class="w-full px-4 py-2 rounded-full border border-slate-200 text-slate-500 text-sm hover:bg-slate-50 transition-colors">Log out</button>
        </div>
      </aside>

      <!-- Editor -->
      <main class="flex-1 overflow-y-auto">
        <div class="max-w-2xl mx-auto px-8 py-10">

          <!-- Status banner -->
          <div v-if="saveStatus !== 'idle'" :class="['rounded-xl px-4 py-3 text-sm mb-8', saveStatus === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200']">
            {{ saveMessage }}
          </div>

          <!-- ── HOMEPAGE ── -->
          <template v-if="activeSection === 'homepage'">
            <h2 class="font-display font-bold text-2xl text-slate-900 mb-8">Homepage</h2>

            <!-- Hero copy -->
            <div :class="cardCls + ' mb-6'">
              <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hero</h3>
              <div>
                <label :class="labelCls">Eyebrow</label>
                <input v-model="about.heroEyebrow" type="text" :class="inputCls" placeholder="UX DESIGNER · TORONTO, CANADA · OPEN TO ROLES" />
              </div>
              <div>
                <label :class="labelCls">Heading</label>
                <input v-model="about.heroHeading" type="text" :class="inputCls" placeholder="Hi, I'm Kaeleigh." />
              </div>
              <div>
                <label :class="labelCls">Sub-copy</label>
                <textarea v-model="about.heroCopy" rows="2" :class="inputCls + ' resize-y'" />
              </div>
              <div>
                <label :class="labelCls">Status Line</label>
                <input v-model="about.heroStatusLine" type="text" :class="inputCls" placeholder="Currently open to entry-level UX roles · 2026" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label :class="labelCls">CTA Label</label>
                  <input v-model="about.heroCta.label" type="text" :class="inputCls" />
                </div>
                <div>
                  <label :class="labelCls">CTA URL</label>
                  <input v-model="about.heroCta.href" type="text" :class="inputCls" />
                </div>
              </div>
            </div>

            <!-- Trust strip -->
            <div :class="cardCls + ' mb-6'">
              <div class="flex items-center justify-between">
                <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Trust Strip Clients</h3>
                <button @click="about.trustClients.push('')" class="text-xs text-plum-700 font-medium hover:underline underline-offset-4">+ Add</button>
              </div>
              <p class="text-xs text-slate-400 -mt-2">First 2 show on tablet, all on desktop.</p>
              <div class="space-y-2">
                <div v-for="(_, ci) in about.trustClients" :key="ci" class="flex gap-2 items-center">
                  <input v-model="about.trustClients[ci]" type="text" :class="'flex-1 ' + inputCls" placeholder="Client name" />
                  <button @click="about.trustClients.splice(ci, 1)" class="text-slate-300 hover:text-red-400 shrink-0 transition-colors">✕</button>
                </div>
              </div>
            </div>

            <!-- How I Work -->
            <div :class="cardCls + ' mb-6'">
              <div class="flex items-center justify-between">
                <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">How I Work</h3>
                <button @click="about.howIWorkSteps.push({ n: String(about.howIWorkSteps.length + 1).padStart(2, '0'), title: '', desc: '' })" class="text-xs text-plum-700 font-medium hover:underline underline-offset-4">+ Add step</button>
              </div>
              <div>
                <label :class="labelCls">Section Headline</label>
                <textarea v-model="about.howIWorkHeadline" rows="2" :class="inputCls + ' resize-y'" />
                <p class="text-xs text-slate-400 mt-1">Use a new line to create a line break in the heading.</p>
              </div>
              <div class="space-y-3">
                <div v-for="(step, si) in about.howIWorkSteps" :key="si" class="rounded-lg border border-slate-100 bg-slate-50 p-4 space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-slate-400">Step {{ si + 1 }}</span>
                    <button @click="about.howIWorkSteps.splice(si, 1)" class="text-xs text-red-400 hover:text-red-600">Remove</button>
                  </div>
                  <div class="grid grid-cols-[72px_1fr] gap-3">
                    <div>
                      <label class="block text-xs text-slate-500 mb-1">No.</label>
                      <input v-model="step.n" type="text" :class="inputCls + ' font-mono'" placeholder="01" />
                    </div>
                    <div>
                      <label class="block text-xs text-slate-500 mb-1">Title</label>
                      <input v-model="step.title" type="text" :class="inputCls" />
                    </div>
                  </div>
                  <div>
                    <label class="block text-xs text-slate-500 mb-1">Description</label>
                    <textarea v-model="step.desc" rows="2" :class="inputCls + ' resize-y'" />
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-100">
              <button @click="saveAbout" :disabled="saving" class="px-6 py-2.5 rounded-full bg-plum-700 text-white text-sm font-medium hover:bg-plum-900 transition-colors disabled:opacity-50">
                {{ saving ? 'Saving…' : 'Save to GitHub' }}
              </button>
              <p class="mt-2 text-xs text-slate-400">Saves to about.json · goes live after CI deploys.</p>
            </div>
          </template>

          <!-- ── PROJECTS ── -->
          <template v-else-if="activeSection === 'projects'">
            <div v-if="activeProject">
              <h2 class="font-display font-bold text-2xl text-slate-900 mb-8">{{ activeProject.title }}</h2>

              <div class="space-y-5 mb-10">

                <!-- Core -->
                <div><label :class="labelCls">Title</label><input v-model="activeProject.title" type="text" :class="inputCls" /></div>
                <div><label :class="labelCls">Slug</label><input v-model="activeProject.slug" type="text" :class="inputCls + ' font-mono'" /></div>
                <div class="grid grid-cols-2 gap-4">
                  <div><label :class="labelCls">Year</label><input v-model="activeProject.year" type="text" :class="inputCls" /></div>
                  <div><label :class="labelCls">Date Range</label><input v-model="activeProject.dateRange" type="text" placeholder="May 2024 – Oct 2024" :class="inputCls" /></div>
                </div>
                <div><label :class="labelCls">Company</label><input v-model="activeProject.company" type="text" :class="inputCls" /></div>
                <div><label :class="labelCls">Tags (comma-separated)</label><input :value="tagsString(activeProject)" @input="updateTags(activeProject, ($event.target as HTMLInputElement).value)" type="text" :class="inputCls" /></div>
                <div><label :class="labelCls">Short Description</label><textarea v-model="activeProject.description" rows="3" :class="inputCls + ' resize-y'" /></div>

                <!-- Featured + Card Style -->
                <div class="grid grid-cols-2 gap-6 pt-2">
                  <div>
                    <label :class="labelCls">Homepage</label>
                    <label class="flex items-center gap-2 cursor-pointer mt-2">
                      <input v-model="activeProject.featured" type="checkbox" class="w-4 h-4 accent-plum-700" />
                      <span class="text-sm text-slate-600">Show on Homepage</span>
                    </label>
                  </div>
                  <div>
                    <label :class="labelCls">Card Style</label>
                    <div class="flex gap-3 mt-2">
                      <label v-for="style in ['plum', 'white']" :key="style" class="flex items-center gap-2 cursor-pointer">
                        <input v-model="activeProject.cardStyle" type="radio" :value="style" class="accent-plum-700" />
                        <span class="text-sm text-slate-600 capitalize">{{ style }}</span>
                        <span class="w-5 h-5 rounded border border-slate-200 inline-block" :style="{ background: style === 'plum' ? '#C2B5D6' : '#fff' }" />
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Homepage Card Meta -->
                <div class="rounded-xl border border-plum-200 bg-plum-50 p-5 space-y-4">
                  <h3 class="text-xs font-semibold text-plum-700 uppercase tracking-wider">Homepage Card</h3>
                  <div>
                    <label :class="labelCls">Tag Label</label>
                    <input v-model="activeProject.tag" type="text" :class="inputCls" placeholder="GOVERNMENT · ENTERPRISE" />
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div><label :class="labelCls">Featured Stat</label><input v-model="activeProject.stat" type="text" :class="inputCls" placeholder="–60%" /></div>
                    <div><label :class="labelCls">Stat Label</label><input v-model="activeProject.statLabel" type="text" :class="inputCls" placeholder="manual workload" /></div>
                  </div>
                  <div><label :class="labelCls">Meta Text</label><input v-model="activeProject.meta" type="text" :class="inputCls" placeholder="2024 · 16 mo · UX Design + Research" /></div>
                  <div>
                    <label :class="labelCls">Panel Color</label>
                    <select v-model="activeProject.bg" :class="inputCls">
                      <option v-for="opt in BG_OPTIONS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>
                  </div>
                </div>

                <!-- Thumbnail -->
                <div>
                  <label :class="labelCls">Thumbnail</label>
                  <label :class="['flex items-center gap-2 w-fit px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-colors', uploadingImage ? 'border-slate-200 text-slate-400 bg-slate-50 pointer-events-none' : 'border-plum-400 text-plum-700 hover:bg-plum-50']">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4" /></svg>
                    {{ uploadingImage ? 'Uploading…' : 'Upload thumbnail' }}
                    <input type="file" accept="image/*" class="sr-only" :disabled="uploadingImage" @change="(e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) uploadThumbnail(activeProject, f) }" />
                  </label>
                  <div v-if="activeProject.thumbnail" class="mt-3 space-y-2">
                    <div class="rounded-lg overflow-hidden aspect-video bg-slate-100 max-w-xs"><img :src="activeProject.thumbnail" :alt="activeProject.title" class="w-full h-full object-cover" /></div>
                    <p class="text-xs text-slate-400 font-mono break-all">{{ activeProject.thumbnail }}</p>
                    <button @click="activeProject.thumbnail = ''" class="text-xs text-red-400 hover:text-red-600">Remove</button>
                  </div>
                </div>

                <!-- Hero Image -->
                <div>
                  <label :class="labelCls">Hero Image <span class="normal-case text-slate-400 font-normal">(falls back to thumbnail)</span></label>
                  <label :class="['flex items-center gap-2 w-fit px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-colors', uploadingHero ? 'border-slate-200 text-slate-400 bg-slate-50 pointer-events-none' : 'border-plum-400 text-plum-700 hover:bg-plum-50']">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4" /></svg>
                    {{ uploadingHero ? 'Uploading…' : 'Upload hero image' }}
                    <input type="file" accept="image/*" class="sr-only" :disabled="uploadingHero" @change="(e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) uploadHeroImage(activeProject, f) }" />
                  </label>
                  <div v-if="activeProject.heroImage" class="mt-2 space-y-1">
                    <p class="text-xs text-slate-400 font-mono break-all">{{ activeProject.heroImage }}</p>
                    <button @click="activeProject.heroImage = ''" class="text-xs text-red-400 hover:text-red-600">Remove</button>
                  </div>
                </div>

                <!-- Hero Gradient -->
                <div>
                  <label :class="labelCls">Hero Gradient</label>
                  <div class="w-full h-10 rounded-lg mb-3" :style="{ background: `linear-gradient(90deg, ${activeProject.heroGradient.from}, ${activeProject.heroGradient.to})` }" />
                  <div class="flex gap-2 mb-3">
                    <button v-for="preset in GRADIENT_PRESETS" :key="preset.label" @click="activeProject.heroGradient.from = preset.from; activeProject.heroGradient.to = preset.to" class="px-3 py-1 rounded-full border border-slate-200 text-xs font-medium text-slate-600 hover:border-plum-400 transition-colors">{{ preset.label }}</button>
                  </div>
                  <div class="flex gap-4">
                    <div class="flex items-center gap-2">
                      <label class="text-xs text-slate-500">From</label>
                      <input type="color" v-model="activeProject.heroGradient.from" class="w-8 h-8 rounded cursor-pointer border border-slate-200" />
                      <span class="text-xs font-mono text-slate-400">{{ activeProject.heroGradient.from }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <label class="text-xs text-slate-500">To</label>
                      <input type="color" v-model="activeProject.heroGradient.to" class="w-8 h-8 rounded cursor-pointer border border-slate-200" />
                      <span class="text-xs font-mono text-slate-400">{{ activeProject.heroGradient.to }}</span>
                    </div>
                  </div>
                </div>

                <!-- Tools -->
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <label :class="labelCls.replace('mb-1.5','')">Tools Used</label>
                    <button @click="addTool(activeProject)" class="text-xs text-plum-700 font-medium hover:underline underline-offset-4">+ Add tool</button>
                  </div>
                  <div class="space-y-3">
                    <div v-for="(tool, ti) in activeProject.tools" :key="ti" class="rounded-xl border border-slate-200 p-4 bg-white">
                      <div class="flex items-center justify-between mb-3">
                        <span class="text-xs text-slate-400">Tool {{ ti + 1 }}</span>
                        <button @click="removeTool(activeProject, ti)" class="text-xs text-red-400 hover:text-red-600">Remove</button>
                      </div>
                      <div class="grid grid-cols-2 gap-3 mb-3">
                        <div><label class="block text-xs text-slate-500 mb-1">Name</label><input v-model="tool.name" type="text" :class="inputCls" /></div>
                        <div>
                          <label class="block text-xs text-slate-500 mb-1">Color</label>
                          <select v-model="tool.colorKey" :class="inputCls"><option v-for="c in CHIP_COLORS" :key="c" :value="c">{{ c }}</option></select>
                        </div>
                      </div>
                      <div>
                        <label class="block text-xs text-slate-500 mb-1">Icon</label>
                        <label :class="['flex items-center gap-2 w-fit px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors', uploadingToolIcon[ti] ? 'border-slate-200 text-slate-400 pointer-events-none' : 'border-plum-400 text-plum-700 hover:bg-plum-50']">
                          {{ uploadingToolIcon[ti] ? 'Uploading…' : (tool.icon ? 'Replace icon' : 'Upload icon') }}
                          <input type="file" accept="image/*" class="sr-only" @change="(e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) uploadToolIcon(activeProject, ti, f) }" />
                        </label>
                        <p v-if="tool.icon" class="text-xs font-mono text-slate-400 mt-1 break-all">{{ tool.icon }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Role -->
                <div><label :class="labelCls">My Role</label><textarea v-model="activeProject.role" rows="5" :class="inputCls + ' resize-y'" placeholder="User Research — Led discovery workshops…&#10;&#10;UX Design — Designed prototypes…" /></div>

                <!-- Challenge -->
                <div>
                  <label :class="labelCls">Challenge Statement</label>
                  <p class="text-xs text-slate-400 mb-1.5">Shown as a large centered statement. Leave blank to hide.</p>
                  <textarea v-model="activeProject.challenge" rows="3" :class="inputCls + ' resize-y'" />
                </div>

                <!-- Background Info -->
                <div><label :class="labelCls">Background Information</label><textarea v-model="activeProject.backgroundInfo" rows="6" :class="inputCls + ' resize-y'" /></div>

                <!-- Insights -->
                <div><label :class="labelCls">Discovery and Insights</label><textarea v-model="activeProject.insights" rows="6" :class="inputCls + ' resize-y'" /></div>

                <!-- Prototypes -->
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <label :class="labelCls.replace('mb-1.5','')">Prototypes</label>
                    <button @click="ensurePrototypes(activeProject)" :disabled="activeProject.prototypes.length >= 3" class="text-xs text-plum-700 font-medium hover:underline underline-offset-4 disabled:opacity-40 disabled:no-underline">+ Fill 3 slots</button>
                  </div>
                  <div class="space-y-4">
                    <div v-for="(proto, pi) in activeProject.prototypes.slice(0,3)" :key="pi" class="rounded-xl border border-slate-200 p-4 bg-white space-y-3">
                      <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Prototype {{ pi + 1 }}</p>
                      <div><label class="block text-xs text-slate-500 mb-1">Title</label><input v-model="proto.title" type="text" :class="inputCls" /></div>
                      <div><label class="block text-xs text-slate-500 mb-1">Caption</label><textarea v-model="proto.caption" rows="3" :class="inputCls + ' resize-y'" /></div>
                      <div>
                        <label class="block text-xs text-slate-500 mb-1">Image</label>
                        <label :class="['flex items-center gap-2 w-fit px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors', uploadingProtoImg[pi] ? 'border-slate-200 text-slate-400 pointer-events-none' : 'border-plum-400 text-plum-700 hover:bg-plum-50']">
                          {{ uploadingProtoImg[pi] ? 'Uploading…' : (proto.image ? 'Replace image' : 'Upload image') }}
                          <input type="file" accept="image/*" class="sr-only" @change="(e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) uploadProtoImage(activeProject, pi, f) }" />
                        </label>
                        <div v-if="proto.image" class="mt-2 space-y-1">
                          <p class="text-xs font-mono text-slate-400 break-all">{{ proto.image }}</p>
                          <button @click="proto.image = ''" class="text-xs text-red-400 hover:text-red-600">Remove</button>
                        </div>
                      </div>
                    </div>
                    <p v-if="!activeProject.prototypes.length" class="text-sm text-slate-400">No prototypes yet. Click "+ Fill 3 slots" to add them.</p>
                  </div>
                </div>

                <!-- Extra Sections -->
                <div class="pt-2">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Extra Sections</h3>
                    <button @click="addExtraSection(activeProject)" class="text-xs text-plum-700 font-medium hover:underline underline-offset-4">+ Add section</button>
                  </div>
                  <div v-for="(section, i) in activeProject.extraSections" :key="i" class="rounded-xl border border-slate-200 p-5 mb-4 bg-white">
                    <div class="flex items-center justify-between mb-3">
                      <span class="text-xs text-slate-400">Section {{ i + 1 }}</span>
                      <button @click="removeExtraSection(activeProject, i)" class="text-xs text-red-400 hover:text-red-600">Remove</button>
                    </div>
                    <div class="space-y-3">
                      <div><label class="block text-xs font-medium text-slate-500 mb-1">Heading</label><input v-model="section.heading" type="text" :class="inputCls" /></div>
                      <div><label class="block text-xs font-medium text-slate-500 mb-1">Body</label><textarea v-model="section.body" rows="6" :class="inputCls + ' resize-y font-mono leading-relaxed'" /></div>
                    </div>
                  </div>
                  <p v-if="!activeProject.extraSections.length" class="text-xs text-slate-400">No extra sections.</p>
                </div>

              </div>

              <div class="pt-4 border-t border-slate-100 flex items-center gap-4">
                <button @click="saveProjects" :disabled="saving" class="px-6 py-2.5 rounded-full bg-plum-700 text-white text-sm font-medium hover:bg-plum-900 transition-colors disabled:opacity-50">{{ saving ? 'Saving…' : 'Save to GitHub' }}</button>
                <button @click="removeProject(activeProject.slug)" class="px-6 py-2.5 rounded-full border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors">Delete Project</button>
              </div>
              <p class="mt-2 text-xs text-slate-400">Changes commit to the repo and go live after CI deploys.</p>
            </div>
            <div v-else class="text-slate-400 text-sm">No projects yet. <button @click="addProject" class="text-plum-700 hover:underline">Add one.</button></div>
          </template>

          <!-- ── EXPERIENCE ── -->
          <template v-else-if="activeSection === 'experience'">
            <div class="flex items-center justify-between mb-8">
              <h2 class="font-display font-bold text-2xl text-slate-900">Experience</h2>
              <button @click="addRole" class="text-xs text-plum-700 font-medium hover:underline underline-offset-4">+ Add role</button>
            </div>
            <div class="space-y-6">
              <div v-for="(role, ri) in roles" :key="ri" class="rounded-xl border border-slate-200 p-6 bg-white space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Role {{ ri + 1 }}</span>
                  <button @click="removeRole(ri)" class="text-xs text-red-400 hover:text-red-600">Remove</button>
                </div>
                <div class="grid sm:grid-cols-2 gap-4">
                  <div><label class="block text-xs font-medium text-slate-500 mb-1">Job Title</label><input v-model="role.title" type="text" :class="inputCls" /></div>
                  <div><label class="block text-xs font-medium text-slate-500 mb-1">Company</label><input v-model="role.company" type="text" :class="inputCls" /></div>
                  <div><label class="block text-xs font-medium text-slate-500 mb-1">Type (e.g. Co-op)</label><input v-model="role.type" type="text" :class="inputCls" /></div>
                  <div><label class="block text-xs font-medium text-slate-500 mb-1">Location</label><input v-model="role.location" type="text" :class="inputCls" /></div>
                  <div><label class="block text-xs font-medium text-slate-500 mb-1">Start Date</label><input v-model="role.startDate" type="text" placeholder="May 2024" :class="inputCls" /></div>
                  <div><label class="block text-xs font-medium text-slate-500 mb-1">End Date</label><input v-model="role.endDate" type="text" placeholder="Aug 2025" :class="inputCls" /></div>
                </div>
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <label class="text-xs font-medium text-slate-500">Bullet Points</label>
                    <button @click="addBullet(role)" class="text-xs text-plum-700 hover:underline underline-offset-4">+ Add bullet</button>
                  </div>
                  <div class="space-y-2">
                    <div v-for="(_, bi) in role.bullets" :key="bi" class="flex gap-2 items-start">
                      <textarea v-model="role.bullets[bi]" rows="2" :class="'flex-1 ' + inputCls + ' resize-y'" />
                      <button @click="removeBullet(role, bi)" class="text-slate-300 hover:text-red-400 transition-colors pt-2 shrink-0">✕</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="border-t border-slate-100 pt-8 mt-8">
              <div class="flex items-center justify-between mb-4">
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Skills &amp; Tools</label>
                <button @click="about.skills.push('')" class="text-xs text-plum-700 font-medium hover:underline underline-offset-4">+ Add skill</button>
              </div>
              <div class="flex flex-wrap gap-2 mb-4">
                <div v-for="(_, si) in about.skills" :key="si" class="flex items-center gap-1 pl-3 pr-1 py-1 rounded-full border border-slate-200 bg-white">
                  <input v-model="about.skills[si]" type="text" class="text-sm text-slate-700 bg-transparent outline-none w-32" />
                  <button @click="about.skills.splice(si, 1)" class="text-slate-300 hover:text-red-400 text-xs px-1">✕</button>
                </div>
              </div>
            </div>

            <div class="pt-6 border-t border-slate-100 mt-2">
              <button @click="saveExperience" :disabled="saving" class="px-6 py-2.5 rounded-full bg-plum-700 text-white text-sm font-medium hover:bg-plum-900 transition-colors disabled:opacity-50">{{ saving ? 'Saving…' : 'Save to GitHub' }}</button>
              <p class="mt-2 text-xs text-slate-400">Changes go live after CI deploys.</p>
            </div>
          </template>

          <!-- ── ABOUT ── -->
          <template v-else-if="activeSection === 'about'">
            <h2 class="font-display font-bold text-2xl text-slate-900 mb-8">About Page</h2>

            <!-- Headshot -->
            <div :class="cardCls + ' mb-6'">
              <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Headshot</h3>
              <div class="flex items-start gap-4">
                <div v-if="about.photo" class="w-20 h-20 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                  <img :src="about.photo" alt="Headshot" class="w-full h-full object-cover object-top" />
                </div>
                <div class="space-y-2">
                  <label :class="['flex items-center gap-2 w-fit px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-colors', uploadingPhoto ? 'border-slate-200 text-slate-400 bg-slate-50 pointer-events-none' : 'border-plum-400 text-plum-700 hover:bg-plum-50']">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4" /></svg>
                    {{ uploadingPhoto ? 'Uploading…' : 'Upload photo' }}
                    <input type="file" accept="image/*" class="sr-only" :disabled="uploadingPhoto" @change="(e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) uploadAboutPhoto(f) }" />
                  </label>
                  <button v-if="about.photo" @click="about.photo = ''" class="block text-xs text-red-400 hover:text-red-600">Remove photo</button>
                </div>
              </div>
            </div>

            <!-- Hero copy -->
            <div :class="cardCls + ' mb-6'">
              <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">About Hero</h3>
              <div><label :class="labelCls">Page Headline</label><input v-model="about.aboutHeadline" type="text" :class="inputCls" placeholder="Designer, researcher, learner." /></div>
              <div><label :class="labelCls">Sub-copy</label><textarea v-model="about.aboutCopy" rows="3" :class="inputCls + ' resize-y'" /></div>
            </div>

            <!-- Quick facts -->
            <div :class="cardCls + ' mb-6'">
              <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Quick Facts</h3>
              <div class="grid sm:grid-cols-2 gap-4">
                <div><label :class="labelCls">Location</label><input v-model="about.location" type="text" :class="inputCls" /></div>
                <div><label :class="labelCls">Studying Label</label><input v-model="about.studyingLabel" type="text" :class="inputCls" placeholder="UX Design — Laurier '26" /></div>
                <div><label :class="labelCls">Availability</label><input v-model="about.availability" type="text" :class="inputCls" /></div>
                <div><label :class="labelCls">Email</label><input v-model="about.email" type="email" :class="inputCls" /></div>
              </div>
            </div>

            <!-- Bio -->
            <div :class="cardCls + ' mb-6'">
              <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Bio</h3>
              <p class="text-xs text-slate-400 -mt-2">Separate paragraphs with a blank line.</p>
              <textarea v-model="bioText" rows="10" :class="inputCls + ' resize-y leading-relaxed'" />
            </div>

            <!-- Education -->
            <div :class="cardCls + ' mb-6'">
              <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Education</h3>
              <div class="space-y-2">
                <input v-model="about.education.degree" type="text" placeholder="Degree / Program" :class="inputCls" />
                <input v-model="about.education.institution" type="text" placeholder="Institution" :class="inputCls" />
                <input v-model="about.education.years" type="text" placeholder="e.g. 2021 – 2026" :class="inputCls" />
              </div>
            </div>

            <!-- LinkedIn -->
            <div :class="cardCls + ' mb-6'">
              <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">LinkedIn</h3>
              <input v-model="about.linkedin" type="url" :class="inputCls + ' font-mono'" />
            </div>

            <!-- What I Do -->
            <div :class="cardCls + ' mb-6'">
              <div class="flex items-center justify-between">
                <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">What I Do</h3>
                <button @click="about.whatIDo.push({ title: '', desc: '', bg: 'bg-sage' })" class="text-xs text-plum-700 font-medium hover:underline underline-offset-4">+ Add card</button>
              </div>
              <div class="space-y-3">
                <div v-for="(card, ci) in about.whatIDo" :key="ci" class="rounded-lg border border-slate-100 bg-slate-50 p-4 space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-slate-400">Card {{ ci + 1 }}</span>
                    <button @click="about.whatIDo.splice(ci, 1)" class="text-xs text-red-400 hover:text-red-600">Remove</button>
                  </div>
                  <div><label class="block text-xs text-slate-500 mb-1">Title</label><input v-model="card.title" type="text" :class="inputCls" /></div>
                  <div><label class="block text-xs text-slate-500 mb-1">Description</label><textarea v-model="card.desc" rows="2" :class="inputCls + ' resize-y'" /></div>
                  <div>
                    <label class="block text-xs text-slate-500 mb-1">Background Color</label>
                    <select v-model="card.bg" :class="inputCls">
                      <option value="bg-sage">Sage (green)</option>
                      <option value="bg-sky">Sky (blue)</option>
                      <option value="bg-cream">Cream (warm)</option>
                      <option value="bg-plum-25">Plum (purple tint)</option>
                      <option value="bg-butter">Butter (yellow)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tools List -->
            <div :class="cardCls + ' mb-6'">
              <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tools</h3>
              <div>
                <label :class="labelCls">Tools (comma-separated)</label>
                <input :value="toolsListText" @input="toolsListText = ($event.target as HTMLInputElement).value" type="text" :class="inputCls" placeholder="Figma, Adobe Photoshop, Excel…" />
              </div>
            </div>

            <div class="pt-4 border-t border-slate-100">
              <button @click="saveAbout" :disabled="saving" class="px-6 py-2.5 rounded-full bg-plum-700 text-white text-sm font-medium hover:bg-plum-900 transition-colors disabled:opacity-50">{{ saving ? 'Saving…' : 'Save to GitHub' }}</button>
              <p class="mt-2 text-xs text-slate-400">Changes go live after CI deploys.</p>
            </div>
          </template>

          <!-- ── TESTIMONIALS ── -->
          <template v-else-if="activeSection === 'testimonials'">
            <div class="flex items-center justify-between mb-8">
              <h2 class="font-display font-bold text-2xl text-slate-900">Testimonials</h2>
              <button @click="about.testimonials.push({ quote: '', name: '', title: '' })" class="text-xs text-plum-700 font-medium hover:underline underline-offset-4">+ Add</button>
            </div>
            <div class="space-y-5">
              <div v-for="(t, ti) in about.testimonials" :key="ti" class="rounded-xl border border-slate-200 p-5 bg-white space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-xs text-slate-400">Testimonial {{ ti + 1 }}</span>
                  <button @click="about.testimonials.splice(ti, 1)" class="text-xs text-red-400 hover:text-red-600">Remove</button>
                </div>
                <div><label class="block text-xs font-medium text-slate-500 mb-1">Quote</label><textarea v-model="t.quote" rows="4" :class="inputCls + ' resize-y'" /></div>
                <div class="grid sm:grid-cols-2 gap-3">
                  <div><label class="block text-xs font-medium text-slate-500 mb-1">Name</label><input v-model="t.name" type="text" :class="inputCls" /></div>
                  <div><label class="block text-xs font-medium text-slate-500 mb-1">Title / Role</label><input v-model="t.title" type="text" :class="inputCls" /></div>
                </div>
              </div>
              <div v-if="!about.testimonials.length" class="text-sm text-slate-400">No testimonials yet. <button @click="about.testimonials.push({ quote: '', name: '', title: '' })" class="text-plum-700 hover:underline">Add one.</button></div>
            </div>
            <div class="pt-6 border-t border-slate-100 mt-6">
              <button @click="saveAbout" :disabled="saving" class="px-6 py-2.5 rounded-full bg-plum-700 text-white text-sm font-medium hover:bg-plum-900 transition-colors disabled:opacity-50">{{ saving ? 'Saving…' : 'Save to GitHub' }}</button>
              <p class="mt-2 text-xs text-slate-400">Changes go live after CI deploys.</p>
            </div>
          </template>

          <!-- ── CONTACT ── -->
          <template v-else-if="activeSection === 'contact'">
            <h2 class="font-display font-bold text-2xl text-slate-900 mb-8">Contact Page</h2>
            <div class="space-y-5">
              <div><label :class="labelCls">Heading</label><input v-model="contact.heading" type="text" :class="inputCls" /></div>
              <div><label :class="labelCls">Subheading</label><textarea v-model="contact.subheading" rows="2" :class="inputCls + ' resize-y'" /></div>
              <div><label :class="labelCls">Email</label><input v-model="contact.email" type="email" :class="inputCls" /></div>
              <div><label :class="labelCls">LinkedIn URL</label><input v-model="contact.linkedin" type="url" :class="inputCls + ' font-mono'" /></div>
              <div><label :class="labelCls">Footnote</label><input v-model="contact.footnote" type="text" :class="inputCls" /></div>
            </div>
            <div class="pt-6 border-t border-slate-100 mt-6">
              <button @click="saveContact" :disabled="saving" class="px-6 py-2.5 rounded-full bg-plum-700 text-white text-sm font-medium hover:bg-plum-900 transition-colors disabled:opacity-50">{{ saving ? 'Saving…' : 'Save to GitHub' }}</button>
              <p class="mt-2 text-xs text-slate-400">Changes go live after CI deploys.</p>
            </div>
          </template>

          <!-- ── RESUME ── -->
          <template v-else-if="activeSection === 'resume'">
            <h2 class="font-display font-bold text-2xl text-slate-900 mb-2">Resume</h2>
            <p class="text-slate-500 text-sm mb-8">Upload a PDF to replace <code class="text-plum-700">public/resume.pdf</code>.</p>
            <div :class="['rounded-xl border-2 border-dashed p-10 text-center transition-colors', uploadingResume ? 'border-slate-200 bg-slate-50' : 'border-plum-200 hover:border-plum-400 hover:bg-plum-50/40']">
              <svg class="w-8 h-8 mx-auto mb-3 text-plum-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <p class="text-sm text-slate-500 mb-4">{{ uploadingResume ? 'Uploading…' : 'Drop a PDF here or click to browse' }}</p>
              <label :class="['inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-colors', uploadingResume ? 'bg-slate-200 text-slate-400 pointer-events-none' : 'bg-plum-700 text-white hover:bg-plum-900']">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4" /></svg>
                {{ uploadingResume ? 'Uploading…' : 'Upload PDF' }}
                <input type="file" accept=".pdf" class="sr-only" :disabled="uploadingResume" @change="(e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) uploadResume(f) }" />
              </label>
            </div>
            <div v-if="resumeStatus !== 'idle'" :class="['rounded-xl px-4 py-3 text-sm mt-6', resumeStatus === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200']">
              {{ resumeMessage }}
            </div>
            <div class="mt-6"><a href="/resume.pdf" target="_blank" class="text-sm text-plum-700 hover:underline underline-offset-4">View current resume →</a></div>
          </template>

        </div>
      </main>
    </div>
  </div>
</template>
