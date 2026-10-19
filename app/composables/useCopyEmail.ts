export const CONTACT_EMAIL = 'kaeleigh.gardiner@yahoo.ca'

/** "Copy email" button state: `copied` flips back after 2s. */
export function useCopyEmail(email = CONTACT_EMAIL) {
  const copied = ref(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      // Clipboard access can be denied (insecure origin, permissions). Don't
      // claim "Copied"; the address is still visible and linked beside the button.
      return
    }
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => { copied.value = false }, 2000)
  }

  onBeforeUnmount(() => clearTimeout(timer))

  return { copied, copy }
}
