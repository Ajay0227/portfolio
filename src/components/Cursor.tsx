import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { useMediaQuery } from '../lib/hooks'
import './Cursor.css'

const IDLE = 'You'

/**
 * Figma-style multiplayer cursor. The arrow itself is a native CSS cursor image
 * (see Cursor.css), so the browser always draws it at the exact pointer position —
 * even if this component never runs. This component only adds the trailing name tag,
 * which swaps to a context label (`data-cursor`) over interactive things.
 */
export function Cursor() {
  const fine = useMediaQuery('(pointer: fine) and (hover: hover)')
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const tagX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.4 })
  const tagY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.4 })
  const [label, setLabel] = useState(IDLE)
  const [ink, setInk] = useState(false)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!fine) return
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setShown(true)
    }
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null
      const tagged = t?.closest<HTMLElement>('[data-cursor]')
      const interactive = t?.closest('a, button, label')
      setLabel(tagged?.dataset.cursor || (interactive ? 'Click' : IDLE))
      setInk(Boolean(t?.closest('[data-nav="accent"], [data-cursor-tone="ink"]')))
    }
    // relatedTarget is null only when the pointer actually leaves the window
    const out = (e: MouseEvent) => !e.relatedTarget && setShown(false)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    document.addEventListener('mouseout', out)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.removeEventListener('mouseout', out)
    }
  }, [fine, x, y])

  if (!fine) return null
  return (
    <motion.div
      className={`cursor-tag ${ink ? 'cursor-tag--ink' : ''} ${label !== IDLE ? 'is-active' : ''}`}
      style={{ x: tagX, y: tagY, opacity: shown ? 1 : 0 }}
      aria-hidden="true"
    >
      <motion.span className="cursor-tag__pill" layout transition={{ layout: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={label}
            className="cursor-tag__text"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-110%', opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </motion.div>
  )
}
