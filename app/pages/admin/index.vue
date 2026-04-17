<script setup lang="ts">
definePageMeta({ layout: 'admin' })

import projectsData from '~/data/projects.json'
import aboutData from '~/data/about.json'
import contactData from '~/data/contact.json'

// ── Types ────────────────────────────────────────────────────────────────────

interface Section {
  heading: string
  body: string
}

interface Project {
  title: string
  slug: string
  year: string
  tags: string[]
  description: string
  thumbnail: string
  sections: Section[]
  prevSlug: string | null
  nextSlug: string | null
}

interface About {
  bio: string[]
  skills: string[]
}

interface Contact {
  heading: string
  subheading: string
  email: string
  linkedin: string
  footnote: string
}

// ── Auth state ───────────────────────────────────────────────────────────────

const REPO_OWNER = 'mgardiiner'
const REPO_NAME = 'kaeleighgardiner.com'

const tokenInput = ref('')
const token = ref(sessionStorage.getItem('admin_token') || '')
const authed = ref(!!sessionStorage.getItem('admin_token'))

const verifying = ref(false)
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
  } catch {
    loginError.value = 'Network error — check your connection.'
  } finally {
    verifying.value = false
  }
}

function logout() {
  sessionStorage.clear()
  token.value = ''
  tokenInput.value = ''
  authed.value = false
}

// ── Nav state ─────────────────────────────────────────────────────────────────

type AdminSection = 'projects' | 'about' | 'contact' | 'resume'
const activeSection = ref<AdminSection>('projects')

// ── Projects state ───────────────────────────────────────────────────────────

const projects = ref<Project[]>(JSON.parse(JSON.stringify(projectsData)))
const activeSlug = ref(projects.value[0]?.slug ?? '')
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
  projects.value.push({ title: 'New Project', slug, year: String(new Date().getFullYear()), tags: [], description: '', thumbnail: '', sections: [{ heading: 'Overview', body: '' }], prevSlug: null, nextSlug: null })
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

function tagsString(project: Project) { return project.tags.join(', ') }
function updateTags(project: Project, value: string) { project.tags = value.split(',').map(t => t.trim()).filter(Boolean) }
function addSection(project: Project) { project.sections.push({ heading: 'New Section', body: '' }) }
function removeSection(project: Project, index: number) { project.sections.splice(index, 1) }

// ── About state ───────────────────────────────────────────────────────────────

const about = ref<About>(JSON.parse(JSON.stringify(aboutData)))
const bioText = computed({
  get: () => about.value.bio.join('\n\n'),
  set: (val: string) => { about.value.bio = val.split(/\n\n+/).map(s => s.trim()).filter(Boolean) },
})
const skillsText = computed({
  get: () => about.value.skills.join(', '),
  set: (val: string) => { about.value.skills = val.split(',').map(s => s.trim()).filter(Boolean) },
})

// ── Contact state ─────────────────────────────────────────────────────────────

const contact = ref<Contact>(JSON.parse(JSON.stringify(contactData)))

// ── Save state ────────────────────────────────────────────────────────────────

const saving = ref(false)
const saveStatus = ref<'idle' | 'success' | 'error'>('idle')
const saveMessage = ref('')

// ── GitHub API helpers ────────────────────────────────────────────────────────

async function githubPut(filePath: string, content: string, commitMsg: string) {
  const apiBase = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`
  const headers = { Authorization: `Bearer ${token.value}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' }
  const headRes = await fetch(apiBase, { headers })
  const sha = headRes.ok ? (await headRes.json()).sha : undefined
  const encoded = btoa(unescape(encodeURIComponent(content)))
  const putRes = await fetch(apiBase, { method: 'PUT', headers, body: JSON.stringify({ message: commitMsg, content: encoded, sha }) })
  if (!putRes.ok) { const err = await putRes.json(); throw new Error(err.message || putRes.statusText) }
}

