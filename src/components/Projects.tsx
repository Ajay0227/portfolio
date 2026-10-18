import { useRef } from 'react'
import { motion, useInView, useMotionTemplate, useScroll } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { links, projects, projectsIntro } from '../data/content'
import type { Project } from '../data/content'
import { Marked } from '../lib/text'
import { useRange } from '../lib/scroll'
import { ArrowIcon, Button, FadeIn, GiantText } from './ui'
import './Projects.css'

function Screen({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const near = useInView(ref, { margin: '50% 0px 50% 0px' })
  return (
    <div ref={ref} className="screen">
      {project.video && near ? (
        <video src={project.video} poster={project.screen} autoPlay muted loop playsInline preload="none" />
      ) : (
        <img src={project.screen} alt={`${project.title} case study preview`} loading="lazy" />
      )}
    </div>
  )
}

function Panel({
  project,
  index,
  total,
  progress,
}: {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
}) {
  // Stack items = intro + panels. Panel `index` (0-based) is item index + 1.
  // Scroll-linked ranges must stay within [0, 1] (motion accelerates them with ScrollTimeline).
  const steps = total // number of scroll segments (items - 1)
  const enterStart = index / steps
  const arrive = (index + 1) / steps
  const last = index === total - 1
  const leave = last ? 1 : (index + 2) / steps
  const coverFrom = last ? 0.999 : arrive

  const deviceRange = last ? [enterStart, arrive] : [enterStart, arrive, leave]
  const deviceScale = useRange(progress, deviceRange, last ? [0.82, 1.06] : [0.82, 1, 1.14])
  const deviceY = useRange(progress, deviceRange, last ? ['18%', '-2%'] : ['18%', '0%', '-6%'])
  const coverScale = useRange(progress, [coverFrom, leave], [1, last ? 1 : 0.95])
  const shade = useRange(progress, [coverFrom, leave], [0, last ? 0 : 0.65])
  const settle = enterStart + (arrive - enterStart) * 0.6
  const infoY = useRange(progress, [enterStart, settle], ['30%', '0%'])
  const infoBlur = useRange(progress, [enterStart, settle], [8, 0])
  const infoFilter = useMotionTemplate`blur(${infoBlur}px)`

  return (
    <article className="panel" data-nav="dark" aria-labelledby={`p-${project.slug}`}>
      <motion.div className="panel__inner" style={{ scale: coverScale }}>
        <div className="panel__bg" aria-hidden="true" />

        <motion.div className={`panel__device panel__device--${project.device}`} style={{ scale: deviceScale, y: deviceY }}>
          {project.device === 'laptop' ? (
            <div className="laptop">
              <span className="laptop__notch" aria-hidden="true" />
              <Screen project={project} />
            </div>
          ) : (
            <div className="floating">
              <Screen project={project} />
            </div>
          )}
        </motion.div>

        <motion.div className="panel__info container" style={{ y: infoY, filter: infoFilter }}>
          <a href={project.href} target="_blank" rel="noreferrer" className="panel__title-link" data-cursor="Case study ↗">
            <h3 id={`p-${project.slug}`} className="panel__title">
              {project.title}
            </h3>
          </a>
          <p className="panel__subtitle">{project.subtitle}</p>
          <ul className="panel__tags">
            {project.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="panel__meta">
            Client: <span>{project.client}</span>
          </p>
          {project.year && <p className="panel__year">{project.year}</p>}
          <a className="panel__cta" href={project.href} target="_blank" rel="noreferrer" data-cursor="Case study ↗">
            View Case Study <ArrowIcon diagonal />
          </a>
          <div className="panel__shots" aria-hidden="true">
            {project.shots.map((s) => (
              <img key={s} src={s} alt="" loading="lazy" />
            ))}
          </div>
        </motion.div>

        <motion.div className="panel__shade" style={{ opacity: shade }} aria-hidden="true" />
      </motion.div>
    </article>
  )
}

export function Projects() {
  const stackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: stackProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] })
  const { scrollYProgress: introProgress } = useScroll({ target: stackRef, offset: ['start end', 'start start'] })

  const giantY = useRange(introProgress, [0, 1], ['-35vh', '0vh'])
  const giantBlur = useRange(introProgress, [0, 0.85], [18, 0])
  const giantOpacity = useRange(introProgress, [0, 0.4], [0.2, 1])
  const giantFilter = useMotionTemplate`blur(${giantBlur}px)`
  const giantAway = useRange(stackProgress, [0, 1 / projects.length], [1, 0.9])

  return (
    <section id="work" className="projects" aria-label="Projects">
      <div ref={stackRef} className="projects__stack" style={{ height: `${(projects.length + 1) * 100}vh` }}>
        <div className="projects__intro" data-nav="light">
          <motion.div className="projects__giant container" style={{ y: giantY, scale: giantAway }}>
            <GiantText text={projectsIntro.giant} style={{ filter: giantFilter, opacity: giantOpacity }} />
          </motion.div>
        </div>
        {projects.map((p, i) => (
          <Panel key={p.slug} project={p} index={i} total={projects.length} progress={stackProgress} />
        ))}
      </div>

      <div className="container section projects__outro" data-nav="light">
        <div className="cta-row">
          <FadeIn>
            <p className="cta-row__text">
              <Marked text={projectsIntro.outro} />
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Button href={links.resume}>{projectsIntro.cta}</Button>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
