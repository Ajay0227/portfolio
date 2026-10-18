import { blog, brand, links } from '../data/content'
import { Marked } from '../lib/text'
import { ArrowIcon, BlurWords, Button, FadeIn, Label, RevealLines } from './ui'
import './Blog.css'

export function Blog() {
  const [feature, ...rest] = blog.posts

  return (
    <section id="blog" className="section blog" data-nav="light">
      <div className="container">
        <div className="section-head blog__head">
          <div>
            <Label>{blog.label}</Label>
            <RevealLines className="h2" lines={blog.title} />
          </div>
          <BlurWords className="small-lead blog__lead" text={blog.lead} />
        </div>

        <div className="blog__grid">
          <FadeIn className="post post--feature">
            <a href={feature.href} target="_blank" rel="noreferrer" data-cursor="Read ↗">
              <div className="post__img">
                <img src={feature.image} alt={feature.title} loading="lazy" />
              </div>
              <div className="post__body">
                <div>
                  <span className="post__tag">{feature.tag}</span>
                  <h3 className="post__title">{feature.title}</h3>
                </div>
                <p className="body post__intro">{blog.intro}</p>
                <div className="post__meta">
                  <span>
                    Article by <strong>{brand.name}</strong>
                  </span>
                  <span>{feature.date}</span>
                  <span className="post__read">
                    Read Article <ArrowIcon />
                  </span>
                </div>
              </div>
            </a>
          </FadeIn>

          {rest.map((p, i) => (
            <FadeIn key={p.href} className="post" delay={0.08 * (i + 1)}>
              <a href={p.href} target="_blank" rel="noreferrer" data-cursor="Read ↗">
                <div className="post__img">
                  <img src={p.image} alt={p.title} loading="lazy" />
                </div>
                <div className="post__body">
                  <div>
                    <span className="post__tag">{p.tag}</span>
                    <h3 className="post__title">{p.title}</h3>
                  </div>
                  <div className="post__meta">
                    <span>
                      Article by <strong>{brand.name}</strong>
                    </span>
                    <span>{p.date}</span>
                  </div>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

        <div className="cta-row">
          <FadeIn>
            <p className="cta-row__text">
              <Marked text={blog.outro} />
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Button href={links.emailCompose}>{blog.cta}</Button>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
