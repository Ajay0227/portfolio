import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { motion, useScroll } from 'motion/react'
import { brand, links, projects } from '../data/content'
import type { Project } from '../data/content'
import { caseOutro, caseStudies } from '../data/caseStudies'
import type { CaseSection, CaseStudy as Study, FeatureBlock, Media, Point } from '../data/caseStudies'
import { EASE } from '../lib/ease'
import { useRange } from '../lib/scroll'
import { Marked } from '../lib/text'
import { Cta } from './Cta'
import { Device } from './Projects'
import { ArrowIcon, BlurWords, Button, FadeIn, Label, RevealLines } from './ui'
import './CaseStudy.css'

const pad = (n: number) => String(n).padStart(2, '0')

// no blur here: filtering big screenshots while they move is expensive
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -10% 0px' },
  transition: { duration: 1.1, delay, ease: EASE },
})

function Figure({ media, delay = 0 }: { media: Media; delay?: number }) {
  return (
    <motion.figure className="cs-figure" {...rise(delay)}>
      <img src={media.src} alt={media.alt} loading="lazy" />
    </motion.figure>
  )
}

function MediaGrid({ items, inset }: { items: Media[]; inset?: boolean }) {
  return (
    <div className={`cs-media ${inset ? 'cs-media--inset' : ''}`} style={{ '--cols': items.length } as CSSProperties}>
      {items.map((m, i) => (
        <Figure key={m.src} media={m} delay={i * 0.08} />
      ))}
    </div>
  )
}

function Prose({ body }: { body: string[] }) {
  return (
    <div className="cs-prose">
      {body.map((t, i) => (
        <FadeIn key={i} delay={i * 0.05}>
          <p className="cs-text">
            <Marked text={t} />
          </p>
        </FadeIn>
      ))}
    </div>
  )
}

/** Numbered notes matching the markers drawn on the screens. */
function Points({ items }: { items: Point[] }) {
  return (
    <ol className="cs-points">
      {items.map((p, i) => (
        <motion.li key={p.title} className="cs-point" {...rise(i * 0.05)}>
          <span className="cs-point__num" aria-hidden="true">
            {i + 1}
          </span>
          <div>
            <p className="cs-point__title">{p.title}</p>
            <p className="body">
              <Marked text={p.body} />
            </p>
          </div>
        </motion.li>
      ))}
    </ol>
  )
}

