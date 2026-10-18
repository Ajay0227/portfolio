import { useRef } from 'react'
import { motion, useMotionTemplate, useScroll } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { testimonials } from '../data/content'
import { useRange } from '../lib/scroll'
import { GiantText } from './ui'
import './Testimonials.css'

/** One word whose blur clears as scroll progress passes through its slot. */
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useRange(progress, range, [0.18, 1])
  const blur = useRange(progress, range, [6, 0])
  const filter = useMotionTemplate`blur(${blur}px)`
  return (
    <>
      <motion.span className="tw" style={{ opacity, filter }}>
        {children}
      </motion.span>{' '}
    </>
  )
}

function ScrubText({ text, progress, from, to }: { text: string; progress: MotionValue<number>; from: number; to: number }) {
  const words = text.split(' ')
  const step = (to - from) / words.length
  return (
    <blockquote className="tcard__quote">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word key={i} progress={progress} range={[from + i * step, Math.min(1, from + (i + 1.5) * step)]}>
            {w}
          </Word>
        ))}
      </span>
    </blockquote>
  )
}

type Card = {
  text: string
  name: string
  role: string
  avatars: string[]
}

const CARDS: Card[] = [
  {
    text: testimonials.quote.text,
    name: testimonials.quote.name,
    role: testimonials.quote.role,
    avatars: [testimonials.quote.avatar],
  },
  {
    text: testimonials.trusted.text,
    name: testimonials.trusted.title,
    role: testimonials.trusted.role,
    avatars: testimonials.trusted.avatars,
  },
]

function TestimonialCard({ card, index, progress }: { card: Card; index: number; progress: MotionValue<number> }) {
  const span = 1 / CARDS.length
  const start = index * span
  const y = useRange(progress, [Math.max(0, start - 0.02), start + span * 0.45], ['105vh', '0vh'])
  const rotate = useRange(progress, [start, start + span * 0.45], [index % 2 ? 6 : -6, 0])
  const scale = 1 + index * 0.02
  return (
    <motion.figure
      className="tcard"
      style={{ y: index === 0 ? undefined : y, rotate: index === 0 ? undefined : rotate, scale, top: `${-index * 18}px` }}
    >
      <span className="tcard__dot" aria-hidden="true" />
      <ScrubText text={card.text} progress={progress} from={start + span * 0.2} to={start + span * 0.85} />
      <figcaption className="tcard__author">
        <span className="tcard__avatars">
          {card.avatars.map((a) => (
            <img key={a} src={a} alt="" width={48} height={48} loading="lazy" />
          ))}
        </span>
        <span>
          <span className="tcard__name">{card.name}</span>
          <span className="tcard__role">{card.role}</span>
        </span>
      </figcaption>
    </motion.figure>
  )
}

export function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const giantY = useRange(enter, [0, 1], ['-30vh', '0vh'])
  const giantBlur = useRange(enter, [0.1, 0.9], [18, 0])
  const giantFilter = useMotionTemplate`blur(${giantBlur}px)`
  const firstY = useRange(enter, [0.35, 1], ['70vh', '0vh'])

  return (
    <section ref={ref} className="testimonials" data-nav="light" aria-label="Testimonials">
      <div className="testimonials__sticky">
        <motion.div className="testimonials__giant container" style={{ y: giantY }}>
          <GiantText text={testimonials.giant} style={{ filter: giantFilter }} />
        </motion.div>
        <motion.div className="testimonials__stack" style={{ y: firstY }}>
          {CARDS.map((c, i) => (
            <TestimonialCard key={c.name} card={c} index={i} progress={scrollYProgress} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
