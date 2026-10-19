import { Fragment, useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView } from 'motion/react'
import type { MotionStyle } from 'motion/react'
import { EASE } from '../lib/ease'
import { markTokens } from '../lib/marks'
import { useFitText } from '../lib/hooks'
import './ui.css'

export type Seg = { t: string; accent?: boolean }
type Line = string | Seg[]

/** Heading whose lines slide up out of a mask (xzero section titles). */
export function RevealLines({
  lines,
  as = 'h2',
  className,
  delay = 0,
}: {
  lines: Line[]
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  const Tag = as as 'h2'
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span className="line" key={i}>
          <motion.span
            className="line__inner"
            initial={{ y: '105%', filter: 'blur(8px)' }}
            animate={inView ? { y: '0%', filter: 'blur(0px)' } : undefined}
            transition={{ duration: 1.1, delay: delay + i * 0.12, ease: EASE }}
          >
            {typeof line === 'string'
              ? line
              : line.map((s, j) =>
                  s.accent ? (
                    <span className="accent" key={j}>
                      {s.t}
                    </span>
                  ) : (
                    <Fragment key={j}>{s.t}</Fragment>
                  ),
                )}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Paragraph whose words fade in from blur, with *strong* highlights. */
export function BlurWords({
  text,
  className,
  as = 'p',
  delay = 0,
  stagger = 0.022,
}: {
  text: string
  className?: string
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'div' | 'blockquote'
  delay?: number
  stagger?: number
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const Tag = as as 'p'
  let n = 0
  return (
    <Tag ref={ref} className={className}>
      {markTokens(text).map((tok, i) => {
        if ('br' in tok) return <br key={i} />
        const idx = n++
        return (
          <Fragment key={i}>
            <motion.span
              className="bw"
              initial={{ opacity: 0, filter: 'blur(10px)', y: '0.2em' }}
              animate={inView ? { opacity: 1, filter: 'blur(0px)', y: '0em' } : undefined}
              transition={{ duration: 0.9, delay: delay + idx * stagger, ease: EASE }}
            >
              {tok.parts.map((p, j) => (p.strong ? <strong key={j}>{p.text}</strong> : <Fragment key={j}>{p.text}</Fragment>))}
            </motion.span>{' '}
          </Fragment>
        )
      })}
    </Tag>
  )
}

/** Fades + lifts any block into view. */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
  style,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  style?: MotionStyle
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

type ButtonProps = {
  /** Omit to render a <button> that only runs `onClick`. */
  href?: string
  children: string
  variant?: 'outline' | 'accent' | 'dark' | 'light' | 'outline-light'
  icon?: ReactNode
  className?: string
  onClick?: () => void
  cursor?: string
}

/** Pill button with xzero's rolling-label hover. */
export function Button({ href, children, variant = 'outline', icon, className = '', onClick, cursor }: ButtonProps) {
  const inner = (
    <>
      <span className="btn__roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {icon}
    </>
  )
  const cls = `btn btn--${variant} ${className}`
  if (!href) {
    return (
      <button type="button" className={cls} onClick={onClick} data-cursor={cursor}>
        {inner}
      </button>
    )
  }
  // external links and documents (the resume PDF) open in a new tab
  const external = /^https?:|^mailto:|\.pdf$/i.test(href)
  return (
    <a
      className={cls}
      href={href}
      onClick={onClick}
      data-cursor={cursor}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {inner}
    </a>
  )
}

/** Odometer-style number: each digit spins into place. */
export function RollingNumber({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  return (
    <span ref={ref} className={`roll ${className ?? ''}`} aria-label={value} role="img">
      {value.split('').map((c, i) =>
        /\d/.test(c) ? (
          <span className="roll__digit" key={i} aria-hidden="true">
            {/* sizes the column to its final digit, so a "1" isn't as wide as a "0" */}
            <span className="roll__sizer">{c}</span>
            <motion.span
              className="roll__strip"
              initial={{ y: '0%' }}
              animate={inView ? { y: `${-(10 + Number(c)) * 5}%` } : undefined}
              transition={{ duration: 1.8, delay: i * 0.12, ease: EASE }}
            >
              {Array.from({ length: 20 }, (_, k) => (
                <span key={k}>{k % 10}</span>
              ))}
            </motion.span>
          </span>
        ) : (
          <span key={i} aria-hidden="true">
            {c}
          </span>
        ),
      )}
    </span>
  )
}

/** Huge single-line word with a sharp top fading into a blurred bottom (xzero "PROJECTS"). */
export function GiantText({ text, className = '', style }: { text: string; className?: string; style?: MotionStyle }) {
  const { ref, fontSize } = useFitText<HTMLDivElement>(text, 0.985)
  return (
    <motion.div ref={ref} className={`giant ${className}`} style={{ ...style, fontSize }} aria-hidden="true">
      <span className="giant__blur">{text}</span>
      <span className="giant__sharp">{text}</span>
    </motion.div>
  )
}

export function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <span />
    </div>
  )
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <FadeIn y={8}>
      <p className="label">{children}</p>
    </FadeIn>
  )
}

export function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className="arrow" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      {diagonal ? (
        <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" fill="none" stroke="currentColor" strokeWidth="1.3" />
      ) : (
        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      )}
    </svg>
  )
}
