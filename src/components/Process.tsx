import { Fragment, useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll } from 'motion/react'
import { process } from '../data/content'
import { aboutPanel } from '../lib/aboutPanel'
import { useIsMobile } from '../lib/hooks'
import { Marked } from '../lib/text'
import { BlurWords, Button, FadeIn, Label, RevealLines } from './ui'
import { EASE } from '../lib/ease'
import { useRange } from '../lib/scroll'
import './Process.css'

// Every third card gets xzero's orange scrim; the rest use a dark one.
const tone = (index: number) => (index % 4 === 2 ? 'accent' : 'dark')

/** Title whose letters rise in one after another (xzero "D-i-s-c-o-v-e-r"). */
function Letters({ text }: { text: string }) {
  let n = 0
  return (
    <motion.span
      className="letters"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      <span className="sr-only">{text}</span>
      {text.split(' ').map((word, wi) => (
        <Fragment key={wi}>
          <span className="letters__word" aria-hidden="true">
            {word.split('').map((ch, ci) => (
              <motion.span
                key={ci}
                variants={{
                  hidden: { y: '100%', opacity: 0 },
                  show: { y: '0%', opacity: 1, transition: { duration: 0.7, delay: n++ * 0.018, ease: EASE } },
                }}
              >
                {ch}
              </motion.span>
            ))}
          </span>{' '}
        </Fragment>
      ))}
    </motion.span>
  )
}

function Step({ step, index }: { step: (typeof process.steps)[number]; index: number }) {
  const variant = tone(index)
  return (
    <li className={`step step--${variant}`} data-cursor-tone={variant === 'accent' ? 'ink' : undefined}>
      <img className="step__img" src={step.image} alt="" loading="lazy" />
      <span className="step__num">
        [<b>{String(index + 1).padStart(2, '0')}</b>]
      </span>
      <h3 className="step__title">
        <Letters text={step.title} />
      </h3>
      <div className="step__foot">
        <p className="step__body">{step.body}</p>
        {'aside' in step && step.aside && <p className="step__aside">→ {step.aside}</p>}
      </div>
    </li>
  )
}

export function Process() {
  const mobile = useIsMobile()
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track || mobile) return
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [mobile])

  const { scrollYProgress } = useScroll({ target: pinRef, offset: ['start start', 'end end'] })
  const x = useRange(scrollYProgress, [0, 1], [0, -distance])
  const bar = useRange(scrollYProgress, [0, 1], [0.08, 1])

  return (
    <section id="process" className="section process" data-nav="light">
      <div className="container">
        <div className="section-head">
          <div>
            <Label>{process.label}</Label>
            <RevealLines className="h2" lines={process.title} />
          </div>
          <BlurWords className="small-lead process__lead section-head__aside" text={process.lead} />
        </div>
      </div>

      {mobile ? (
        <div ref={pinRef}>
          <ul className="process__list container">
            {process.steps.map((s, i) => (
              <Step key={s.title} step={s} index={i} />
            ))}
          </ul>
        </div>
      ) : (
        <div ref={pinRef} className="process__pin" style={{ height: `calc(100vh + ${distance}px)` }}>
          <div className="process__sticky">
            <motion.ul ref={trackRef} className="process__track" style={{ x }}>
              {process.steps.map((s, i) => (
                <Step key={s.title} step={s} index={i} />
              ))}
            </motion.ul>
            <div className="process__progress container" aria-hidden="true">
              <motion.span style={{ scaleX: bar }} />
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <div className="cta-row process__outro">
          <FadeIn>
            <p className="cta-row__text">
              <Marked text={process.outro} />
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Button onClick={aboutPanel.open} cursor="Read more">
              {process.cta}
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
