<script setup lang="ts">
import projectsData from '~/data/projects.json'

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

// ── Auth state ───────────────────────────────────────────────────────────────

const token = ref(sessionStorage.getItem('admin_token') || '')
const repoOwner = ref(sessionStorage.getItem('admin_owner') || '')
const repoName = ref(sessionStorage.getItem('admin_repo') || '')
const authed = computed(() => !!token.value && !!repoOwner.value && !!repoName.value)

function saveCredentials() {
  sessionStorage.setItem('admin_token', token.value)
  sessionStorage.setItem('admin_owner', repoOwner.value)
  sessionStorage.setItem('admin_repo', repoName.value)
}

function logout() {
  sessionStorage.clear()
  token.value = ''
  repoOwner.value = ''
  repoName.value = ''
}

// ── Editor state ─────────────────────────────────────────────────────────────

const projects = ref<Project[]>(JSON.parse(JSON.stringify(projectsData)))
const activeSlug = ref(projects.value[0]?.slug ?? '')
const activeProject = computed(() => projects.value.find(p => p.slug === activeSlug.value)!)

const saving = ref(false)
const saveStatus = ref<'idle' | 'success' | 'error'>('idle')
const saveMessage = ref('')

// ── Tag helpers ──────────────────────────────────────────────────────────────

function tagsString(project: Project) {
  return project.tags.join(', ')
}

function updateTags(project: Project, value: string) {
  project.tags = value.split(',').map(t => t.trim()).filter(Boolean)
}

// ── Section helpers ───────────────────────────────────────────────────────────

function addSection(project: Project) {
  project.sections.push({ heading: 'New Section', body: '' })
}

function removeSection(project: Project, index: number) {
  project.sections.splice(index, 1)
}

// ── GitHub API save ───────────────────────────────────────────────────────────

