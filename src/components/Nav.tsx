import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { brand } from '../data/content'
import { useRoute } from '../lib/router'
import { smooth } from '../lib/smooth'
import { ContactBlock } from './ContactBlock'
import { EASE } from '../lib/ease'
import './Nav.css'

type Theme = 'light' | 'dark' | 'accent'

/** Reads data-nav from whichever section sits under the nav bar. */
function useNavTheme() {
  const [theme, setTheme] = useState<Theme>('light')
  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      const probe = 46
      let current: Theme | null = null
      document.querySelectorAll<HTMLElement>('[data-nav]').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top <= probe && r.bottom > probe) current = el.dataset.nav as Theme
      })
      if (current) setTheme(current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return theme
}

export function Nav({ visible }: { visible: boolean }) {
  const [open, setOpen] = useState(false)
  const theme = useNavTheme()
  const home = useRoute().path === '/' ? '#top' : '/'

  useEffect(() => {
    if (!open) return
    smooth.stop()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      smooth.start()
    }
  }, [open])

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false)
    // links to the other page are left to the router
    if (!href.startsWith('#')) return
    e.preventDefault()
    smooth.start()
    requestAnimationFrame(() => smooth.scrollTo(href))
  }

  return (
    <>
      <motion.header
        className={`nav nav--${open ? 'light' : theme} ${open ? 'is-open' : ''}`}
        initial={{ y: '-120%' }}
        animate={{ y: visible ? '0%' : '-120%' }}
        transition={{ duration: 1, ease: EASE }}
      >
        <div className="nav__blur" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} />
          ))}
        </div>
        <div className="nav__bar container">
          <a className="nav__logo" href={home} onClick={(e) => go(e, home)} aria-label={`${brand.name} — home`}>
            {brand.wordmark}
          </a>
          <button
            className="burger"
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            data-cursor={open ? 'Close' : 'Menu'}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.1 } }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <ContactBlock mode="menu" onNavigate={go} onOpenAbout={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
