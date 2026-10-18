import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

export const useIsMobile = () => useMediaQuery('(max-width: 809.98px)')

/** Scales a single-line text so it exactly fills its container's width. */
export function useFitText<T extends HTMLElement>(text: string, ratio = 1) {
  const ref = useRef<T>(null)
  const [fontSize, setFontSize] = useState<number>()
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const probe = document.createElement('span')
    probe.textContent = text
    const cs = getComputedStyle(el)
    const ls = parseFloat(cs.letterSpacing) / parseFloat(cs.fontSize)
    Object.assign(probe.style, {
      // fixed + top-left so the 100px-wide probe never widens the page on mobile
      position: 'fixed',
      top: '0',
      left: '0',
      visibility: 'hidden',
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
      fontFamily: cs.fontFamily,
      fontWeight: cs.fontWeight,
      letterSpacing: Number.isFinite(ls) ? `${ls * 100}px` : 'normal',
      textTransform: cs.textTransform,
      fontSize: '100px',
    })
    document.body.appendChild(probe)
    const measure = () => {
      const natural = probe.getBoundingClientRect().width
      if (natural > 0) setFontSize((el.clientWidth / natural) * 100 * ratio)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    document.fonts?.ready.then(measure)
    return () => {
      ro.disconnect()
      probe.remove()
    }
  }, [text, ratio])
  return { ref, fontSize }
}