async function saveToGitHub() {
  saving.value = true
  saveStatus.value = 'idle'

  try {
    const filePath = 'app/data/projects.json'
    const apiBase = `https://api.github.com/repos/${repoOwner.value}/${repoName.value}/contents/${filePath}`

    // Get current file SHA
    const headRes = await fetch(apiBase, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: 'application/vnd.github+json',
      },
    })

    if (!headRes.ok) throw new Error(`Could not read file: ${headRes.status} ${headRes.statusText}`)
    const { sha } = await headRes.json()

    // Encode new content
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(projects.value, null, 2))))

    // Commit
    const putRes = await fetch(apiBase, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token.value}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'chore: update project content via admin',
        content,
        sha,
      }),
    })

    if (!putRes.ok) {
      const err = await putRes.json()
      throw new Error(err.message || putRes.statusText)
    }

    saveStatus.value = 'success'
    saveMessage.value = 'Saved to GitHub. Changes will go live after CI deploys.'
  } catch (err: any) {
    saveStatus.value = 'error'
    saveMessage.value = err.message ?? 'Unknown error'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">

    <!-- Login screen -->
    <div v-if="!authed" class="flex items-center justify-center min-h-screen px-6">
      <div class="w-full max-w-sm bg-white rounded-2xl border border-purple-100 p-8 shadow-sm">
        <h1 class="font-display text-2xl font-semibold text-slate-900 mb-2">Admin</h1>
        <p class="text-slate-500 text-sm mb-6">
          Enter your GitHub Personal Access Token and repo details.<br>
          The token needs <code class="text-purple-600">Contents: Read &amp; Write</code> permission.
        </p>

        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">GitHub Token</label>
            <input
              v-model="token"
              type="password"
              placeholder="ghp_..."
              class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">Owner (GitHub username or org)</label>
            <input
              v-model="repoOwner"
              type="text"
              placeholder="kaeleighgardiner"
              class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-600 mb-1">Repository name</label>
            <input
              v-model="repoName"
              type="text"
              placeholder="kaeleighgardiner.com"
              class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400"
            />
          </div>
          <button
            @click="saveCredentials"
            :disabled="!token || !repoOwner || !repoName"
            class="w-full px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-40"
          >
            Enter Admin
          </button>
        </div>
      </div>
    </div>

    <!-- Admin UI -->
    <div v-else class="flex h-screen overflow-hidden">

      <!-- Sidebar -->
      <aside class="w-60 shrink-0 bg-white border-r border-slate-200 flex flex-col">
        <div class="px-5 py-4 border-b border-slate-100">
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-widest">Projects</p>
        </div>
        <nav class="flex-1 overflow-y-auto py-2">
          <button
            v-for="p in projects"
            :key="p.slug"
            @click="activeSlug = p.slug"
            :class="[
              'w-full text-left px-5 py-2.5 text-sm transition-colors',
              activeSlug === p.slug
                ? 'bg-purple-50 text-purple-700 font-medium'
                : 'text-slate-600 hover:bg-slate-50'
            ]"
          >
            {{ p.title }}
          </button>
        </nav>
        <div class="px-5 py-4 border-t border-slate-100 space-y-2">
          <button
            @click="saveToGitHub"
            :disabled="saving"
            class="w-full px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {{ saving ? 'Saving…' : 'Save to GitHub' }}
          </button>
          <button
            @click="logout"
            class="w-full px-4 py-2 rounded-full border border-slate-200 text-slate-500 text-sm hover:bg-slate-50 transition-colors"
          >
            Log out
          </button>
        </div>
      </aside>

      <!-- Editor -->
      <main class="flex-1 overflow-y-auto">
        <div class="max-w-2xl mx-auto px-8 py-10" v-if="activeProject">

          <!-- Save status banner -->
          <div
            v-if="saveStatus !== 'idle'"
            :class="[
              'rounded-xl px-4 py-3 text-sm mb-8',
              saveStatus === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
            ]"
          >
            {{ saveMessage }}
          </div>

          <h2 class="font-display text-2xl font-semibold text-slate-900 mb-8">{{ activeProject.title }}</h2>

          <!-- Core fields -->
          <div class="space-y-5 mb-10">
            <div>
              <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Title</label>
              <input
                v-model="activeProject.title"
                type="text"
                class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Year</label>
              <input
                v-model="activeProject.year"
                type="text"
                class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Tags (comma-separated)</label>
              <input
                :value="tagsString(activeProject)"
                @input="updateTags(activeProject, ($event.target as HTMLInputElement).value)"
                type="text"
                class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Short Description</label>
              <textarea
                v-model="activeProject.description"
                rows="3"
                class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400 resize-y"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Thumbnail URL</label>
              <input
                v-model="activeProject.thumbnail"
                type="text"
                class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400 font-mono"
              />
              <div v-if="activeProject.thumbnail" class="mt-2 rounded-lg overflow-hidden aspect-video bg-slate-100">
                <img :src="activeProject.thumbnail" :alt="activeProject.title" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <!-- Sections -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sections</h3>
              <button
                @click="addSection(activeProject)"
                class="text-xs text-purple-600 font-medium hover:underline underline-offset-4"
              >
                + Add section
              </button>
            </div>

            <div
              v-for="(section, i) in activeProject.sections"
              :key="i"
              class="rounded-xl border border-slate-200 p-5 mb-4 bg-white"
            >
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs text-slate-400">Section {{ i + 1 }}</span>
                <button
                  @click="removeSection(activeProject, i)"
                  class="text-xs text-red-400 hover:text-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-medium text-slate-500 mb-1">Heading</label>
                  <input
                    v-model="section.heading"
                    type="text"
                    class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-500 mb-1">Body (blank line = new paragraph)</label>
                  <textarea
                    v-model="section.body"
                    rows="6"
                    class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-400 resize-y font-mono leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-100">
            <button
              @click="saveToGitHub"
              :disabled="saving"
              class="px-6 py-2.5 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {{ saving ? 'Saving…' : 'Save to GitHub' }}
            </button>
            <p class="mt-2 text-xs text-slate-400">Changes commit to the repo and go live after CI deploys.</p>
          </div>

        </div>
      </main>
    </div>

  </div>
</template>
