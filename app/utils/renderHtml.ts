export function renderHtml(text: string): string {
  if (!text) return ''
  if (text.trim().startsWith('<')) return text
  return text.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('')
}