async function githubPutBinary(filePath: string, base64: string, commitMsg: string) {
  const apiBase = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`
  const headers = { Authorization: `Bearer ${token.value}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' }
  const headRes = await fetch(apiBase, { headers })
  const sha = headRes.ok ? (await headRes.json()).sha : undefined
  const putRes = await fetch(apiBase, { method: 'PUT', headers, body: JSON.stringify({ message: commitMsg, content: base64, sha }) })
  if (!putRes.ok) { const err = await putRes.json(); throw new Error(err.message || putRes.statusText) }
}

async function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve((reader.result as string).split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// ── Image upload ──────────────────────────────────────────────────────────────

const uploadingImage = ref(false)

async function uploadThumbnail(project: Project, file: File) {
  uploadingImage.value = true
  try {
    const ext = file.name.split('.').pop() ?? 'jpg'
    const filename = `${project.slug}-${Date.now()}.${ext}`
    await githubPutBinary(`public/images/projects/${filename}`, await readFileAsBase64(file), `chore: upload thumbnail for ${project.slug}`)
    project.thumbnail = `/images/projects/${filename}`
  } catch (err: any) {
    saveStatus.value = 'error'
    saveMessage.value = `Image upload failed: ${err.message ?? 'Unknown error'}`
  } finally {
    uploadingImage.value = false
  }
}

// ── Resume upload ─────────────────────────────────────────────────────────────

const uploadingResume = ref(false)
const resumeStatus = ref<'idle' | 'success' | 'error'>('idle')
const resumeMessage = ref('')

async function uploadResume(file: File) {
  uploadingResume.value = true
  resumeStatus.value = 'idle'
  try {
    await githubPutBinary('public/resume.pdf', await readFileAsBase64(file), 'chore: update resume via admin')
    resumeStatus.value = 'success'
    resumeMessage.value = 'Resume uploaded. Goes live after CI deploys.'
  } catch (err: any) {
    resumeStatus.value = 'error'
    resumeMessage.value = err.message ?? 'Unknown error'
  } finally {
    uploadingResume.value = false
  }
}

// ── Save functions ────────────────────────────────────────────────────────────

async function saveProjects() {
  saving.value = true; saveStatus.value = 'idle'
  try {
    rebuildNav()
    await githubPut('app/data/projects.json', JSON.stringify(projects.value, null, 2), 'chore: update project content via admin')
    saveStatus.value = 'success'; saveMessage.value = 'Projects saved. Changes go live after CI deploys.'
  } catch (err: any) { saveStatus.value = 'error'; saveMessage.value = err.message ?? 'Unknown error' }
  finally { saving.value = false }
}

async function saveAbout() {
  saving.value = true; saveStatus.value = 'idle'
  try {
    await githubPut('app/data/about.json', JSON.stringify(about.value, null, 2), 'chore: update about content via admin')
    saveStatus.value = 'success'; saveMessage.value = 'About page saved. Changes go live after CI deploys.'
  } catch (err: any) { saveStatus.value = 'error'; saveMessage.value = err.message ?? 'Unknown error' }
  finally { saving.value = false }
}

async function saveContact() {
  saving.value = true; saveStatus.value = 'idle'
  try {
    await githubPut('app/data/contact.json', JSON.stringify(contact.value, null, 2), 'chore: update contact content via admin')
    saveStatus.value = 'success'; saveMessage.value = 'Contact page saved. Changes go live after CI deploys.'
  } catch (err: any) { saveStatus.value = 'error'; saveMessage.value = err.message ?? 'Unknown error' }
  finally { saving.value = false }
}

function handleSave() {
  if (activeSection.value === 'projects') saveProjects()
  else if (activeSection.value === 'about') saveAbout()
  else if (activeSection.value === 'contact') saveContact()
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">

    <!-- Login screen -->
    <div v-if="!authed" class="flex items-center justify-center min-h-screen px-6">
      <div class="w-full max-w-sm bg-white rounded-2xl border border-purple-100 p-8 shadow-sm">
        <h1 class="font-display text-2xl font-semibold text-slate-900 mb-2">Admin</h1>
        <p class="text-slate-500 text-sm mb-6">
          Enter your GitHub Personal Access Token.<br>
          The token needs <code class="text-purple-600">Contents: Read &amp; Write</code> permission.
        </p>
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">GitHub Token</label>
            <input v-model="tokenInput" type="password" placeholder="ghp_..." class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400" />
          </div>
          <p v-if="loginError" class="text-red-500 text-xs">{{ loginError }}</p>
          <button @click="saveCredentials" :disabled="!tokenInput || verifying" class="w-full px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-40">
            {{ verifying ? 'Verifying…' : 'Enter Admin' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Admin UI -->
    <div v-else class="flex h-screen overflow-hidden">

      <!-- Sidebar -->
      <aside class="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col">

        <!-- Section nav -->
        <nav class="flex-1 overflow-y-auto py-3">
          <p class="px-4 mb-1 text-xs font-semibold text-slate-400 uppercase tracking-widest">Pages</p>

          <!-- Projects group -->
          <div class="mb-1">
            <button
              @click="activeSection = 'projects'"
              :class="['w-full text-left px-4 py-2 text-sm font-medium transition-colors', activeSection === 'projects' ? 'text-purple-700 bg-purple-50' : 'text-slate-600 hover:bg-slate-50']"
            >
              Work / Projects
            </button>
            <div v-if="activeSection === 'projects'" class="ml-4 border-l border-slate-100 pl-2 py-1">
              <button
                v-for="p in projects"
                :key="p.slug"
                @click="activeSlug = p.slug"
                :class="['group flex w-full items-center justify-between pr-1 py-1 text-xs transition-colors rounded', activeSlug === p.slug ? 'text-purple-600 font-medium' : 'text-slate-500 hover:text-slate-800']"
              >
                <span class="truncate">{{ p.title }}</span>
                <span
                  @click.stop="removeProject(p.slug)"
                  class="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all ml-1 shrink-0"
                  title="Remove"
                >✕</span>
              </button>
              <button @click="addProject" class="mt-1 text-xs text-purple-500 hover:text-purple-700 font-medium">+ Add project</button>
            </div>
          </div>

          <button
            @click="activeSection = 'about'"
            :class="['w-full text-left px-4 py-2 text-sm font-medium transition-colors', activeSection === 'about' ? 'text-purple-700 bg-purple-50' : 'text-slate-600 hover:bg-slate-50']"
          >
            About
          </button>
          <button
            @click="activeSection = 'contact'"
            :class="['w-full text-left px-4 py-2 text-sm font-medium transition-colors', activeSection === 'contact' ? 'text-purple-700 bg-purple-50' : 'text-slate-600 hover:bg-slate-50']"
          >
            Contact
          </button>
          <button
            @click="activeSection = 'resume'"
            :class="['w-full text-left px-4 py-2 text-sm font-medium transition-colors', activeSection === 'resume' ? 'text-purple-700 bg-purple-50' : 'text-slate-600 hover:bg-slate-50']"
          >
            Resume
          </button>
        </nav>

        <!-- Bottom actions -->
        <div class="px-4 py-4 border-t border-slate-100 space-y-2">
          <button
            v-if="activeSection !== 'resume'"
            @click="handleSave"
            :disabled="saving"
            class="w-full px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {{ saving ? 'Saving…' : 'Save to GitHub' }}
          </button>
          <button @click="logout" class="w-full px-4 py-2 rounded-full border border-slate-200 text-slate-500 text-sm hover:bg-slate-50 transition-colors">
            Log out
          </button>
        </div>
      </aside>

      <!-- Editor -->
      <main class="flex-1 overflow-y-auto">
        <div class="max-w-2xl mx-auto px-8 py-10">

          <!-- Save status banner -->
          <div
            v-if="saveStatus !== 'idle'"
            :class="['rounded-xl px-4 py-3 text-sm mb-8', saveStatus === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200']"
          >
            {{ saveMessage }}
          </div>

          <!-- ── Projects editor ── -->
          <template v-if="activeSection === 'projects'">
            <div v-if="activeProject">
              <h2 class="font-display text-2xl font-semibold text-slate-900 mb-8">{{ activeProject.title }}</h2>

              <div class="space-y-5 mb-10">
                <div>
                  <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Title</label>
                  <input v-model="activeProject.title" type="text" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Slug</label>
                  <input v-model="activeProject.slug" type="text" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400 font-mono" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Year</label>
                  <input v-model="activeProject.year" type="text" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Tags (comma-separated)</label>
                  <input :value="tagsString(activeProject)" @input="updateTags(activeProject, ($event.target as HTMLInputElement).value)" type="text" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Short Description</label>
                  <textarea v-model="activeProject.description" rows="3" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400 resize-y" />
                </div>

                <!-- Thumbnail -->
                <div>
                  <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Thumbnail</label>
                  <label :class="['flex items-center gap-2 w-fit px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-colors', uploadingImage ? 'border-slate-200 text-slate-400 bg-slate-50 pointer-events-none' : 'border-purple-200 text-purple-600 hover:bg-purple-50']">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4" />
                    </svg>
                    {{ uploadingImage ? 'Uploading…' : 'Upload image' }}
                    <input type="file" accept="image/*" class="sr-only" :disabled="uploadingImage" @change="(e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) uploadThumbnail(activeProject, f) }" />
                  </label>
                  <div v-if="activeProject.thumbnail" class="mt-3 space-y-2">
                    <div class="rounded-lg overflow-hidden aspect-video bg-slate-100">
                      <img :src="activeProject.thumbnail" :alt="activeProject.title" class="w-full h-full object-cover" />
                    </div>
                    <p class="text-xs text-slate-400 font-mono break-all">{{ activeProject.thumbnail }}</p>
                    <button @click="activeProject.thumbnail = ''" class="text-xs text-red-400 hover:text-red-600 transition-colors">Remove image</button>
                  </div>
                </div>
              </div>

              <!-- Sections -->
              <div class="mb-6">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sections</h3>
                  <button @click="addSection(activeProject)" class="text-xs text-purple-600 font-medium hover:underline underline-offset-4">+ Add section</button>
                </div>
                <div v-for="(section, i) in activeProject.sections" :key="i" class="rounded-xl border border-slate-200 p-5 mb-4 bg-white">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-xs text-slate-400">Section {{ i + 1 }}</span>
                    <button @click="removeSection(activeProject, i)" class="text-xs text-red-400 hover:text-red-600 transition-colors">Remove</button>
                  </div>
                  <div class="space-y-3">
                    <div>
                      <label class="block text-xs font-medium text-slate-500 mb-1">Heading</label>
                      <input v-model="section.heading" type="text" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400" />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-slate-500 mb-1">Body (blank line = new paragraph)</label>
                      <textarea v-model="section.body" rows="6" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400 resize-y font-mono leading-relaxed" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="pt-4 border-t border-slate-100 flex items-center gap-4">
                <button @click="saveProjects" :disabled="saving" class="px-6 py-2.5 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50">
                  {{ saving ? 'Saving…' : 'Save to GitHub' }}
                </button>
                <button @click="removeProject(activeProject.slug)" class="px-6 py-2.5 rounded-full border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors">
                  Delete Project
                </button>
              </div>
              <p class="mt-2 text-xs text-slate-400">Changes commit to the repo and go live after CI deploys.</p>
            </div>
            <div v-else class="text-slate-400 text-sm">
              No projects yet. <button @click="addProject" class="text-purple-600 hover:underline">Add one.</button>
            </div>
          </template>

          <!-- ── About editor ── -->
          <template v-else-if="activeSection === 'about'">
            <h2 class="font-display text-2xl font-semibold text-slate-900 mb-8">About Page</h2>
            <div class="space-y-6 mb-10">
              <div>
                <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Bio</label>
                <p class="text-xs text-slate-400 mb-2">Separate paragraphs with a blank line.</p>
                <textarea v-model="bioText" rows="10" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400 resize-y leading-relaxed" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Skills &amp; Tools (comma-separated)</label>
                <textarea v-model="skillsText" rows="4" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400 resize-y" />
                <div class="flex flex-wrap gap-2 mt-3">
                  <span v-for="skill in about.skills" :key="skill" class="px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-xs text-slate-700">{{ skill }}</span>
                </div>
              </div>
            </div>
            <div class="pt-4 border-t border-slate-100">
              <button @click="saveAbout" :disabled="saving" class="px-6 py-2.5 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50">
                {{ saving ? 'Saving…' : 'Save to GitHub' }}
              </button>
              <p class="mt-2 text-xs text-slate-400">Changes commit to the repo and go live after CI deploys.</p>
            </div>
          </template>

          <!-- ── Contact editor ── -->
          <template v-else-if="activeSection === 'contact'">
            <h2 class="font-display text-2xl font-semibold text-slate-900 mb-8">Contact Page</h2>
            <div class="space-y-5 mb-10">
              <div>
                <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Heading</label>
                <input v-model="contact.heading" type="text" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Subheading</label>
                <textarea v-model="contact.subheading" rows="3" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400 resize-y" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
                <input v-model="contact.email" type="email" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">LinkedIn URL</label>
                <input v-model="contact.linkedin" type="url" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400 font-mono" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Footnote</label>
                <input v-model="contact.footnote" type="text" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400" />
              </div>
            </div>
            <div class="pt-4 border-t border-slate-100">
              <button @click="saveContact" :disabled="saving" class="px-6 py-2.5 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50">
                {{ saving ? 'Saving…' : 'Save to GitHub' }}
              </button>
              <p class="mt-2 text-xs text-slate-400">Changes commit to the repo and go live after CI deploys.</p>
            </div>
          </template>

          <!-- ── Resume ── -->
          <template v-else-if="activeSection === 'resume'">
            <h2 class="font-display text-2xl font-semibold text-slate-900 mb-2">Resume</h2>
            <p class="text-slate-500 text-sm mb-8">Upload a PDF to replace the current <code class="text-purple-600">public/resume.pdf</code>. The About page links to this file.</p>

            <div
              :class="['rounded-xl border-2 border-dashed p-10 text-center transition-colors', uploadingResume ? 'border-slate-200 bg-slate-50' : 'border-purple-200 hover:border-purple-400 hover:bg-purple-50/40']"
            >
              <svg class="w-8 h-8 mx-auto mb-3 text-purple-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <p class="text-sm text-slate-500 mb-4">{{ uploadingResume ? 'Uploading…' : 'Drop a PDF here or click to browse' }}</p>
              <label :class="['inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-colors', uploadingResume ? 'bg-slate-200 text-slate-400 pointer-events-none' : 'bg-purple-600 text-white hover:bg-purple-700']">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4" />
                </svg>
                {{ uploadingResume ? 'Uploading…' : 'Upload PDF' }}
                <input type="file" accept=".pdf" class="sr-only" :disabled="uploadingResume" @change="(e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) uploadResume(f) }" />
              </label>
            </div>

            <div
              v-if="resumeStatus !== 'idle'"
              :class="['rounded-xl px-4 py-3 text-sm mt-6', resumeStatus === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200']"
            >
              {{ resumeMessage }}
            </div>

            <div class="mt-6">
              <a href="/resume.pdf" target="_blank" class="text-sm text-purple-600 hover:underline underline-offset-4">View current resume →</a>
            </div>
          </template>

        </div>
      </main>
    </div>

  </div>
</template>