function Cards({ title, items }: { title?: string; items: Point[] }) {
  return (
    <div className="cs-cards">
      {title && (
        <FadeIn y={12}>
          <h3 className="cs-sub">{title}</h3>
        </FadeIn>
      )}
      <ul className="cs-cards__grid" style={{ '--cols': items.length % 3 === 0 ? 3 : 2 } as CSSProperties}>
        {items.map((c, i) => (
          <motion.li key={c.title} className="cs-card" {...rise(i * 0.06)}>
            <span className="cs-card__num">
              [<span>{pad(i + 1)}</span>]
            </span>
            <h3 className="cs-card__title">{c.title}</h3>
            <p className="body">
              <Marked text={c.body} />
            </p>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="cs-chips">
      {items.map((c, i) => (
        <motion.li key={c} {...rise(i * 0.05)}>
          {c}
        </motion.li>
      ))}
    </ul>
  )
}

function Feature({ block, flip }: { block: FeatureBlock; flip: boolean }) {
  const { kicker, title, body, media = [], points, stack } = block
  const heading = (
    <>
      {kicker && <Label>{kicker}</Label>}
      <RevealLines as="h3" className="cs-feature__title" lines={[title]} />
    </>
  )

  if (stack || !media.length) {
    return (
      <div className="cs-feature cs-feature--stack">
        <div className="cs-feature__head">
          <div>{heading}</div>
          {body && <Prose body={body} />}
        </div>
        {media.map((m) => (
          <Figure key={m.src} media={m} />
        ))}
        {points && <Points items={points} />}
      </div>
    )
  }

  return (
    <div className={`cs-feature cs-feature--split ${flip ? 'is-flipped' : ''}`}>
      <div className="cs-feature__text">
        {heading}
        {body && <Prose body={body} />}
        {points && <Points items={points} />}
      </div>
      <div className="cs-feature__media">
        {media.map((m) => (
          <Figure key={m.src} media={m} />
        ))}
      </div>
    </div>
  )
}

function Section({ section, index, total }: { section: CaseSection; index: number; total: number }) {
  // side-by-side features alternate which side the screen sits on
  let split = 0
  return (
    <section className="cs-section container">
      <div className="section-head">
        <div>
          <Label>
            {pad(index + 1)} / {pad(total)}
          </Label>
          <RevealLines className="h2 cs-section__title" lines={[section.title]} />
        </div>
        {section.lead && <BlurWords className="cs-lead section-head__aside" text={section.lead} stagger={0.008} />}
      </div>

      {section.blocks && (
        <div className="cs-section__body">
          {section.blocks.map((block, i) => {
            switch (block.kind) {
              case 'text':
                return <Prose key={i} body={block.body} />
              case 'media':
                return <MediaGrid key={i} items={block.items} inset={block.inset} />
              case 'cards':
                return <Cards key={i} title={block.title} items={block.items} />
              case 'chips':
                return <Chips key={i} items={block.items} />
              case 'points':
                return <Points key={i} items={block.items} />
              case 'feature': {
                const flip = !block.stack && Boolean(block.media?.length) && split++ % 2 === 1
                return <Feature key={i} block={block} flip={flip} />
              }
            }
          })}
        </div>
      )}
    </section>
  )
}

function Hero({ project, study }: { project: Project; study: Study }) {
  const facts: Point[] = [
    { title: 'Client', body: project.client },
    ...(project.year ? [{ title: 'Year', body: project.year }] : []),
    ...(study.facts ?? []),
    { title: 'Services', body: project.tags.join(', ') },
  ]

  return (
    <header id="top" className="cs-hero container">
      <FadeIn y={8}>
        <a className="cs-back" href="/#work" data-cursor="Back">
          <ArrowIcon /> {caseOutro.back}
        </a>
      </FadeIn>
      <div className="cs-hero__head">
        <Label>Case study</Label>
        <RevealLines as="h1" className="cs-hero__title" lines={[project.title]} delay={0.1} />
      </div>
      <div className="section-head cs-hero__intro">
        <BlurWords className="lead cs-hero__subtitle" text={project.subtitle} delay={0.3} />
        <BlurWords className="cs-lead" text={study.intro} delay={0.45} stagger={0.008} />
      </div>
      <dl className="cs-facts">
        {facts.map((f, i) => (
          <FadeIn key={f.title} className="cs-facts__item" delay={0.5 + i * 0.05}>
            <dt>{f.title}</dt>
            <dd>{f.body}</dd>
          </FadeIn>
        ))}
      </dl>
    </header>
  )
}

/** The project's device on a dark stage, echoing its panel on the home page. */
function Cover({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const deviceY = useRange(scrollYProgress, [0, 1], ['14%', '-6%'])
  const deviceScale = useRange(scrollYProgress, [0, 0.5], [0.88, 1.02])

  return (
    <div ref={ref} className="cs-cover container">
      <motion.div
        className="cs-cover__stage"
        data-nav="dark"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.35, ease: EASE }}
      >
        <motion.div className={`cs-cover__device cs-cover__device--${project.device}`} style={{ y: deviceY, scale: deviceScale }}>
          <Device project={project} />
        </motion.div>
      </motion.div>
    </div>
  )
}

function Outro() {
  return (
    <section className="cs-section container">
      <div className="section-head">
        <RevealLines className="h2" lines={caseOutro.title} />
        <div className="section-head__aside cs-outro">
          <Prose body={caseOutro.body} />
          <FadeIn delay={0.1}>
            <Button href={links.emailCompose} variant="dark" cursor="Say hi ↗">
              {caseOutro.cta}
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function Next({ project }: { project: Project }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const deviceY = useRange(scrollYProgress, [0, 1], ['30%', '0%'])
  const deviceScale = useRange(scrollYProgress, [0, 1], [0.82, 1])

  return (
    <a ref={ref} className="cs-next" href={project.href} data-nav="dark" data-cursor={caseOutro.next}>
      <div className="cs-next__info container">
        <p className="label cs-next__label">{caseOutro.next}</p>
        <h2 className="cs-next__title">{project.title}</h2>
        <p className="cs-next__subtitle">{project.subtitle}</p>
        <span className="cs-next__cta">
          View Case Study <ArrowIcon />
        </span>
      </div>
      <motion.div className={`cs-next__device cs-next__device--${project.device}`} style={{ y: deviceY, scale: deviceScale }}>
        <Device project={project} />
      </motion.div>
    </a>
  )
}

export function CaseStudy({ project }: { project: Project }) {
  const study = caseStudies[project.slug]
  const next = projects[(projects.indexOf(project) + 1) % projects.length]

  useEffect(() => {
    const prev = document.title
    document.title = `${project.title} — Case study · ${brand.name}`
    return () => {
      document.title = prev
    }
  }, [project])

  return (
    <main className="cs" data-nav="light">
      <Hero project={project} study={study} />
      <Cover project={project} />
      {study.note && (
        <div className="container cs-note-wrap">
          <FadeIn className="cs-note">
            <p className="label">{study.note.title}</p>
            <p className="body">{study.note.body}</p>
          </FadeIn>
        </div>
      )}
      {study.sections.map((s, i) => (
        <Section key={s.title} section={s} index={i} total={study.sections.length} />
      ))}
      <Outro />
      <Next project={next} />
      <Cta />
    </main>
  )
}
