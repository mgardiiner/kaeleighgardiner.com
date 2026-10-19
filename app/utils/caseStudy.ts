// Shape of `caseStudy` in projects.json, rendered by pages/projects/[slug].vue.
// Each section is a list of typed blocks; components/case/CaseBlock.vue picks
// the component for each `type`.

export interface NoteItem { label: string; text: string; dark?: boolean; count?: string; suffix?: string }
export interface RowItem { title: string; text: string; lead?: boolean }
export interface FigureItem { src: string; alt: string; caption: string; text?: string }

export type CaseBlock =
  | { type: 'notes'; size: 'md' | 'lg'; offset?: number; items: NoteItem[] }
  | { type: 'statNotes'; items: { count: string; unit: string; label: string; text: string }[] }
  | { type: 'archetypes'; items: { title: string; tone: string; text: string; designed: string }[] }
  | { type: 'numbered'; offset?: number; items: { title: string; text: string }[] }
  | { type: 'challenge'; text: string }
  | { type: 'chips'; label: string; issue?: boolean; items: string[] }
  | { type: 'rows'; marker: 'number' | 'arrow'; items: RowItem[] }
  | { type: 'script'; size: 'md' | 'lg'; text: string }
  | { type: 'process'; steps: { name: string; text: string; methods: string }[] }
  | ({ type: 'figure'; tilt: number; compact?: boolean; maxWidth?: number } & FigureItem)
  | { type: 'figures'; spacing?: 'md' | 'lg'; maxWidth?: number; items: FigureItem[] }
  | { type: 'navChips'; label: string; aside: string; items: { label: string; isNew?: boolean }[] }
  | { type: 'results'; items: { count: string; decimals?: number; suffix: string; label: string; basis?: string }[]; after?: string }
  | { type: 'standards'; items: string[] }
  | { type: 'text'; text: string }
  | { type: 'checklist'; label: string; items: string[] }
  | { type: 'cta'; label: string; href: string }
  | { type: 'noteCard'; heading: string; text: string }
  | { type: 'gallery'; min: number; items: { src: string; alt: string; title: string; text: string; chip?: string }[] }

export interface CaseSection {
  id: string
  label: string
  title: string
  tldr: string
  blocks: CaseBlock[]
}

export interface CaseStudy {
  label: string
  crumbs: string[]
  badge: string
  title: string[]
  note?: string
  lede: string
  byline: string
  gradient: [string, string]
  hero: { image: string; alt: string; style: 'laptop' | 'flat' } | { collage: string[] }
  sticker?: { value: string; label: string[] }
  meta: { label: string; value: string }[]
  tools: { name: string; icon: string }[]
  teaser: { kicker: string; title?: string; image: string; style: 'laptop' | 'flat' }
  sections: CaseSection[]
}

// Sticky-note palette and tilts, cycled by index (+ a per-block offset so
// neighbouring blocks don't start on the same colour).
export const NOTE_BG = ['bg-butter', 'bg-sage', 'bg-sky', 'bg-lavender-bg']
export const NOTE_TILT = [-1.2, 0.9, -0.7, 1.2]
export const pad2 = (n: number) => String(n).padStart(2, '0')
