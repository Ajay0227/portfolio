import { about, brand } from '../data/content'
import { aboutPanel } from '../lib/aboutPanel'
import { Marked } from '../lib/text'
import { BlurWords, Button, FadeIn, Label, RevealLines, RollingNumber } from './ui'
import './About.css'

export function About() {
  return (
    <section id="about" className="section about" data-nav="light">
      <div className="container">
        <div className="section-head">
          <div>
            <Label>{about.label}</Label>
            <RevealLines className="h2" lines={[about.title[0], [{ t: about.title[1], accent: true }]]} />
          </div>
          <BlurWords className="lead about__lead" text={about.lead} />
        </div>

        <div className="stats">
          {about.stats.map((s, i) => (
            <FadeIn key={s.label} className="stat" delay={i * 0.08}>
              <RollingNumber className="stat__value" value={s.value} />
              <p className="stat__label">{s.label}</p>
              <p className="stat__note">{s.note}</p>
            </FadeIn>
          ))}
        </div>

        <div className="cta-row">
          <FadeIn className="about__quote">
            <p className="about__quote-text">
              <Marked text={about.quote} />
            </p>
            <div className="person">
              <img src={brand.avatar} alt={brand.name} width={48} height={48} loading="lazy" />
              <div>
                <p className="person__name">{brand.name}</p>
                <p className="person__role">{brand.role}</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Button onClick={aboutPanel.open} cursor="Read more">
              {about.cta}
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
