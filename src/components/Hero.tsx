import { Fragment, useRef } from 'react'
import { motion, useMotionTemplate, useScroll } from 'motion/react'
import type { Variants } from 'motion/react'
import { footer, hero, links } from '../data/content'
import { EASE } from '../lib/ease'
import { useRange } from '../lib/scroll'
import { Marked } from '../lib/text'
import { ArrowIcon, Button } from './ui'
import './Hero.css'

export type Stage = 'intro' | 'reveal' | 'done'

const container: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.75, staggerChildren: 0.1 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.1, ease: EASE } },
}
const title: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
}
const word: Variants = {
  hidden: { opacity: 0, y: '0.35em', filter: 'blur(12px)' },
  show: { opacity: 1, y: '0em', filter: 'blur(0px)', transition: { duration: 1, ease: EASE } },
}
const clientRow: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: EASE, delayChildren: 0.1, staggerChildren: 0.12 },
  },
}
const stagger = (each: number, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
})
const face: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 380, damping: 22 } },
}
const star: Variants = {
  hidden: { opacity: 0.15, scale: 0.5 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE } },
}
const corners: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 1.3, staggerChildren: 0.08 } },
}

const words = (s: string, accent = false) => s.split(' ').map((w) => ({ w, accent }))
const titleWords = [
  ...words(hero.title.before),
  ...words(hero.title.accent1, true),
  ...words(hero.title.middle),
  ...words(hero.title.accent2, true),
]

function Star() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" fill="currentColor" />
    </svg>
  )
}

function Diamond() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M5.25 0h10.5L21 6 10.5 17.25 0 6Z" fill="currentColor" transform="translate(1.5 3.4)" />
    </svg>
  )
}

function Corners() {
  return (
    <motion.div className="hero__bottom" variants={item}>
      <p className="hero__scroll">
        <span className="hero__scroll-track" aria-hidden="true">
          <i />
        </span>
        Scroll to explore
      </p>
    </motion.div>
  )
}

/** Client faces + rating, built from the site's own parts (dotted rule, orange accents). */
function Clients() {
  const { count, label } = hero.clients
  return (
    <motion.div className="clients" variants={clientRow} data-cursor={`${count} ${label}`}>
      <motion.ul className="clients__faces" variants={stagger(0.07)}>
        {hero.users.map((src) => (
          <motion.li key={src} variants={face}>
            <img src={src} alt="" width={40} height={40} />
          </motion.li>
        ))}
        <motion.li className="clients__more" variants={face}>
          {count}
        </motion.li>
      </motion.ul>
      <span className="clients__rule" aria-hidden="true" />
      <div className="clients__meta">
        <motion.span className="clients__stars" variants={stagger(0.08, 0.35)} aria-label="Rated 5 out of 5">
          {Array.from({ length: 5 }, (_, i) => (
            <motion.span key={i} variants={star}>
              <Star />
            </motion.span>
          ))}
        </motion.span>
        <p className="clients__proof">
          <Marked text={hero.proof} />
        </p>
        <span className="sr-only">
          Trusted by {count} {label}
        </span>
      </div>
    </motion.div>
  )
}

export function Hero({ stage, onRevealed }: { stage: Stage; onRevealed: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useRange(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentOpacity = useRange(scrollYProgress, [0, 0.75], [1, 0])
  const blur = useRange(scrollYProgress, [0, 0.7], [0, 14])
  const contentFilter = useMotionTemplate`blur(${blur}px)`
  const cornersOpacity = useRange(scrollYProgress, [0, 0.35], [1, 0])
  const shadowY = useRange(scrollYProgress, [0, 1], ['0%', '22%'])
  const shadowScale = useRange(scrollYProgress, [0, 1], [1, 1.12])

  const opened = stage !== 'intro'
  const reveal = opened ? 'show' : 'hidden'

  return (
    <motion.section
      ref={ref}
      id="top"
      className="hero"
      data-nav="light"
      initial={{ clipPath: stage === 'done' ? 'inset(0% 0% 0% 0%)' : 'inset(50% 2.5% 50% 2.5%)' }}
      animate={
        stage === 'reveal'
          ? { clipPath: ['inset(50% 2.5% 50% 2.5%)', 'inset(43% 2.5% 43% 2.5%)', 'inset(0% 0% 0% 0%)'] }
          : undefined
      }
      transition={{ duration: 1.8, times: [0, 0.32, 1], ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={onRevealed}
    >
      <motion.div className="hero__shadow" style={{ y: shadowY, scale: shadowScale }} aria-hidden="true">
        <img src={hero.shadow} alt="" width={626} height={417} />
      </motion.div>

      {/* xzero-style corner details */}
      <motion.div
        className="hero__corners container"
        variants={corners}
        initial="hidden"
        animate={reveal}
        style={{ opacity: cornersOpacity }}
      >
        <motion.p className="hero__tagline" variants={item}>
          {footer.tagline}
          <Diamond />
        </motion.p>
        <Corners />
      </motion.div>

      <motion.div className="hero__content container" style={{ y: contentY, opacity: contentOpacity, filter: contentFilter }}>
        <motion.div className="hero__stack" variants={container} initial="hidden" animate={reveal}>
          <Clients />

          <motion.h1 className="hero__title" variants={title}>
            {titleWords.map(({ w, accent }, i) => (
              <Fragment key={i}>
                <motion.span className={accent ? 'accent' : undefined} variants={word}>
                  {w}
                </motion.span>
                {i < titleWords.length - 1 && ' '}
              </Fragment>
            ))}
          </motion.h1>

          <motion.p className="hero__lead" variants={item}>
            <Marked text={hero.lead} />
          </motion.p>

          <motion.div className="hero__actions" variants={item}>
            <Button href="#work" variant="accent" cursor="Explore" icon={<ArrowIcon />}>
              {hero.cta}
            </Button>
            <Button href={links.resume} cursor="Resume ↗">
              View Resume
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
