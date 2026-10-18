import { useState } from 'react'
import { motion } from 'motion/react'
import { links, services } from '../data/content'
import { Marked } from '../lib/text'
import { BlurWords, Button, FadeIn, Label, RevealLines } from './ui'
import { EASE } from '../lib/ease'
import './Services.css'

export function Services() {
  const [open, setOpen] = useState(0)

  return (
    <section id="services" className="section services" data-nav="light">
      <div className="container">
        <div className="section-head">
          <div>
            <Label>{services.label}</Label>
            <RevealLines className="h2" lines={services.title} />
          </div>
          <BlurWords className="lead services__lead" text={services.lead} />
        </div>

        <ul className="acc">
          {services.items.map((s, i) => {
            const isOpen = open === i
            const id = `service-${i}`
            return (
              <motion.li
                key={s.title}
                className={`acc__item ${isOpen ? 'is-open' : ''}`}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 1, delay: i * 0.06, ease: EASE }}
              >
                <button
                  className="acc__head"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={id}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  data-cursor={isOpen ? 'Collapse' : 'Expand'}
                >
                  <span className="acc__num">
                    [<span>{String(i + 1).padStart(2, '0')}</span>]
                  </span>
                  <span className="acc__title">{s.title}</span>
                  <span className="acc__icon" aria-hidden="true">
                    <i />
                    <i />
                  </span>
                </button>
                <div className="acc__panel" id={id} role="region" aria-label={s.title}>
                  <div className="acc__clip">
                    <div className="acc__content">
                      <p className="body acc__body">{s.body}</p>
                      <figure className="acc__media">
                        <img src={s.image} alt={s.title} loading="lazy" />
                      </figure>
                    </div>
                  </div>
                </div>
              </motion.li>
            )
          })}
        </ul>

        <div className="cta-row">
          <FadeIn>
            <p className="cta-row__text">
              <Marked text={services.outro} />
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Button href={links.calendly}>{services.cta}</Button>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
