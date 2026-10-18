import { useRef } from 'react'
import { motion, useScroll } from 'motion/react'
import { cta, links } from '../data/content'
import { Marked } from '../lib/text'
import { useRange } from '../lib/scroll'
import { BlurWords, Button, FadeIn, RevealLines } from './ui'
import './Cta.css'

export function Cta() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // the cut-out rises up from the bottom edge as the section scrolls in, then stays planted
  const imgY = useRange(scrollYProgress, [0, 0.5], ['22%', '0%'])
  const imgScale = useRange(scrollYProgress, [0, 0.5], [0.92, 1])

  return (
    <section ref={ref} id="hello" className="cta" data-nav="accent">
      <motion.div className="cta__img" style={{ y: imgY, scale: imgScale }} aria-hidden="true">
        <img src={cta.image} alt="" width={1348} height={1167} loading="lazy" />
      </motion.div>
      <div className="container cta__inner">
        <RevealLines className="cta__title" lines={cta.title} />
        <BlurWords className="cta__lead" text={cta.lead} />
        <div className="cta__row">
          <FadeIn>
            <p className="cta__aside">
              <Marked text={cta.aside} />
            </p>
          </FadeIn>
          <FadeIn className="cta__buttons" delay={0.1}>
            <Button href={links.calendly} variant="light">
              Let’s Talk
            </Button>
            <Button href={links.emailCompose} variant="outline-light">
              Email Me
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
