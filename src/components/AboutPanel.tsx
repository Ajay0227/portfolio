import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { aboutPage, brand, links } from '../data/content'
import { aboutPanel, useAboutPanelOpen } from '../lib/aboutPanel'
import { EASE } from '../lib/ease'
import { smooth } from '../lib/smooth'
import { Marked } from '../lib/text'
import { BlurWords, Button, FadeIn, RevealLines } from './ui'
import './AboutPanel.css'

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${links.email}`
    }
  }
  return (
    <button type="button" className="ap__copy" onClick={copy} data-cursor={copied ? 'Copied!' : 'Copy'}>
      <span className="ap__copy-label">{copied ? 'Copied to clipboard ✓' : aboutPage.copyEmail}</span>
      <span className="ap__copy-email">{links.email}</span>
    </button>
  )
}

/** Full-screen About overlay (xzero menu styling) — keeps visitors on this site. */
export function AboutPanel() {
  const open = useAboutPanelOpen()

  useEffect(() => {
    if (!open) return
    smooth.stop()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && aboutPanel.close()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      smooth.start()
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="ap"
          role="dialog"
          aria-modal="true"
          aria-label="About Ajay"
          data-lenis-prevent
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <header className="ap__bar container">
            <span className="ap__logo">{brand.wordmark}</span>
            <button
              type="button"
              className="ap__close"
              onClick={aboutPanel.close}
              aria-label="Close about"
              data-cursor="Close"
            >
              <span>Close</span>
              <i aria-hidden="true" />
            </button>
          </header>

          <div className="ap__body container">
            <div className="section-head">
              <div>
                <FadeIn y={8} delay={0.5}>
                  <p className="label">{aboutPage.label}</p>
                </FadeIn>
                <RevealLines className="h2" lines={aboutPage.title} delay={0.55} />
              </div>
              <BlurWords className="small-lead section-head__aside" text={aboutPage.school} delay={0.8} />
            </div>

            <div className="ap__grid">
              <motion.figure
                className="ap__photo"
                initial={{ clipPath: 'inset(100% 0% 0% 0%)', scale: 1.15 }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
                transition={{ duration: 1.4, delay: 0.6, ease: EASE }}
              >
                <img src={aboutPage.image} alt="Ajay speaking to an audience" />
              </motion.figure>

              <div className="ap__text">
                <BlurWords className="ap__bio" text={aboutPage.bio} delay={0.9} stagger={0.012} />

                <FadeIn className="ap__quote" delay={0.2}>
                  <p className="body">{aboutPage.quoteIntro}</p>
                  <p className="ap__quote-text">
                    <Marked text={aboutPage.quote} />
                  </p>
                </FadeIn>

                <FadeIn delay={0.25}>
                  <CopyEmail />
                </FadeIn>
              </div>
            </div>

            <div className="ap__shelf">
              <div className="section-head">
                <RevealLines as="h3" className="ap__shelf-title" lines={[aboutPage.shelf.title]} />
                <BlurWords className="body ap__shelf-text" text={aboutPage.shelf.text} />
              </div>
              <ul className="ap__books">
                {aboutPage.shelf.covers.map((src, i) => (
                  <motion.li
                    key={src}
                    initial={{ opacity: 0, y: 60, rotate: i % 2 ? 4 : -4 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                    transition={{ duration: 1, delay: i * 0.08, ease: EASE }}
                  >
                    <img src={src} alt="" loading="lazy" />
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="cta-row ap__cta">
              <p className="cta-row__text">
                <Marked text="Seen enough? *Let’s make something awesome.*" />
              </p>
              <div className="ap__buttons">
                <Button href={links.calendly} variant="dark">
                  Let’s Talk
                </Button>
                <Button href={links.resume}>View Resume</Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
