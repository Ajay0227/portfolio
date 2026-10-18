import { motion } from 'motion/react'
import { brand } from '../data/content'
import './Preloader.css'

/** Orange wordmark whose letters blur in one by one before the hero band opens. */
export function Preloader({ onLettersDone }: { onLettersDone: () => void }) {
  const letters = brand.wordmark.split('')
  return (
    <div className="preloader" aria-hidden="true">
      <p className="preloader__mark">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, filter: 'blur(12px)', y: 12 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={i === letters.length - 1 ? onLettersDone : undefined}
          >
            {l}
          </motion.span>
        ))}
      </p>
    </div>
  )
}
