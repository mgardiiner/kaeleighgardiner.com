<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  minRows?: number
}>()
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

function toHtml(text: string): string {
  if (!text) return ''
  if (text.trim().startsWith('<')) return text
  return text.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('')
}

const editor = useEditor({
  content: toHtml(props.modelValue),
  extensions: [StarterKit],
  editorProps: {
    attributes: { class: 'rte-content' },
  },
  onUpdate({ editor }) {
    emit('update:modelValue', editor.getHTML())
  },
})

watch(() => props.modelValue, (val) => {
  if (!editor.value) return
  const next = toHtml(val)
  if (editor.value.getHTML() !== next) {
    editor.value.commands.setContent(next, false)
  }
})

const btn = 'p-1.5 rounded hover:bg-slate-100 transition-colors text-slate-600 disabled:opacity-30'
const active = 'bg-slate-200 text-plum-700'
</script>

<template>
  <div class="rounded-lg border border-slate-200 overflow-hidden focus-within:border-plum-500 transition-colors">
    <!-- Toolbar -->
    <div class="flex items-center gap-0.5 px-2 py-1.5 border-b border-slate-200 bg-slate-50 flex-wrap">
      <button type="button" :class="[btn, editor?.isActive('bold') ? active : '']"
        @click="editor?.chain().focus().toggleBold().run()" title="Bold">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h8a4 4 0 0 1 0 8H6zm0 8h9a4 4 0 0 1 0 8H6z"/></svg>
      </button>
      <button type="button" :class="[btn, editor?.isActive('italic') ? active : '']"
        @click="editor?.chain().focus().toggleItalic().run()" title="Italic">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4h4l-4 16H6zm4 0h4M6 20h4"/><path d="M10 4h4l-4 16H6m4-16h4M6 20h4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>
      </button>

      <div class="w-px h-4 bg-slate-200 mx-1" />

      <button type="button" :class="[btn, editor?.isActive('heading', { level: 2 }) ? active : '']"
        @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()" title="Heading 2">
        <span class="text-[11px] font-bold leading-none">H2</span>
      </button>
      <button type="button" :class="[btn, editor?.isActive('heading', { level: 3 }) ? active : '']"
        @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()" title="Heading 3">
        <span class="text-[11px] font-bold leading-none">H3</span>
      </button>

      <div class="w-px h-4 bg-slate-200 mx-1" />

      <button type="button" :class="[btn, editor?.isActive('bulletList') ? active : '']"
        @click="editor?.chain().focus().toggleBulletList().run()" title="Bullet list">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="4" cy="6" r="1" fill="currentColor"/><line x1="8" y1="6" x2="20" y2="6"/><circle cx="4" cy="12" r="1" fill="currentColor"/><line x1="8" y1="12" x2="20" y2="12"/><circle cx="4" cy="18" r="1" fill="currentColor"/><line x1="8" y1="18" x2="20" y2="18"/></svg>
      </button>
      <button type="button" :class="[btn, editor?.isActive('orderedList') ? active : '']"
        @click="editor?.chain().focus().toggleOrderedList().run()" title="Numbered list">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="10" y1="6" x2="20" y2="6"/><line x1="10" y1="12" x2="20" y2="12"/><line x1="10" y1="18" x2="20" y2="18"/><text x="3" y="7" font-size="5" fill="currentColor" stroke="none">1</text><text x="3" y="13" font-size="5" fill="currentColor" stroke="none">2</text><text x="3" y="19" font-size="5" fill="currentColor" stroke="none">3</text></svg>
      </button>

      <div class="w-px h-4 bg-slate-200 mx-1" />

      <button type="button" :class="btn"
        @click="editor?.chain().focus().undo().run()" title="Undo">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10h10a5 5 0 0 1 0 10H9"/><path d="M3 10l4-4M3 10l4 4"/></svg>
      </button>
      <button type="button" :class="btn"
        @click="editor?.chain().focus().redo().run()" title="Redo">
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10H11a5 5 0 0 0 0 10h4"/><path d="M21 10l-4-4m4 4l-4 4"/></svg>
      </button>
    </div>

    <!-- Editor area -->
    <EditorContent :editor="editor" />
  </div>
</template>

<style>
.rte-content {
  padding: 10px 12px;
  min-height: 80px;
  font-size: 14px;
  line-height: 1.6;
  color: #334155;
  outline: none;
}
.rte-content p { margin: 0 0 0.5em; }
.rte-content p:last-child { margin-bottom: 0; }
.rte-content strong { font-weight: 600; }
.rte-content em { font-style: italic; }
.rte-content h2 { font-size: 1.1em; font-weight: 700; margin: 0.75em 0 0.25em; }
.rte-content h3 { font-size: 1em; font-weight: 700; margin: 0.75em 0 0.25em; }
.rte-content ul { list-style: disc; padding-left: 1.25em; margin: 0.4em 0; }
.rte-content ol { list-style: decimal; padding-left: 1.25em; margin: 0.4em 0; }
.rte-content li { margin: 0.2em 0; }
.rte-content p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  color: #94a3b8;
  pointer-events: none;
  float: left;
  height: 0;
}
</style>
