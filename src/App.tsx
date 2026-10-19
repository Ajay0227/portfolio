import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { About } from './components/About'
import { AboutPanel } from './components/AboutPanel'
import { Blog } from './components/Blog'
import { CaseStudy } from './components/CaseStudy'
import { Cta } from './components/Cta'
import { Cursor } from './components/Cursor'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import type { Stage } from './components/Hero'
import { Lab } from './components/Lab'
import { Nav } from './components/Nav'
import { Preloader } from './components/Preloader'
import { Process } from './components/Process'
import { Projects } from './components/Projects'
import { Services } from './components/Services'
import { Testimonials } from './components/Testimonials'
import { Divider } from './components/ui'
import { projects } from './data/content'
import { navigate, useRoute } from './lib/router'
import { smooth, useSmoothScroll } from './lib/smooth'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function App() {
  const route = useRoute()
  const project = projects.find((p) => p.href === route.path)
  // the intro only plays when a visit starts on the home page
  const [stage, setStage] = useState<Stage>(() => (project || prefersReducedMotion() ? 'done' : 'intro'))
  useSmoothScroll()

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  // unknown paths show the home page, so give it its own URL
  useEffect(() => {
    if (!project && route.path !== '/') navigate(`/${route.hash}`, { replace: true })
  }, [project, route])

  // a new page opens at the top, at its #section, or where Back/Forward left it
  const shownPath = useRef(route.path)
  useLayoutEffect(() => {
    if (route.path === shownPath.current) return
    shownPath.current = route.path
    smooth.scrollTo(route.hash || route.scroll || 0, { immediate: true })
  }, [route])

  // Keep the page locked while the intro plays.
  useEffect(() => {
    if (stage === 'done') smooth.start()
    else smooth.stop()
  }, [stage])

  const onLettersDone = useCallback(() => setStage((s) => (s === 'intro' ? 'reveal' : s)), [])
  const onRevealed = useCallback(() => setStage('done'), [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain" aria-hidden="true" />
      <Cursor />
      {stage !== 'done' && <Preloader onLettersDone={onLettersDone} />}
      <Nav visible={stage === 'done'} />
      {project ? (
        <CaseStudy key={project.slug} project={project} />
      ) : (
        <main>
          <Hero stage={stage} onRevealed={onRevealed} />
          <About />
          <Divider />
          <Projects />
          <Divider />
          <Lab />
          <Services />
          <Divider />
          <Process />
          <Testimonials />
          <Divider />
          <Blog />
          <Cta />
        </main>
      )}
      <Footer />
      <AboutPanel />
    </MotionConfig>
  )
}

export default App
