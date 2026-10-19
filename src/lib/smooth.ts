import Lenis from 'lenis'
import { useEffect } from 'react'

let lenis: Lenis | null = null

const NAV_OFFSET = 0

export const smooth = {
  stop() {
    lenis?.stop()
    document.body.classList.add('is-locked')
  },
  start() {
    lenis?.start()
    document.body.classList.remove('is-locked')
  },
  scrollTo(to: string | number | HTMLElement, opts: { immediate?: boolean } = {}) {
    const target = typeof to === 'string' ? (to === '#top' ? 0 : document.querySelector<HTMLElement>(to)) : to
    if (target === null) return
    if (lenis) {
      // jumps happen right after a page change, before lenis has re-measured the new page height
      if (opts.immediate) lenis.resize()
      lenis.scrollTo(target, { offset: NAV_OFFSET, immediate: opts.immediate, duration: 1.6, force: true })
      return
    }
    const top =
      typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY + NAV_OFFSET
    window.scrollTo({ top, behavior: opts.immediate ? 'auto' : 'smooth' })
  },
}

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      wheelMultiplier: 1,
      anchors: { offset: NAV_OFFSET, duration: 1.6 },
    })
    return () => {
      lenis?.destroy()
      lenis = null
    }
  }, [])
}
