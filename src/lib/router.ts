import { useSyncExternalStore } from 'react'

export type Route = {
  /** Pathname without a trailing slash ("/" for home). */
  path: string
  hash: string
  /** Scroll position saved on this history entry, restored on Back/Forward. */
  scroll?: number
}

const read = (): Route => ({
  path: window.location.pathname.replace(/\/+$/, '') || '/',
  hash: window.location.hash,
  scroll: (history.state as { scroll?: number } | null)?.scroll,
})

let route = read()
const listeners = new Set<() => void>()
const update = () => {
  route = read()
  listeners.forEach((l) => l())
}

/** Client-side navigation between the home page and case study pages. */
export function navigate(to: string, { replace = false } = {}) {
  if (replace) {
    history.replaceState(history.state, '', to)
  } else {
    // remember where we were, so Back lands on the same spot
    history.replaceState({ ...history.state, scroll: window.scrollY }, '')
    history.pushState(null, '', to)
  }
  update()
}

/** Routes plain clicks on same-site links to other pages; same-page anchors keep their scroll handling. */
function onClick(e: MouseEvent) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  const a = (e.target as Element | null)?.closest('a')
  if (!a || a.target || a.hasAttribute('download')) return
  const url = new URL(a.href, window.location.href)
  // files (the resume PDF) and other sites load normally
  if (url.origin !== window.location.origin || /\.\w+$/.test(url.pathname)) return
  if (url.pathname === window.location.pathname) return
  e.preventDefault()
  // handled: keeps lenis' anchor handling (on window) from also chasing the hash on the old page
  e.stopPropagation()
  navigate(url.pathname + url.hash)
}

function subscribe(cb: () => void) {
  if (!listeners.size) {
    window.addEventListener('popstate', update)
    document.addEventListener('click', onClick)
  }
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
    if (!listeners.size) {
      window.removeEventListener('popstate', update)
      document.removeEventListener('click', onClick)
    }
  }
}

export function useRoute() {
  return useSyncExternalStore(subscribe, () => route)
}
